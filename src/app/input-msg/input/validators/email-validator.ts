import { AbstractControl } from '@angular/forms';

import { InputValidator } from './input-validator';

import { inputMsg } from '../../types';

export class EmailValidator extends InputValidator {

  protected availableValidators = {
    email: this.email
  };
  protected validatorSequence = ['required', 'email'];

  constructor(
    private validatorsToApply: { [key: string]: inputMsg.ValidatorConfig<void> }
  ) {
    super();
    super.setCurrentValidators(validatorsToApply);
  }

  private email(value: string): { email: string } | null {

    /**
     * We should skip the validation for empty values.
     * Consider the case when a client sets an optional
     * email input that should be validated
     * only if a user inputs some text.
     */
    if (super.empty(value)) {
      return { email: null };
    }
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    // tslint:disable-next-line:max-line-length
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid: boolean = regExp.test(value);

    return isValid ? null : { email: value };
  }

}
