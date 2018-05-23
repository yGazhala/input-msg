import { TextValidator } from './text-validator';
import {
  createMockControl,
  createToBeValidMatcher,
  validateEmptyValue
} from '../testing';

describe('TextValidator', () => {

  // #maxlength
  describe('#maxlength', () => {
    let validator: TextValidator;

    beforeEach(() => {
      validator = new TextValidator({
        maxlength: {
          name: 'maxlength',
          compareWith: 5
        }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('maxlength')
      );
    });

    it('should be invalid if value exceeds a limit', () => {
      const control = createMockControl('longer');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid if a value is empty', () => {

      const controlUndef = createMockControl(undefined);
      expect(validator.validate(controlUndef))['toBeValid']();

      const controlNull = createMockControl(null);
      expect(validator.validate(controlUndef))['toBeValid']();

      const controlEmpty = createMockControl('');
      expect(validator.validate(controlEmpty))['toBeValid']();
    });

    it('should be valid if a value equals to a limit', () => {
      const control = createMockControl('equal');
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid if a value is less than a limit', () => {
      const control = createMockControl('four');
      expect(validator.validate(control))['toBeValid']();
    });
  });

  // #minlength
  describe('#minlength', () => {
    let validator: TextValidator;

    beforeEach(() => {
      validator = new TextValidator({
        minlength: {
          name: 'minlength',
          compareWith: 5
        }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('minlength')
      );
    });

    it('should be invalid if a value is an empty string', () => {
      const control = createMockControl('');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be invalid if a value is less than a limit', () => {
      const control = createMockControl('less');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid with null or undefined', () => {

      const controlUndef = createMockControl(undefined);
      expect(validator.validate(controlUndef))['toBeValid']();

      const controlNull = createMockControl(null);
      expect(validator.validate(controlUndef))['toBeValid']();
    });

    it('should be valid if a value equals to a limit', () => {
      const control = createMockControl('equal');
      expect(validator.validate(control))['toBeValid']();
    });

    it('should be valid if a value exceeds a limit', () => {
      const control = createMockControl('exceeds');
      expect(validator.validate(control))['toBeValid']();
    });
  });

  // #pattern
  describe('#pattern', () => {
    let validator: TextValidator;

    beforeEach(() => {
      validator = new TextValidator({
        pattern: {
          name: 'pattern',
          compareWith: /(?=.*\d)(?=.*[a-z])/i
        }
      });

      jasmine.addMatchers(
        createToBeValidMatcher('pattern')
      );
    });

    it('should be invalid if a value is empty', () => {
      validateEmptyValue(validator);
    });

    it('should be invalid if a value does not contain letters', () => {
      const control = createMockControl('123');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be invalid if a value does not contain digits', () => {
      const control = createMockControl('abc');
      expect(validator.validate(control)).not['toBeValid']();
    });

    it('should be valid if a value contain digits and letters', () => {
      const control = createMockControl('a1');
      expect(validator.validate(control))['toBeValid']();
    });
  });


});
