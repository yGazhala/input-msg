import { NumberValidator } from './number-validator';
import { inputMsg } from '../types';
export declare class NumberValidatorFactory implements inputMsg.InputValidatorFactory {
    create(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    }): NumberValidator;
}
