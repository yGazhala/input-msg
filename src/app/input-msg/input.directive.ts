import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { InputMsgService } from './input-msg.service';
import { InputValidator } from './input-validator.service';

import { errMsg as inputMsg } from './types';

@Directive({
  selector: '[gInput]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InputDirective, multi: true }
  ]
})

export class InputDirective implements OnInit, OnDestroy {

  @Input() public name: string;
  @Input() public id: string;
  @Input('gInput') public model: NgModel;
  @Input() public type: string;
  // Custom validation params
  @Input() public min: string;
  @Input() public max: string;
  @Input() public integer: string;

  private inputKey: string;

  constructor(
    private inputMsgService: InputMsgService,
    private validator: InputValidator,
    private elem: ElementRef
  ) { }

  public ngOnInit(): void {
    this.inputKey = this.name || this.id;
    if (!this.inputKey) {
      throw new Error('gInput directive: you have to set name or id attribute');
    }
    this.inputMsgService.init(this.inputKey);
    const params = this.getParams(this.elem.nativeElement);
    this.setClass();
    setTimeout(() => {
      params.model = this.model;
      params.form = this.model.formDirective as NgForm;
      this.inputMsgService.set(this.inputKey, params);
    }, 0);
  }

  public ngOnDestroy(): void {
    this.inputMsgService.remove(this.inputKey);
  }

  /**
   * Custom validation method
   */
  public validate(control: AbstractControl): {[key: string]: any} {

    if (this.type === 'email') {
      return this.validator.email(control.value);
    }

    if (this.type === 'number') {

      if (this.integer === '') {
          const isInvalid = this.validator.integer(control.value);
          if (isInvalid) {
            return isInvalid;
          }
      }

      const isNumber = this.validator.isNumber;

      if (isNumber(this.min) && isNumber(this.max)) {
        const isMinInvalid = this.validator.min(control.value, + this.min);
        if (isMinInvalid) {
          return isMinInvalid;
        }
        return this.validator.max(control.value, + this.max);
      }

      if (isNumber(this.min) && !isNumber(this.max)) {
        return  this.validator.min(control.value, + this.min);
      }

      if (isNumber(this.max) && !isNumber(this.min)) {
        return this.validator.max(control.value, + this.max);
      }
    }
  }

  private getParams(elem: HTMLInputElement): inputMsg.Params {
    const params = {
      type: elem.type,
      label: elem.getAttribute('mFloatLabel') || elem.getAttribute('label'),
      isRequired: elem.hasAttribute('required')
    } as inputMsg.Params;

    if (elem.hasAttribute('minlength')) {
      params.minLengthValue = elem.minLength;
    }
    if (elem.hasAttribute('maxlength')) {
      params.maxLengthValue = elem.maxLength;
    }
    if (this.min) {
      params.minValue = + this.min;
    }
    if (this.max) {
      params.maxValue = + this.max;
    }
    if (this.integer === '' && this.type === 'number') {
      params.isInteger = true;
    }
    return params;
  }

  private setClass() {

    const input = this.elem.nativeElement as HTMLInputElement;
    let parent: HTMLElement = input.parentElement;

    for (let i = 0; i < 10; i++) {
      if (parent.tagName === 'MAT-FORM-FIELD' ||
          parent.tagName === 'MD-FORM-FIELD') {
        break;
      }
      parent = parent.parentElement;
      if (i === 9) {
        throw new Error('gInput directive: Can\'t find parent <mat-form-field> elem');
      }
    }
    parent.classList.add('g-msg__form-field');
  }

}
