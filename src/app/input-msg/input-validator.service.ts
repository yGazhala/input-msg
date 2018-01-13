import { Injectable } from '@angular/core';

/**
 * Provides validation methods
 */
@Injectable()
export class InputValidator {

  public email(value: string): { email: string } {
    // Do not validate field if there is no value provided.
    // If the value is required the input must contain the required attribute.
    if (typeof value === 'undefined') {
        return null;
    }
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    // tslint:disable-next-line:max-line-length
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid: boolean = regExp.test(value);

    return (!isValid) ? {email: value} : null;
  }

  public max(value: number, max: number): { max: number } {
    return (value > max) ? {max: value} : null;
  }

  public min(value: number, min: number): { min: number } {
    return (value < min) ? {min: value} : null;
  }

  public isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  public integer(value: any): { integer: any } {
    const x: number = parseFloat(value);
    const isInteger: boolean = !isNaN(value) && (x | 0) === x;
    return (!isInteger) ? { integer: value } : null;
  }

}
