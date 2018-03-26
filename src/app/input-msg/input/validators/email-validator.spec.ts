import { EmailValidator } from './email-validator';
import {
  createMockControl,
  createToBeValidMatcher,
  validateEmptyValue
} from '../../testing';

describe('EmailValidator', () => {

  let validator: EmailValidator;

  beforeEach(() => {
    validator = new EmailValidator([{ name: 'email'}]);

    jasmine.addMatchers(
      createToBeValidMatcher('email')
    );
  });

  it('should be invalid if empty', () => {
    validateEmptyValue(validator);
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

});
