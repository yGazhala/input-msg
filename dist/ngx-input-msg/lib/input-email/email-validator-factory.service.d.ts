import { EmailValidator } from './email-validator';
import { inputMsg } from '../types';
export declare class EmailValidatorFactory implements inputMsg.InputValidatorFactory {
    create(validatorsToApply: {
        [key: string]: inputMsg.ValidatorParam;
    }): EmailValidator;
}
