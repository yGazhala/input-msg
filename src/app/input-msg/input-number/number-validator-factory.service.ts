import { Injectable } from '@angular/core';

import { NumberValidator } from './number-validator';

import { inputMsg } from '../types';

@Injectable()
export class NumberValidatorFactory implements inputMsg.InputValidatorFactory {

  public create(validatorsToApply: { [key: string]: inputMsg.ValidatorConfig<number | void> }): NumberValidator {
    return new NumberValidator(validatorsToApply);
  }

}
