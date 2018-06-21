import { TextValidator } from './text-validator';
import { inputMsg } from '../types';
export declare class TextValidatorFactory implements inputMsg.InputValidatorFactory {
    create(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    }): TextValidator;
}
