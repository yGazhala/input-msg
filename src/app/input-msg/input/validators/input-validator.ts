import { AbstractControl } from '@angular/forms';

import { inputMsg } from '../../types';

export abstract class InputValidator implements inputMsg.InputValidator {

  private currentValidators: inputMsg.Validator<any>[];

  public validate(control: AbstractControl): { [validatorName: string]: any } | null {

    let result: { [validatorName: string]: any } | null = null;
    for (const validator of this.currentValidators) {
      result = validator.validate(control.value, validator.compareWith);
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

  protected setCurrentValidators(
    availableValidators: { [key: string]: inputMsg.ValidatorFn<any> },
    validatorConfig: inputMsg.ValidatorConfig<any>[]
  ): void {

    availableValidators.required = this.required.bind(this);

    this.currentValidators = [];
    validatorConfig.forEach(config => {
      this.currentValidators.push({
        validate: availableValidators[config.name],
        compareWith: config.compareWith
      });
    });
  }

  private required(value: string): { required: true } | null {
    return this.empty(value) ? { required: true } : null;
  }

}
