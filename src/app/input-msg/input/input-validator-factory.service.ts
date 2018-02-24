import { Injectable } from '@angular/core';

import { InputValidator } from './validators/input-validator';
import { EmailValidator } from './validators/email-validator';
import { NumberValidator } from './validators/number-validator';
import { TextValidator } from './validators/text-validator';

import { inputMsg } from '../types';

@Injectable()
export class InputValidatorFactory {

  /**
   * Creates validators depending on the input type
   * and given validation params.
   */
  public create(inputType: inputMsg.AggregatedInputType, validators: { [key: string]: inputMsg.ValidatorConfig<any> }): InputValidator {

    switch (inputType) {
      case 'textLike':
        return this.createTextValidator(validators);
      case 'email':
        return this.createEmailValidator();
      case 'number':
        return this.createNumberValidator(validators);
      default:
        throw new Error(`InputValidatorFactory.create() failed: unsupported input type ${inputType}`);
    }
  }

  private createEmailValidator(): InputValidator {
    const validatorConfig = { name: 'email' } as inputMsg.ValidatorConfig<undefined>;
    return new EmailValidator([validatorConfig]);
  }

  private createNumberValidator(validators: { [key: string]: inputMsg.ValidatorConfig<number> }): InputValidator {

    const config: inputMsg.ValidatorConfig<number>[] = [];

    const validatorSequence: inputMsg.ValidatorName[] = ['integer', 'min', 'max'];
    validatorSequence.forEach(name => {
      if (validators[name]) {
        config.push(validators[name]);
      }
    });

    return new NumberValidator(config);
  }

  private createTextValidator(validators: { [key: string]: inputMsg.ValidatorConfig<number | RegExp> }): InputValidator {

    const config: inputMsg.ValidatorConfig<number | RegExp>[] = [];

    const validatorSequence: inputMsg.ValidatorName[] = ['required', 'minlength', 'maxlength', 'pattern'];
    validatorSequence.forEach(name => {
      if (validators[name]) {
        config.push(validators[name]);
      }
    });

    return new TextValidator(config);
  }

}
