import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
  selector: 'input[gInput], textarea[gInput]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: InputDirective, multi: true }
  ]
})

export class InputDirective implements OnInit, OnChanges, OnDestroy {

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
  private elemType: inputMsg.AggregatedInputType;
  private form: NgForm;
  private inputKey: string;
  private inputParams: inputMsg.InputParams;
  private isMaterial: boolean;
  // contains true if the prevoius input state was valid.
  private prevValid: boolean;
  private statusSubscriptions: Subscription[] = [];
  // the current validation params of this input
  private validationParams: inputMsg.ValidationParam[] = [];

  constructor(
    private elemRef: ElementRef,
    private inputMsgService: InputMsgService,
    private inputStorageService: InputStorageService,
    private validator: InputValidator
  ) { }

  public ngOnChanges(changes: { [prop: string]: SimpleChange }): void {

    const changeableProps = {
      placeholder: true,
      label: true,
      required: true,
      integer: true,
      max: true,
      min: true,
      maxlength: true,
      minlength: true
    };

    Object.keys(changes).forEach((name) => {

      if (!changeableProps[name] || changes[name].isFirstChange()) {
        return;
      }

      if (name === 'placeholder' || name === 'label') {
        this.inputParams.label = changes[name].currentValue();
        this.inputParams.paramChange.next('label');
        return;
      }

      this.setValidationParams();
      this.inputParams.paramChange.next(name as inputMsg.ValidationParam);
    });
  }

  public ngOnDestroy(): void {
    this.statusOff();
    this.inputStorageService.remove(this.inputKey);
  }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;
    this.elemModel = this.model || this.inputModel;
    this.isMaterial = this.matInput === '' || this.mdInput === '';

    this.initElemType();

    this.inputKey = this.id || this.name;
    if (!this.inputKey) {
      throw new Error('gInput directive: id or name attribute is required');
    }

    this.initInputParams();
    this.setValidationParams();
    this.inputStorageService.set(this.inputParams, this.id, this.name);
    this.setMatFormFieldClass();

