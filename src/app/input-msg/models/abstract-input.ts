import { ElementRef, Input, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { AbstractControl, NgModel, NgForm } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';

import { InputStorageService } from '../input-storage.service';

// types
import { inputMsg } from '../types';

/**
 * An abstract class to be derived by
 * a concrete input directive class.
 * Validates an input element and emits
 * the validation status to the listeners
 * (MsgComponent, LabelDirective)
 * through InputStorageService.
 */
export abstract class AbstractInput implements OnInit, OnChanges, OnDestroy {

  @Input() public id: string;
  @Input() public label: string;
  @Input() public matInput: '';
  @Input() public model: NgModel;
  @Input() public name: string;
  @Input() public placeholder: string;
  @Input() public required: '' | boolean;

  protected inputParams: inputMsg.InputParams;
  /**
   * A dictionary with callbacks to get current validation params.
   */
  protected abstract validatorOptions: { [name: string]: inputMsg.ValidatorParamFn };

  private elem: HTMLInputElement;
  private form: NgForm;
  private inputKey: string;
  private isMaterial: boolean;
  /**
   * Contains true if the prevoius input state was valid.
   */
  private prevValid: boolean;
  private statusSubscriptions: Subscription[] = [];
  /**
   * The current validation params of the input
   */
  private validationParams: inputMsg.ValidatorConfig<any>[];
  private validator: inputMsg.InputValidator;

  constructor(
    protected elemRef: ElementRef,
    protected inputStorageService: InputStorageService,
    protected inputValidatorFactory: inputMsg.InputValidatorFactory
  ) { }

  public ngOnChanges(changes: { [prop: string]: SimpleChange }): void {

    const changeableProps = {
      placeholder: true,
      label: true,
      required: true
    };

    Object.keys(changes).forEach((name) => {
      if (!changeableProps[name] ||
        !this.validatorOptions[name] ||
        changes[name].isFirstChange()
      ) {
        return;
      }

      if (name === 'placeholder' || name === 'label') {
        this.inputParams.label = changes[name].currentValue;
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
    this.isMaterial = this.matInput === '';
    this.inputKey = this.id || this.name;

    this.checkRequiredParams();

    this.setMatFormFieldClass();

    this.initInputParams();
    this.setValidationParams();
    this.createValidator();
    this.inputStorageService.set(this.inputParams, this.id, this.name);

    // Wait till NgForm will be initialized
    setTimeout(() => {
      this.form = this.model.formDirective as NgForm;
      if (!this.form) {
        throw new Error(`ngxInput directive: the element with name="${this.name}" have to be inside a <form> element`);
      }
      this.statusOn();
    }, 0);
  }

  public validate(control: AbstractControl): { [validatorName: string]: any } | null {
    return this.validator.validate(control);
  }

  protected hasBoolaenParam(name: string): boolean {
    return this[name] === '' || this[name] === true;
  }

  protected hasNumberParam(name: string): boolean {
    return !isNaN(this[name]) && isFinite(this[name]);
  }

  private checkRequiredParams(): void {
    if (!this.name) {
      throw new Error(`ngxInput directive: can\'t find name attribute on the element`);
    }
    if (!(this.model instanceof NgModel)) {
      throw new Error(`ngxInput directive: NgModel instance have to be provided to [model] param of the element`);
    }
  }

  private createValidator(): void {

    const validators: { [validator: string]: inputMsg.ValidatorConfig<any> } = {};
    this.validationParams.forEach(param => {
      validators[param.name] = param;
    });

    this.validator = this.inputValidatorFactory.create(validators);
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

  /**
   * Sets 'ngx-msg__mat-form-field'
   * if matInput directive was set
   */
  private setMatFormFieldClass(): void {

    if (!this.isMaterial) {
      return;
    }
    const input = this.elemRef.nativeElement as HTMLInputElement;
    let parent: HTMLElement = input.parentElement;

    for (let i = 0; i < 10; i++) {
      if (parent.tagName === 'MAT-FORM-FIELD') {
        break;
      }
      parent = parent.parentElement;
      if (i === 9) {
        throw new Error('ngxInput directive: Can\'t find parent <mat-form-field> elem');
      }
    }
    parent.classList.add('ngx-msg__mat-form-field');
  }

  /**
   * Sets current validation params on init or on changes
   */
  private setValidationParams(): void {

    this.inputParams.validationParams = {};
    this.validationParams = [];

    if (this.hasBoolaenParam('required')) {
      this.inputParams.validationParams.required = true;
      this.validationParams.push({
        name: 'required',
        compareWith: undefined
      });
    }

    Object.keys(this.validatorOptions).forEach(name => {
      const param: inputMsg.ValidatorParam = this.validatorOptions[name]();
      if (param.set) {
        this.inputParams.validationParams[name] = param.value;
        this.validationParams.push({
          name: name,
          compareWith: param.value
        });
      }
    });
  }

  /**
   * Stops generating the input status
   */
  private statusOff(): void {
    this.statusSubscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  /**
   * Starts generating the input status
   */
  private statusOn(): void {

    // Emits an error status if the input is invalid.
    const emitErrorStatus = (): void => {
      for (const param of this.validationParams) {
        if (this.model.hasError(param.name)) {
          this.inputParams.valid.next(false);
          this.inputParams.status.next(param.name);
          return;
        }
      }
    };

    const emitErrorStatusOnTouched = (): void => {
      if (this.model.touched || this.form.submitted) {
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

    const blurSub: Subscription = Observable
      .fromEvent(this.elem, 'blur')
      .subscribe(emitErrorStatusOnTouched);
    this.statusSubscriptions.push(blurSub);

    const controlValueSub: Subscription = this.model.valueChanges
      .subscribe(emitErrorStatusOnTouched);
    this.statusSubscriptions.push(controlValueSub);

    const formSubmitSub: Subscription = this.form.ngSubmit
      .subscribe(emitErrorStatus);
    this.statusSubscriptions.push(formSubmitSub);

    const controlStatusSub: Subscription = this.model.statusChanges
      .subscribe(emitValidAndPristineStatus);
    this.statusSubscriptions.push(controlStatusSub);

    // Adds/removes 'ngx-input_invalid' class to the input
    const toggleClassOnValidChange = (valid: boolean): void => {
      if (valid) {
        this.elem.classList.remove('ngx-input_invalid');
      } else {
        this.elem.classList.add('ngx-input_invalid');
      }
    };
    const validSub: Subscription = this.inputParams.valid
      .subscribe(toggleClassOnValidChange);
    this.statusSubscriptions.push(validSub);

  }

}
