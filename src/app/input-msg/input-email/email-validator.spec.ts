import { EmailValidator } from './email-validator';
import {
  createMockControl,
  createToBeValidMatcher
} from '../testing';

describe('EmailValidator', () => {

  let validator: EmailValidator;

  beforeEach(() => {
    validator = new EmailValidator({ email: { name: 'email' } });
    jasmine.addMatchers(
      createToBeValidMatcher('email')
    );
  });

  it('should be invalid if "@" is missed', () => {
    const control = createMockControl('something.co');
    expect(validator.validate(control)).not['toBeValid']();
  });

  it('should be invalid with "@a.co" pattern', () => {
    const control = createMockControl('@a.co');
    expect(validator.validate(control)).not['toBeValid']();
  });

  it('should be invalid with "a@.co" pattern', () => {
    const control = createMockControl('a@.co');
    expect(validator.validate(control)).not['toBeValid']();
  });

  it('should be invalid with "a@a" pattern', () => {
    const control = createMockControl('a@a');
    expect(validator.validate(control)).not['toBeValid']();
  });

  it('should be invalid with "a@a.c" pattern', () => {
    const control = createMockControl('a@a.c');
    expect(validator.validate(control)).not['toBeValid']();
  });

  it('should be valid with "a@a.co" pattern', () => {
    const control = createMockControl('a@a.co');
    expect(validator.validate(control))['toBeValid']();
  });

  /**
   * We should skip the validation for empty values.
   * Consider the case when a client sets an optional
   * email input that should be validated
   * only if a user inputs some text.
   */
  it('should be valid if empty', () => {
    const controlUndef = createMockControl(undefined);
    expect(validator.validate(controlUndef))['toBeValid']();

    const controlNull = createMockControl(null);
    expect(validator.validate(controlUndef))['toBeValid']();

    const controlEmpty = createMockControl('');
    expect(validator.validate(controlEmpty))['toBeValid']();
  });

});
