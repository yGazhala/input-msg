import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { NumberValidatorFactory } from './number-validator-factory.service';

@Directive({
  selector: 'input[ngxInputNumber][type="number"]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputNumberDirective,
      multi: true
    },
    NumberValidatorFactory
  ]
})
export class InputNumberDirective extends AbstractInput {

  @Input() public integer: '' | boolean;
  @Input() public max: string | number;
  @Input() public min: string | number;

  protected validatorOptions = {
    integer: () => {
      return {
        set: super.hasBoolaenParam('integer'),
        value: true
      };
    },
    max: () => {
      return {
        set: super.hasNumberParam('max'),
        value: +this.max
      };
    },
    min: () => {
      return {
        set: super.hasNumberParam('min'),
        value: +this.min
      };
    }
  };

  constructor(
    protected elemRef: ElementRef,
    protected inputStorageService: InputStorageService,
    protected validatorFactory: NumberValidatorFactory
  ) {
    super(elemRef, inputStorageService, validatorFactory);
  }

}
