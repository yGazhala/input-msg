import { AbstractControl } from '@angular/forms';

import { InputValidator } from './input-validator';

import { inputMsg } from '../../types';

/**
 * Validates 'text' like input element.
 */
export class TextValidator extends InputValidator {

  constructor(private validatorConfig: inputMsg.ValidatorConfig<number | RegExp>[]) {
    super();
    // Note, 'minlength' and 'maxlength'
    // validators are already supported by Angular NgForm,
    // but we should emplement them to stop the validation
    // process when the first validator fails.
    // See: InputValidator.validate() implementation.
    const availableValidators = {
      maxlength: this.maxlength,
      minlength: this.minlength,
      pattern: this.pattern
    };
    super.setCurrentValidators(availableValidators, validatorConfig);
  }

  private maxlength(value: string, max: number): { maxlength: string } | null {
    if (super.empty(value)) {
      return null;
    }
    return value.length > max ? { maxlength: value } : null;
  }

  private minlength(value: string, min: number): { minlength: string } | null {

    if (value === null || typeof value === 'undefined') {
      return null;
    }
    if (value === '') {
      return { minlength: 'empty' };
    }
    return value.length < min ? { minlength: value } : null;
  }

  private pattern(value: string, regExp: RegExp): { pattern: string } | null {
    if (super.empty(value)) {
      return { pattern: 'empty' };
    }
    return regExp.test(value) ? null : { pattern: value };
  }

}
