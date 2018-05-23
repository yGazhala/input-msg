import { AbstractControl } from '@angular/forms';

import { InputValidator } from '../models/input-validator';

import { inputMsg } from '../types';

export class NumberValidator extends InputValidator {

  protected availableValidators = {
    integer: this.integer.bind(this),
    max: this.max.bind(this),
    min: this.min.bind(this)
  };
  protected validatorSequence = ['required', 'integer', 'min', 'max'];

  constructor(
    private validatorsToApply: { [key: string]: inputMsg.ValidatorParam }
  ) {
    super();
    super.setCurrentValidators(validatorsToApply);
  }

  private integer(value: number): { integer: any } | null {

    if (!this.number(value)) {
      return { integer: 'Not a number' };
    }
    const integer: boolean = Math.floor(value) === value;
    return integer ? null : { integer: value };
  }

  private max(value: number, max: number): { max: any } | null {

    if (!this.number(value)) {
      return { max: 'Not a number' };
    }
    if (value > max) {
      const error = {
        max: value === 0 ? '0' : value
      };
      return error;
    } else {
      return null;
    }
  }

  private min(value: number, min: number): { min: any } | null {

    if (!this.number(value)) {
      return { min: 'Not a number' };
    }
    if (value < min) {
      const error = {
        min: value === 0 ? '0' : value
      };
      return error;
    } else {
      return null;
    }
  }

  private number(arg: any): boolean {
    return !isNaN(parseFloat(arg)) && isFinite(arg);
  }

}
