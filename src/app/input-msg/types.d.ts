import { AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

export declare module inputMsg {

  interface Config {
    colors?: {
      error?: string;
      maxlength?: string;
    };
    position?: Position;
    msg?: {
      email?: string | MsgFn;
      integer?: string | MsgFn;
      max?: string | ExtendedMsgFn;
      min?: string | ExtendedMsgFn;
      maxlength?: string | ExtendedMsgFn;
      minlength?: string | ExtendedMsgFn;
      pattern?: string | MsgFn;
      required?: string | MsgFn;
    };
  }

  type ExtendedMsgFn = (placeholder: string, allowedValue: number) => string;

  interface InputParams {
    label?: string;
    // contains true if there is a Material Design input
    material: boolean;
    paramChange: Subject<'label' | ValidatorName>;
    status: BehaviorSubject<InputStatus>;
    valid: BehaviorSubject<boolean>;
    validationParams: {
      [valiadatorName: string]: true | number | string;
    };
  }

  type InputStatus = 'pristine' | 'valid' | ValidatorName;

  interface InputValidator {
    validate(control: AbstractControl): { [validatorName: string]: any } | null;
  }

  interface InputValidatorFactory {
    create(validatorsToApply: { [key: string]: inputMsg.ValidatorConfig<any> }): InputValidator;
  }

  type MsgFn = (placeholder: string) => string;

  type Position = 'bottom-left' | 'bottom-right';

  // Final messages to show
  interface ResultMsg {
    email?: string;
    integer?: string;
    max?: string;
    maxlength?: string;
    min?: string;
    minlength?: string;
    pattern?: string;
    required?: string;
  }

  interface Validator<T> {
    validate: ValidatorFn<T>;
    compareWith?: T;
  }

  interface ValidatorConfig<T> {
    name: ValidatorName;
    compareWith?: T; // number | RegExp | undefined
  }

  type ValidatorFn<T> = (value: string | number, compareWith?: T) => { [validatorName: string]: T } | null;

  type ValidatorName = string;

  type ValidatorParamFn = () => ValidatorParam;

  interface ValidatorParam {
    value: any;
    set: boolean;
  }

}
