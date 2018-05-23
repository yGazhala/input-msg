import { NumberValidator } from './number-validator';
import {
  createMockControl,
  createToBeValidMatcher,
  validateEmptyValue
} from '../testing';

describe('NumberValidator', () => {

  // #integer
  describe('#integer', () => {
    let validator: NumberValidator;

    beforeEach(() => {
      validator = new NumberValidator({
        integer: {
          name: 'integer',
          value: true,
          set: true
        }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('integer')
      );
    });

    it('should be invalid if a value is empty', () => {
      validateEmptyValue(validator);
    });

    it('should be invalid with 1.11', () => {
      const control = createMockControl(1.11);
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be invalid with string "1.11"', () => {
      const control = createMockControl('1.11');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be invalid with string "1"', () => {
      const control = createMockControl('1');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid with 1', () => {
      const control = createMockControl(1);
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid with 0', () => {
      const control = createMockControl(0);
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid with -1', () => {
      const control = createMockControl(-1);
      expect(validator.validate(control))['toBeValid']();
    });
  });

  // #max
  describe('#max', () => {
    let validator: NumberValidator;

    beforeEach(() => {
      validator = new NumberValidator({
        max: { name: 'max', value: 1, set: true }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('max')
      );
    });

    it('should be invalid if a value is empty', () => {
      validateEmptyValue(validator);
    });

    it('should be invalid if a value exceeds a limit', () => {
      const control = createMockControl(1.001);
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid if a value equals to a limit', () => {
      const control = createMockControl(1);
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid if a value is less than a limit', () => {
      const control = createMockControl(0.999);
      expect(validator.validate(control))['toBeValid']();
    });
  });

  // #min
  describe('#min', () => {
    let validator: NumberValidator;

    beforeEach(() => {
      validator = new NumberValidator({
        min: { name: 'min', value: 1, set: true }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('min')
      );
    });

    it('should be invalid if a value is empty', () => {
      validateEmptyValue(validator);
    });

    it('should be invalid if a value is less than a limit', () => {
      const control = createMockControl(0.999);
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid if a value equals to a limit', () => {
      const control = createMockControl(1);
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid if a value exceeds a limit', () => {
      const control = createMockControl(1.001);
      expect(validator.validate(control))['toBeValid']();
    });
  });


});
