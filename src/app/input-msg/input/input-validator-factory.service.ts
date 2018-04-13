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
  public create(inputType: inputMsg.AggregatedInputType, validators: { [key: string]: inputMsg.ValidatorConfig<any> }): InputValidator {

    let config: inputMsg.ValidatorConfig<any>[];
    let validatorSequence: inputMsg.ValidatorName[];

    switch (inputType) {
      case 'textLike':
        validatorSequence = ['required', 'minlength', 'maxlength', 'pattern'];
        config = this.getValidatorConfig<undefined | number | RegExp>(validators, validatorSequence);
        return new TextValidator(config);
      case 'email':
        validatorSequence = ['required', 'email'];
        config = this.getValidatorConfig<undefined>(validators, validatorSequence);
        return new EmailValidator(config);
      case 'number':
        validatorSequence = ['required', 'integer', 'min', 'max'];
        config = this.getValidatorConfig<undefined | number>(validators, validatorSequence);
        return new NumberValidator(config);
      default:
        throw new Error(`InputValidatorFactory.create() failed: unsupported input type ${inputType}`);
    }
  }

  private getValidatorConfig<T>(
    validators: { [key: string]: inputMsg.ValidatorConfig<T> },
    validatorSequence: inputMsg.ValidatorName[]
  ): inputMsg.ValidatorConfig<T>[] {

    const config: inputMsg.ValidatorConfig<T>[] = [];
    validatorSequence.forEach(name => {
      if (validators[name]) {
        config.push(validators[name]);
      }
    });
    return config;
  }

}
