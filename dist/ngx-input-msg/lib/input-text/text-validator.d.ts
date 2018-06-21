import { InputValidator } from '../models/input-validator';
import { inputMsg } from '../types';
/**
 * Validates 'text' like input element.
 */
export declare class TextValidator extends InputValidator {
    private validatorsToApply;
    /**
     * Note, 'minlength' and 'maxlength' validators
     * are already supported by Angular NgForm, but
     * we should emplement them to stop the validation
     * process when the first validator fails.
     * See: InputValidator.validate() implementation.
     */
    protected availableValidators: {
        maxlength: (value: string, max: number) => {
            maxlength: string;
        };
        minlength: (value: string, min: number) => {
            minlength: string;
        };
        pattern: (value: string, regExp: RegExp) => {
            pattern: string;
        };
    };
    protected validatorSequence: string[];
    constructor(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    });
    private maxlength(value, max);
    private minlength(value, min);
    private pattern(value, regExp);
}
