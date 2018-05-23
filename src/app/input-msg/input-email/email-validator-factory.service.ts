import { Injectable } from '@angular/core';

import { EmailValidator } from './email-validator';

import { inputMsg } from '../types';

@Injectable()
export class EmailValidatorFactory implements inputMsg.InputValidatorFactory {

  public create(validatorsToApply: { [key: string]: inputMsg.ValidatorConfig<any> }): EmailValidator {
    return new EmailValidator(validatorsToApply);
  }

}
