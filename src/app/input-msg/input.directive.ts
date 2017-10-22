import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InputMsgService } from './input-msg.service';
import { InputValidator } from './input-validator.service';

import { inputMsg } from './types';

@Directive({
  selector: '[gInput]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InputDirective, multi: true }
  ]
})

export class InputDirective implements OnInit, OnDestroy {

  @Input() public id: string;
  @Input() public integer: '' | boolean;
  @Input() public label: string;
  // Material Design betta 11 support
  @Input() public mdInput: '';
  @Input() public matInput: '';
  @Input() public max: string | number;
  @Input() public maxlength: string | number;
  @Input() public min: string | number;
  @Input() public minlength: string | number;
  @Input('gInput') public model: NgModel;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public required: '' | boolean;
  @Input() public type: inputMsg.SupportedInputType = 'text'; // default

  private elem: HTMLInputElement;
  private elemType: inputMsg.SupportedInputType | 'textArea';
  private inputKey: string;
  private isMaterial: boolean;
  // The current input status
  private status: BehaviorSubject<string>;
  private readonly supportedType = {
    email: true,
    password: true,
    text: true,
    number: true
  };

  constructor(
    private inputMsgService: InputMsgService,
    private validator: InputValidator,
    private elemRef: ElementRef
  ) { }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;
    this.setType();
    this.isMaterial = this.matInput === '' || this.mdInput === '';
    this.inputKey = this.name || this.id;
    if (!this.inputKey) {
      throw new Error('gInput directive: it seems you forgot to set name or id attribute');
    }
    // Continue
    this.status = new BehaviorSubject('init');
    this.inputMsgService.initInput(this.inputKey);
    const params: inputMsg.Params = this.getParams();
    this.setClass();
    // Wait till NgForm will be initialized
    setTimeout(() => {
      params.model = this.model;
      params.form = this.model.formDirective as NgForm;
      this.inputMsgService.setInput(this.inputKey, params);
    }, 0);
  }

  public ngOnDestroy(): void {
    this.inputMsgService.removeInput(this.inputKey);
  }

  /**
   * Custom validation method
   */
  public validate(control: AbstractControl): {[key: string]: any} {

    if (this.elemType === 'email') {
      return this.validator.email(control.value);
    }

    if (this.elemType === 'number') {

      if (this.integer === '') {
        const isInvalid = this.validator.integer(control.value);
        if (isInvalid) {
          return isInvalid;
        }
      }
      if (this.hasNumberParam('min') && this.hasNumberParam('max')) {
        const isMinInvalid = this.validator.min(control.value, + this.min);
        if (isMinInvalid) {
          return isMinInvalid;
        }
        return this.validator.max(control.value, + this.max);
      }
      if (this.hasNumberParam('min') && !this.hasNumberParam('max')) {
        return  this.validator.min(control.value, + this.min);
      }
      // only 'max' param is set
      return this.validator.max(control.value, + this.max);
    }
  }

  private generateStatus(): void {

  }

  private getParams(): inputMsg.Params {

    const params = {
      type: this.elemType,
      label: this.placeholder || this.label,
      required: this.hasAttribute('required')
    } as inputMsg.Params;

    if (this.hasNumberParam('minlength')) {
      params.minLength = + this.minlength;
    }
    if (this.hasNumberParam('maxlength')) {
      params.maxLength = + this.maxlength;
    }
    if (this.hasNumberParam('min')) {
      params.min = + this.min;
    }
    if (this.hasNumberParam('max')) {
      params.max = + this.max;
    }
    if (this.hasAttribute('integer')) {
      params.integer = true;
    }
    return params;
  }

  private hasAttribute(name: string): boolean {
    return this[name] === '' || this[name] === true;
  }

  private hasNumberParam(name: string): boolean {
    return this.validator.isNumber(this[name]);
  }

  private setClass(): void {

    const input = this.elemRef.nativeElement as HTMLInputElement;
    if (!this.isMaterial) {
      input.classList.add('g-msg__form-field');
      return;
    }
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

  private setType(): void {

    if (this.elem.tagName !== 'INPUT' && this.elem.tagName !== 'TEXT-AREA') {
      throw new Error(
        `gInput directive: ${this.elem.tagName.toLowerCase()} elem is not supported. Consider to use only <input> or <text-area> elem.`
      );
    }
    if (this.elem.tagName === 'TEXT-AREA') {
      this.elemType = 'textArea';
      return;
    }
    if (!this.supportedType[this.type]) {
      throw new Error(
        `gInput directive: input with type ${this.type} is not supported. Consider to use only email, text, number or password type.`
      );
    }
    if (this.hasAttribute('integer') && this.type !== 'number') {
      throw new Error(
        `gInput directive: integer param is not compatible with ${this.type}. Use an input with number type instead.`
      );
    }
    this.elemType = this.type;
  }

}
