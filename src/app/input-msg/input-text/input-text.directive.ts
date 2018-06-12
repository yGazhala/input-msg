import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { TextValidatorFactory } from './text-validator-factory.service';

@Directive({
  selector: 'input[ngxInputText], textarea[ngxInputText]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputTextDirective,
      multi: true
    },
    TextValidatorFactory
  ]
})

export class InputTextDirective extends AbstractInput implements OnChanges, OnInit, OnDestroy {

  @Input() public maxlength: string | number;
  @Input() public minlength: string | number;
  @Input() public pattern: RegExp;

  protected validatorOptions = {
    maxlength: () => {
      return {
        name: 'maxlength',
        set: super.hasNumberParam('maxlength'),
        value: +this.maxlength
      };
    },
    minlength: () => {
      return {
        name: 'minlength',
        set: super.hasNumberParam('minlength'),
        value: +this.minlength
      };
    },
    pattern: () => {
      return {
        name: 'pattern',
        set: this.pattern instanceof RegExp,
        value: this.pattern
      };
    }
  };

  private maxLengthSub: Subscription;

  constructor(
    protected elemRef: ElementRef,
    protected inputStorageService: InputStorageService,
    protected validatorFactory: TextValidatorFactory
  ) {
    super(elemRef, inputStorageService, validatorFactory);
  }

  public ngOnChanges(changes: { [prop: string]: SimpleChange }): void {
    super.ngOnChanges(changes);
    this.maxLengthOn();
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.maxLengthOff();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.maxLengthOn();
  }

  private emitMaxLengthStatus(): void {
    if (this.model.value.length === +this.maxlength) {
      this.inputParams.status.next('maxlength');
    }
  }

  /**
   * Stops generating 'maxlength' status
   */
  private maxLengthOff(): void {
    if (this.maxLengthSub) {
      this.maxLengthSub.unsubscribe();
    }
  }

  /**
   * Starts generating 'maxlength' status
   */
  private maxLengthOn(): void {
    if (super.hasNumberParam('maxlength') && !this.maxLengthSub) {
      this.maxLengthSub = this.model.valueChanges
        .subscribe(this.emitMaxLengthStatus.bind(this));
    }
  }

}
