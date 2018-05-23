import { AbstractControl } from '@angular/forms';

import { inputMsg } from '../types';

export abstract class InputValidator implements inputMsg.InputValidator {

  /**
   * All available validators for specific input type
   */
  protected abstract availableValidators: { [name: string]: inputMsg.ValidatorFn<any> };
  /**
   * The sequence of validator names to validate an input element with.
   * Validators are applied one by one.
   * @example ['required', 'minlenght', 'maxlength', 'pattern']
   */
  protected abstract validatorSequence: string[];
  /**
   * The current validators applied to the specific input element
   */
  private currentValidators: inputMsg.ValidatorConfig<any>[];


  public validate(control: AbstractControl): { [validatorName: string]: any } | null {

    let result: { [validatorName: string]: any } | null = null;
    for (const validator of this.currentValidators) {
      result = validator.fn(control.value, validator.value);
      // break if the input is invalid
      if (result !== null) {
        break;
      }
    }
    return result;
  }


  protected empty(value: any): boolean {
    return typeof value === 'undefined' || value === '' || value === null;
  }

  protected setCurrentValidators(validatorsToApply: { [validatorName: string]: inputMsg.ValidatorParam }): void {

    if (typeof this.availableValidators !== 'object') {
      throw new Error('InputValidator class: this.availableValidators have to be initialized in the derived class');
    }
    if (!Array.isArray(this.validatorSequence)) {
      throw new Error('InputValidator class: this.validatorSequence have to be initialized in the derived class');
    }

    this.availableValidators.required = this.required.bind(this);

    this.currentValidators = [];
    const paramSequence = this.getValidatorParamSequence(validatorsToApply);
    paramSequence.forEach(param => {
      const config: inputMsg.ValidatorConfig<any> = {
        name: param.name,
        value: param.value,
        set: param.set,
        fn: this.availableValidators[param.name]
      };
      this.currentValidators.push(config);
    });
  }

  /**
   * Returns the sequence of configs of validators
   */
  private getValidatorParamSequence<T>(validatorsToApply: { [key: string]: inputMsg.ValidatorParam }): inputMsg.ValidatorParam[] {

    const config: inputMsg.ValidatorParam[] = [];
    this.validatorSequence.forEach(name => {
      if (validatorsToApply[name]) {
        config.push(validatorsToApply[name]);
      }
    });
    return config;
  }

  /**
   * Validation function to be used with an any type of an input element
   */
  private required(value: string): { required: true } | null {
    return this.empty(value) ? { required: true } : null;
  }

}