    // Wait till NgForm will be initialized
    setTimeout(() => {
      this.form = this.elemModel.formDirective as NgForm;
      this.statusOn();
    }, 0);
  }

  /**
   * Stops generating the input status
   */
  public statusOff(): void {
    this.statusSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  /**
   * Starts generating the input status
   */
  public statusOn(): void {

    // Emits an error status if the input is invalid.
    const emitErrorStatus = (): void => {
      for (const errName of this.validationParams) {
        if (this.elemModel.hasError(errName)) {
          this.inputParams.valid.next(false);
          this.inputParams.status.next(errName);
          return;
        }
      }
    };

    const emitErrorStatusOnTouched = (): void => {
      if (this.elemModel.touched || this.form.submitted) {
        emitErrorStatus();
      }
    };

    const emitValidAndPristineStatus = (status: string): void => {
      switch (status) {
        case 'INVALID':
          this.prevValid = false;
          break;
        case 'VALID':
          if (!this.prevValid) {
            this.inputParams.valid.next(true);
            this.inputParams.status.next('valid');
          }
          this.prevValid = true;
          break;
        case 'PRISTINE':
          this.inputParams.valid.next(true);
          this.inputParams.status.next('pristine');
          break;
        default:
          return;
      }
    };

    const emitMaxLengthStatus = (): void => {
      if (this.elemModel.value.length === +this.maxlength) {
        this.inputParams.status.next('maxlength');
      }
    };

    const blurSub: Subscription = Observable
      .fromEvent(this.elem, 'blur')
      .subscribe(emitErrorStatusOnTouched);
    this.statusSubscriptions.push(blurSub);

    const controlValueSub: Subscription = this.elemModel.valueChanges
      .subscribe(emitErrorStatusOnTouched);
    this.statusSubscriptions.push(controlValueSub);

    const formSubmitSub: Subscription = this.form.ngSubmit
      .subscribe(emitErrorStatus);
    this.statusSubscriptions.push(formSubmitSub);

    const controlStatusSub: Subscription = this.elemModel.statusChanges
      .subscribe(emitValidAndPristineStatus);
    this.statusSubscriptions.push(controlStatusSub);

    if (this.hasNumberParam('maxlength')) {
      const controlValueLengthSub: Subscription = this.elemModel.valueChanges
        .subscribe(emitMaxLengthStatus);
      this.statusSubscriptions.push(controlValueLengthSub);
    }

    // Adds/removes 'g-input_invalid' class to the input
    const toggleClassOnValidChange = (valid: boolean): void => {
      if (valid) {
        this.elem.classList.remove('g-input_invalid');
      } else {
        this.elem.classList.add('g-input_invalid');
      }
    };
    const validSub: Subscription = this.inputParams.valid
      .subscribe(toggleClassOnValidChange);
    this.statusSubscriptions.push(validSub);

  }

  /**
   * Validates the input elem if these
   * validation params were set:
   * 'email', 'integer', 'max', 'min'.
   *
   * Note, 'required', 'minlength' and 'maxlength'
   * validators are already supported by Angular.
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
        const isMinInvalid = this.validator.min(control.value, +this.min);
        if (isMinInvalid) {
          return isMinInvalid;
        }
        return this.validator.max(control.value, +this.max);
      }
      if (this.hasNumberParam('min') && !this.hasNumberParam('max')) {
        return this.validator.min(control.value, + this.min);
      }
      // only 'max' param is set
      return this.validator.max(control.value, + this.max);
    }
  }

  private hasBoolaenParam(name: string): boolean {
    return this[name] === '' || this[name] === true;
  }

  private hasNumberParam(name: string): boolean {
    return this.validator.isNumber(this[name]);
  }

  private initElemType(): void {

    if (this.elem.tagName === 'TEXTAREA') {
      this.elemType = 'textLike';
      return;
    }

    const supportedInputType = {
      email: true,
      password: true,
      text: true,
      number: true
    };

    if (!supportedInputType[this.type]) {
      throw new Error(
        `gInput directive: input with type ${this.type} is not supported. Consider to use only email, text, number or password type.`
      );
    }

    if (this.hasBoolaenParam('integer') && this.type !== 'number') {
      throw new Error(
        `gInput directive: integer param is not compatible with ${this.type}. Use an input with number type instead.`
      );
    }

    switch (this.type) {
      case 'number':
        this.elemType = this.type;
        break;
      case 'email':
        this.elemType = this.type;
        break;
      default:
        this.elemType = 'textLike';
    }
  }

  private initInputParams(): void {

    this.inputParams = {
      label: this.placeholder || this.label,
      material: this.isMaterial,
      paramChange: new Subject(),
      status: new BehaviorSubject('pristine' as inputMsg.InputStatus),
      valid: new BehaviorSubject(true),
      validationParams: undefined
    };
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

  private setValidationParams(): void {

    this.inputParams.validationParams = {};
    this.validationParams = [];

    // Available validation params for each supported input type
    const validationParamOptions = {
      email: [
        { name: 'required', type: 'boolean' },
        { name: 'email', type: 'boolean' }
      ],
      number: [
        { name: 'required', type: 'boolean' },
        { name: 'min', type: 'number' },
        { name: 'max', type: 'number' },
        { name: 'integer', type: 'boolean' }
      ],
      textLike: [
        { name: 'required', type: 'boolean' },
        { name: 'minlength', type: 'number' },
        { name: 'maxlength', type: 'number' }
      ]
    };

    const options = validationParamOptions[this.elemType] as inputMsg.ValidationParamOption[];
    options.forEach((param) => {
      const checker = param.type === 'boolean' ? this.hasBoolaenParam.bind(this) : this.hasNumberParam.bind(this);
      if (!checker(param.name)) {
        return;
      }
      if (param.type === 'boolean') {
        this.inputParams.validationParams[param.name] = true;
      } else {
        this.inputParams.validationParams[param.name] = +this[param.name];
      }
      this.validationParams.push(param.name);
    });

  }

}
