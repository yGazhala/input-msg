import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { InputStorageService } from '../input-storage.service';
import { InputValidatorFactory } from './input-validator-factory.service';

// types
import { InputValidator } from './validators/input-validator';
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
    {
      provide: NG_VALIDATORS,
      useExisting: InputDirective,
      multi: true
    },
    InputValidatorFactory
  ]
})

export class InputDirective implements OnInit, OnChanges, OnDestroy {

  @Input() public id: string;
  /**
   * DEPRECATED.
   * Use model insted.
   */
  // tslint:disable-next-line:no-input-rename
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
  @Input() public pattern: RegExp;
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
  private validationParams: inputMsg.ValidatorConfig<any>[];
  private validator: InputValidator;

  constructor(
    private elemRef: ElementRef,
    private inputStorageService: InputStorageService,
    private validatorFactory: InputValidatorFactory
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
      minlength: true,
      pattern: true
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
      this.inputParams.paramChange.next(name as inputMsg.ValidatorName);
      this.createValidator();
      this.model.control.updateValueAndValidity();
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

    this.setMatFormFieldClass();

    this.initInputParams();
    this.setValidationParams();
    this.createValidator();
    this.inputStorageService.set(this.inputParams, this.id, this.name);

    // Wait till NgForm will be initialized
    setTimeout(() => {
      this.form = this.elemModel.formDirective as NgForm;
      this.statusOn();
    }, 0);
  }

  public validate(control: AbstractControl): { [validatorName: string]: any } | null {
    return this.validator.validate(control);
  }


  private createValidator(): void {

    const validators: { [validator: string]: inputMsg.ValidatorConfig<any> } = {};
    this.validationParams.forEach(param => {
      validators[param.name] = param;
    });

    this.validator = this.validatorFactory.create(this.elemType, validators);
  }

  private hasBoolaenParam(name: string): boolean {
    return this[name] === '' || this[name] === true;
  }

  private hasNumberParam(name: string): boolean {
    return !isNaN(this[name]) && isFinite(this[name]);
  }

  private hasRegExpParam(name: string): boolean {
    return this[name] instanceof RegExp;
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
    const validationParamOptions: { [key: string]: inputMsg.ValidationParamOption[] } = {
      email: [
        { name: 'required', type: 'boolean' },
        { name: 'email', type: 'default' }
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
        { name: 'maxlength', type: 'number' },
        { name: 'pattern', type: 'RegExp' }
      ]
    };

    validationParamOptions[this.elemType].forEach((param) => {

      switch (param.type) {
        case 'boolean':
          if (this.hasBoolaenParam(param.name)) {
            this.inputParams.validationParams[param.name] = true;
            this.validationParams.push({
              name: param.name,
              compareWith: undefined
            });
          }
          break;
        case 'number':
          if (this.hasNumberParam(param.name)) {
            this.inputParams.validationParams[param.name] = +this[param.name];
            this.validationParams.push({
              name: param.name,
              compareWith: +this[param.name]
            });
          }
          break;
        case 'RegExp':
          if (this.hasRegExpParam(param.name)) {
            this.inputParams.validationParams[param.name] = true;
            this.validationParams.push({
              name: param.name,
              compareWith: this[param.name]
            });
          }
          break;
        case 'default':
          // default validator is always present
          // within an input, for example:
          // <input type="email"> has default validator 'email'
          this.inputParams.validationParams[param.name] = true;
          this.validationParams.push({
            name: param.name,
            compareWith: undefined
          });
          break;
        default:
          console.error('Unsuported validationParamOption:', param);
      }
    });
  }

  // Stops generating the input status
  private statusOff(): void {
    this.statusSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  // Starts generating the input status
  private statusOn(): void {
    // Emits an error status if the input is invalid.
    const emitErrorStatus = (): void => {
      for (const param of this.validationParams) {
        if (this.elemModel.hasError(param.name)) {
          this.inputParams.valid.next(false);
          this.inputParams.status.next(param.name);
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

}
