import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

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
  private form: NgForm;
  private inputKey: string;
  private isMaterial: boolean;
  private params = {} as inputMsg.Params;
  private statusSubscription: {
    modelChange: Subscription;
    formSubmit: Subscription
  };
  private readonly supportedType = {
    email: true,
    password: true,
    text: true,
    number: true
  };
  // the current validation params of this input
  private validationParams: inputMsg.ValidationParam[] = [];

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
    this.setParams();
    this.inputMsgService.setInput(this.inputKey, this.params);
    this.setClass();
    // Wait till NgForm will be initialized
    setTimeout(() => {
      this.form = this.model.formDirective as NgForm;
      this.statusOn();
    }, 0);
  }

  public ngOnDestroy(): void {
    this.inputMsgService.removeInput(this.inputKey);
  }

  /**
   * Starts generating the input status
   */
  public statusOn(): void {
    this.statusSubscription = {
      modelChange: this.model.valueChanges.subscribe(this.generateStatus.bind(this)),
      formSubmit: this.form.ngSubmit.subscribe(this.generateStatus.bind(this))
    };
  }

  /**
   * Stops generating the input status
   */
  public statusOff(): void {
    this.statusSubscription.modelChange.unsubscribe();
    this.statusSubscription.formSubmit.unsubscribe();
  }

  /**
   * Validates the input elem
   * if these validation params were set:
   * 'email', 'integer', 'max', 'min'.
   */
  public validate(control: AbstractControl): {[key: string]: any} {

    if (this.elemType === 'email') {
      return this.validator.email(control.value);
    }

    if (this.elemType === 'number') {

      if (this.hasBoolaenParam('integer')) {
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

  /**
   * Generates the current input status when
   * the model changes or the form submits
   * (emits messages into this.params.status).
   */
  private generateStatus(): void {

    for (let i = 0; i < this.validationParams.length; i++) {
      const errName = this.validationParams[i];
      if (this.model.hasError(errName)) {
        this.params.status.next(errName);
        return;
      }
    }
    if (this.model.valid) {
      this.params.status.next('valid');
    }
  }

  /**
   * Sets this.params and this.validationParams
   */
  private setParams(): void {

    const booleanParams = ['required', 'integer'];
    const numberParams = ['max', 'min', 'maxlength', 'minlength'];

    this.params.label = this.placeholder || this.label;
    this.params.status = new BehaviorSubject('pristine' as inputMsg.InputStatus);

    booleanParams.forEach((name: inputMsg.ValidationParam) => {
      if (this.hasBoolaenParam(name)) {
        this.params[name] = true;
        this.validationParams.push(name);
      }
    });
    if (this.elemType === 'email') {
      this.params.email = true;
      this.validationParams.push('email');
    }
    numberParams.forEach((name: inputMsg.ValidationParam) => {
      if (this.hasNumberParam(name)) {
        this.params[name] = + this[name];
        this.validationParams.push(name);
      }
    });
  }

  private hasBoolaenParam(name: string): boolean {
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
    if (this.hasBoolaenParam('integer') && this.type !== 'number') {
      throw new Error(
        `gInput directive: integer param is not compatible with ${this.type}. Use an input with number type instead.`
      );
    }
    this.elemType = this.type;
  }

}
