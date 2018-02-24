import { AbstractControl } from '@angular/forms';

import { InputValidator } from './input-validator';

import { inputMsg } from '../../types';

export class EmailValidator extends InputValidator {

  constructor(private validatorConfig: inputMsg.ValidatorConfig<undefined>[]) {
    super();
    const availableValidators = {
      email: this.email
    };
    this.initCurrentValidators(availableValidators, validatorConfig);
  }

  private email(value: string): { email: string } | null {
    // Do not validate field if there is no value provided.
    // If the value is required the input must contain 'required' attribute.
    if (typeof value === 'undefined') {
      return null;
    }
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    // tslint:disable-next-line:max-line-length
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid: boolean = regExp.test(value);

    return isValid ? null : { email: value };
  }

}
