import { AbstractControl } from '@angular/forms';
import { inputMsg } from '../types';
export declare abstract class InputValidator implements inputMsg.InputValidator {
    /**
     * All available validators for specific input type
     */
    protected abstract availableValidators: {
        [name: string]: inputMsg.ValidatorFn<any>;
    };
    /**
     * The sequence of validator names to validate an input element with.
     * Validators are applied one by one.
     * @example ['required', 'minlenght', 'maxlength', 'pattern']
     */
    protected abstract validatorSequence: string[];
    /**
     * The current validators applied to the specific input element
     */
    private currentValidators;
    validate(control: AbstractControl): {
        [validatorName: string]: any;
    } | null;
    protected empty(value: any): boolean;
    protected setCurrentValidators(validatorsToApply: {
        [validatorName: string]: inputMsg.ValidatorParam;
    }): void;
    /**
     * Returns the sequence of configs of validators
     */
    private getValidatorParamSequence<T>(validatorsToApply);
    /**
     * Validation function to be used with an any type of an input element
     */
    private required(value);
}
