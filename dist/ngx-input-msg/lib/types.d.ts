import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
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
        material: boolean;
        paramChange: Subject<'label' | ValidatorName>;
        status: BehaviorSubject<InputStatus>;
        valid: BehaviorSubject<boolean>;
        validationParams: {
            [valiadatorName: string]: ValidatorParam;
        };
    }
    type InputStatus = 'pristine' | 'valid' | ValidatorName;
    interface InputValidator {
        validate(control: AbstractControl): {
            [validatorName: string]: any;
        } | null;
    }
    interface InputValidatorFactory {
        create(validatorsToApply: {
            [key: string]: inputMsg.ValidatorParam;
        }): InputValidator;
    }
    type MsgFn = (placeholder: string, validationParam: any) => string;
    type Position = 'bottom-left' | 'bottom-right';
    interface ResultMsg {
        [validatorName: string]: string;
    }
    interface ValidatorConfig<T> extends ValidatorParam {
        fn: ValidatorFn<T>;
    }
    /**
     * The function to check an input value with.
     */
    type ValidatorFn<T> = (controlValue: string | number, compareWith?: T) => {
        [validatorName: string]: T;
    } | null;
    /**
     * Validator name, like: 'required', 'email', 'min', 'max' etc.
     */
    type ValidatorName = string;
    interface ValidatorParam {
        name: ValidatorName;
        value?: any;
        set: boolean;
    }
    type ValidatorParamFn = () => ValidatorParam;
}
