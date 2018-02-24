import { AbstractControl } from '@angular/forms';

import { inputMsg } from '../../types';

export abstract class InputValidator {

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

  protected initCurrentValidators(availableValidators: { [key: string]: inputMsg.ValidatorFn<any> },
    validatorConfig: inputMsg.ValidatorConfig<any>[]): void {

    this.currentValidators = [];
    validatorConfig.forEach(config => {
      this.currentValidators.push({
        validate: availableValidators[config.name],
        compareWith: config.compareWith
      });
    });
  }

}
