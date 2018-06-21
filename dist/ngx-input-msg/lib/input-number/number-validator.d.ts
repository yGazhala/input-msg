import { InputValidator } from '../models/input-validator';
import { inputMsg } from '../types';
export declare class NumberValidator extends InputValidator {
    private validatorsToApply;
    protected availableValidators: {
        integer: any;
        max: any;
        min: any;
    };
    protected validatorSequence: string[];
    constructor(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    });
    private integer(value);
    private max(value, max);
    private min(value, min);
    private number(arg);
}
