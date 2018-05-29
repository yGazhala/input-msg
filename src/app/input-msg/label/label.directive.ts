import { Directive, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';

import { inputMsg } from '../types';

/**
 * Adds/removes 'ngx-input_invalid' css class
 * when input status changes
 */
@Directive({
  selector: '[ngxLabel]'
})
export class LabelDirective implements OnInit, OnDestroy {

  /**
   * input element id or name
   */
  @Input() public for: string;

  private elem: HTMLLabelElement;
  private highlightColor: string;
  private valid: BehaviorSubject<boolean>;

  constructor(
    private configService: InputMsgConfigService,
    private elemRef: ElementRef,
    private inputStorageService: InputStorageService
  ) { }

  public ngOnDestroy(): void {
    if (this.valid && this.valid.unsubscribe) {
      this.valid.unsubscribe();
    }
  }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;
    this.highlightColor = this.configService.get().colors.error;

    if (!this.for) {
      throw new Error('ngxLabel directive: \'for\' attribute with input id or name is required.');
    }

    this.setAnimation();

    // Wait till the input element will be initialized.
    // We should wait in case the label element was
    // inserted before the input.
    setTimeout(() => {
      const inputParams = this.inputStorageService.get(this.for);
      if (!inputParams) {
        throw new Error(`ngxLabel directive: can\'t find the input element with id or name: ${this.for}`);
      }

      this.valid = inputParams.valid;
      this.valid.subscribe((valid: boolean) => {
        this.toggleClassOnValidChange(valid);
        this.highlightOnValidChange(valid);
      });

    }, 0);
  }

  private highlightOnValidChange(valid: boolean): void {
    if (valid) {
      this.elem.style.color = '';
    } else {
      this.elem.style.color = this.highlightColor;
    }
  }

  private setAnimation(): void {
    this.elem.style.transition = 'color 250ms ease-in';
  }

  private toggleClassOnValidChange(valid: boolean): void {
    if (valid) {
      this.elem.classList.remove('ngx-input_invalid');
    } else {
      this.elem.classList.add('ngx-input_invalid');
    }
  }

}
