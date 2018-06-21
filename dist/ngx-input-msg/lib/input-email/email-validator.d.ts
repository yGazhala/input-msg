import { InputValidator } from '../models/input-validator';
import { inputMsg } from '../types';
export declare class EmailValidator extends InputValidator {
    private validatorsToApply;
    protected availableValidators: {
        email: (value: string) => {
            email: string;
        };
    };
    protected validatorSequence: string[];
    constructor(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    });
    private email(value);
}
