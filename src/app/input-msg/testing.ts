import { AbstractControl } from '@angular/forms';
import { inputMsg } from './types';

export function createMockControl(value: any): AbstractControl {
  return { value } as AbstractControl;
}

/**
 * Creates a custom jasmine.toBeValid() matcher
 * to test input validation functions.
 * @see https://jasmine.github.io/tutorials/custom_matcher
 */
export function createToBeValidMatcher(validator: inputMsg.ValidatorName): jasmine.CustomMatcherFactories {

  function matcherFactory(): jasmine.CustomMatcher {

    return {
      compare: (actual: null | object): jasmine.CustomMatcherResult => {
        const result: jasmine.CustomMatcherResult = { pass: undefined };
        if (actual === null) {
          result.pass = true;
          return result;
        }
        // tslint:disable-next-line:triple-equals
        if (typeof actual === 'object' && !!actual[validator]) {
          result.pass = false;
        } else {
          result.pass = true;
        }
        return result;
      }
    };
  }

  return {
    toBeValid: matcherFactory
  };
}

export function validateEmptyValue(validator: inputMsg.InputValidator): void {

  const controlUndef = createMockControl(undefined);
  expect(validator.validate(controlUndef)).not['toBeValid']();

  const controlNull = createMockControl(null);
  expect(validator.validate(controlUndef)).not['toBeValid']();

  const controlEmpty = createMockControl('');
  expect(validator.validate(controlEmpty)).not['toBeValid']();
}
