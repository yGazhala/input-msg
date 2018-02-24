import { AbstractControl } from '@angular/forms';

import { InputValidator } from './input-validator';

import { inputMsg } from '../../types';

/**
 * Validates 'text' like input element.
 */
export class TextValidator extends InputValidator {

  constructor(private validatorConfig: inputMsg.ValidatorConfig<number | RegExp>[]) {
    super();
    // Note, 'required', 'minlength' and 'maxlength'
    // validators are already supported by Angular NgForm,
    // but we should emplement them to stop the validation
    // process when the first validator fails.
    // See: InputValidator.validate() implementation.
    const availableValidators = {
      maxlength: this.maxlength.bind(this),
      minlength: this.minlength.bind(this),
      pattern: this.pattern.bind(this),
      required: this.required.bind(this)
    };
    this.initCurrentValidators(availableValidators, validatorConfig);
  }

  private maxlength(value: string, max: number): { maxlength: string } | null {
    // Do not validate field if there is no value provided.
    // If the value is required the input should contain 'required' attribute.
    if (this.isEmpty(value)) {
      return null;
    }
    return value.length > max ? { maxlength: value } : null;
  }

  private minlength(value: string, min: number): { minlength: string } | null {
    // Do not validate field if there is no value provided.
    // If the value is required the input should contain 'required' attribute.
    if (this.isEmpty(value)) {
      return null;
    }
    return value.length < min ? { minlength: value } : null;
  }

  private pattern(value: string, regExp: RegExp): { pattern: string } | null {
    // Do not validate field if there is no value provided.
    // If the value is required the input should contain 'required' attribute.
    if (this.isEmpty(value)) {
      return null;
    }
    return regExp.test(value) ? null : { pattern: value };
  }

  private required(value: string): { required: true } | null {
    return this.isEmpty(value) ? { required: true } : null;
  }

  private isEmpty(value: string): boolean {
    return typeof value === 'undefined' || value === '' || value === null;
  }

}
