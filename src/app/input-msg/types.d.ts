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
      [validatorName: string]: string | MsgFn;
    };
  }

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
    create(validatorsToApply: { [key: string]: inputMsg.ValidatorParam }): InputValidator;
  }

  type MsgFn = (placeholder: string, validationParam: any) => string;

  type Position = 'bottom-left' | 'bottom-right';

  // Final messages to show
  interface ResultMsg {
    [validatorName: string]: string;
  }

  interface ValidatorConfig<T> extends ValidatorParam {
    fn: ValidatorFn<T>;
  }

  /**
   * The function to check an input value with.
   */
  type ValidatorFn<T> = (controlValue: string | number, compareWith?: T) => { [validatorName: string]: T } | null;

  /**
   * Validator name, like: 'required', 'email', 'min', 'max' etc.
   */
  type ValidatorName = string;

  interface ValidatorParam {
    name: ValidatorName;
    // the value to pass to ValidatorFn as compareWith paramteter
    value: any;
    set: boolean;
  }

  type ValidatorParamFn = () => ValidatorParam;

}
