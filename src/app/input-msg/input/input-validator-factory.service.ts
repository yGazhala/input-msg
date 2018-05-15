import { Injectable } from '@angular/core';

import { InputValidator } from './validators/input-validator';
import { EmailValidator } from './validators/email-validator';
import { NumberValidator } from './validators/number-validator';
import { TextValidator } from './validators/text-validator';

import { inputMsg } from '../types';

@Injectable()
export class InputValidatorFactory {

  /**
   * Creates validators depending on a given
   * input type and validation params.
   */
  public create(
    inputType: inputMsg.AggregatedInputType,
    validators: { [key: string]: inputMsg.ValidatorConfig<any> }
  ): InputValidator {

    switch (inputType) {
      case 'email':
        return new EmailValidator(validators);
      case 'number':
        return new NumberValidator(validators);
      case 'textLike':
        return new TextValidator(validators);
      default:
        throw new Error(`InputValidatorFactory.create() failed: unsupported input type ${inputType}`);
    }
  }

}
