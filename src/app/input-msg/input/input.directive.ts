import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { InputMsgService } from '../input-msg.service';
import { InputStorageService } from '../input-storage.service';
import { InputValidator } from '../input-validator.service';

import { inputMsg } from '../types';

/**
 * Validates an input element and emits
 * the validation status to the listeners
 * (gMsg component, gLabel directive)
 * through InputStorageService.
 */
@Directive({
  selector: '[gInput]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InputDirective, multi: true }
  ]
})

export class InputDirective implements OnInit, OnDestroy {

  @Input() public id: string;
  /**
   * DEPRECATED.
   * Use model insted.
   */
  @Input('gInput') public inputModel: NgModel;
  @Input() public integer: '' | boolean;
  @Input() public label: string;
  @Input() public matInput: '';
  @Input() public max: string | number;
  @Input() public maxlength: string | number;
  /**
   * DEPRECATED.
   * Material Design betta 11 support.
   * Use matInput instead.
   */
  @Input() public mdInput: '';
  @Input() public min: string | number;
  @Input() public minlength: string | number;
  @Input() public model: NgModel;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public required: '' | boolean;
  @Input() public type: inputMsg.SupportedInputType = 'text'; // default

  private elem: HTMLInputElement;
  private elemModel: NgModel;
  private elemType: inputMsg.SupportedInputType | 'textArea';
  private form: NgForm;
  private inputKey: string;
  private isMaterial: boolean;
  private params = {} as inputMsg.InputParams;
  // contains true if the prevoius state was valid.
  private prevValid: boolean;
  private statusSubscription: {
    blur: Subscription;
    controlStatus: Subscription;
    // present if maxlength validation param was set
    maxLength?: Subscription;
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
    private inputStorageService: InputStorageService,
    private validator: InputValidator,
    private elemRef: ElementRef
  ) { }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;
    this.elemModel = this.model || this.inputModel;
    this.isMaterial = this.matInput === '' || this.mdInput === '';

    this.setElemType();

    this.inputKey =  this.id || this.name;
    if (!this.inputKey) {
      throw new Error('gInput directive: id or name attribute is required');
    }

    this.setParams();
    this.inputStorageService.set(this.params, this.id, this.name);
    this.setMatFormFieldClass();

    // Wait till NgForm will be initialized
    setTimeout(() => {
      this.form = this.elemModel.formDirective as NgForm;
      this.statusOn();
      this.params.valid.subscribe(this.toggleClassOnValidChange.bind(this));
    }, 0);
  }

  public ngOnDestroy(): void {
    this.statusOff();
    this.params.valid.unsubscribe();
    this.inputStorageService.remove(this.inputKey);
  }

  /**
   * Stops generating the input status
   */
  public statusOff(): void {

    Object.keys(this.statusSubscription).forEach(key => {
      this.statusSubscription[key].unsubscribe();
    });
  }

  /**
   * Starts generating the input status
   */
  public statusOn(): void {

    this.statusSubscription = {
      blur: Observable.fromEvent(this.elem, 'blur').subscribe(this.onError.bind(this)),
      controlStatus: this.elemModel.statusChanges.subscribe(this.emitValidAndPristineStatus.bind(this)),
      modelChange: this.elemModel.valueChanges.subscribe(this.onError.bind(this)),
      formSubmit: this.form.ngSubmit.subscribe(this.emitErrorStatus.bind(this))
    };
    if (this.hasNumberParam('maxlength')) {
      this.statusSubscription.maxLength = this.elemModel.valueChanges.subscribe(this.onMaxLength.bind(this));
    }
  }

  /**
   * Validates the input elem if these
   * validation params were set:
   * 'email', 'integer', 'max', 'min'.
   *
   * Note, 'required', 'minlength' and 'maxlength'
   * validatiors are already supported by Angular.
   */
  public validate(control: AbstractControl): { [key: string]: any } {

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
        return this.validator.min(control.value, + this.min);
      }
      // only 'max' param is set
      return this.validator.max(control.value, + this.max);
    }
  }

  // Emits an error status if the input is invalid.
  private emitErrorStatus(): void {

    for (let i = 0; i < this.validationParams.length; i++) {
      const errName = this.validationParams[i];
      if (this.elemModel.hasError(errName)) {
        this.params.valid.next(false);
        this.params.status.next(errName);
        return;
      }
    }
  }

  // Filters statuses and emits 'valid' and 'pristine' status
  private emitValidAndPristineStatus(status: string): void {

    switch (status) {
      case 'INVALID':
        this.prevValid = false;
        break;
      case 'VALID':
        if (!this.prevValid) {
          this.params.valid.next(true);
          this.params.status.next('valid');
        }
        this.prevValid = true;
        break;
      case 'PRISTINE':
        this.params.valid.next(true);
        this.params.status.next('pristine');
        break;
      default:
        return;
    }
  }

  // This callback emits an error status if the input
  // has been touched and it is invalid.
  private onError(): void {
    if (this.elemModel.touched || this.form.submitted) {
      this.emitErrorStatus();
    }
  }

  private onMaxLength(): void {

    if (this.elemModel.value.length === + this.maxlength) {
      this.params.status.next('maxlength');
    }
  }

  // Sets this.params and this.validationParams
  private setParams(): void {

    const booleanParams = ['required', 'integer'];
    const numberParams = ['max', 'min', 'maxlength', 'minlength'];

    this.params.label = this.placeholder || this.label;
    this.params.material = this.isMaterial;
    this.params.status = new BehaviorSubject('pristine' as inputMsg.InputStatus);
    this.params.valid = new BehaviorSubject(true);

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

  private setElemType(): void {

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

  // Sets 'g-msg__mat-form-field'
  // if matInput directive was set
  private setMatFormFieldClass(): void {

    if (!this.isMaterial) {
      return;
    }
    const input = this.elemRef.nativeElement as HTMLInputElement;
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
    parent.classList.add('g-msg__mat-form-field');
  }

  // Adds/removes 'g-input_invalid' class to the input
  private toggleClassOnValidChange(valid: boolean): void {
    if (valid) {
      this.elem.classList.remove('g-input_invalid');
    } else {
      this.elem.classList.add('g-input_invalid');
    }
  }
}
