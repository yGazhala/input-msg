import { Injectable } from '@angular/core';

import { TextValidator } from './text-validator';

import { inputMsg } from '../types';

@Injectable()
export class TextValidatorFactory implements inputMsg.InputValidatorFactory {

  public create(validatorsToApply: { [key: string]: inputMsg.ValidatorConfig<number | RegExp> }): TextValidator {
    return new TextValidator(validatorsToApply);
  }

}
