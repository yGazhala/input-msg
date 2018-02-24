import { AbstractControl } from '@angular/forms';

import { InputValidator } from './input-validator';

import { inputMsg } from '../../types';

export class NumberValidator extends InputValidator {

  constructor(private validatorConfig: inputMsg.ValidatorConfig<number>[]) {
    super();
    const availableValidators = {
      integer: this.integer,
      max: this.max,
      min: this.min
    };
    this.initCurrentValidators(availableValidators, validatorConfig);
  }

  private integer(value: number): { integer: number } | null {
    // tslint:disable-next-line:no-bitwise
    const isInteger: boolean = !isNaN(value) && (value | 0) === value;
    return isInteger ? null : { integer: value };
  }

  private max(value: number, max: number): { max: number } | null {
    return (value > max) ? { max: value } : null;
  }

  private min(value: number, min: number): { min: number } | null {
    return (value < min) ? { min: value } : null;
  }

}
