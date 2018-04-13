import { TestBed, inject } from '@angular/core/testing';

import { EmailValidator } from './validators/email-validator';
import { NumberValidator } from './validators/number-validator';
import { TextValidator } from './validators/text-validator';
import { InputValidatorFactory } from './input-validator-factory.service';

import { inputMsg } from '../types';

describe('InputValidatorFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputValidatorFactory]
    });
  });

  it('should create TextValidator', inject([InputValidatorFactory], (service: InputValidatorFactory) => {
    const validators: { [key: string]: inputMsg.ValidatorConfig<number> } = {
      maxlength: { name: 'maxlength', compareWith: 5 }
    };
    const validator = service.create('textLike', validators);
    expect(validator instanceof TextValidator).toBe(true);
  }));

  it('should create EmailValidator', inject([InputValidatorFactory], (service: InputValidatorFactory) => {
    const validators: { [key: string]: inputMsg.ValidatorConfig<undefined> } = {
      email: { name: 'email' }
    };
    const validator = service.create('email', validators);
    expect(validator instanceof EmailValidator).toBe(true);
  }));

  it('should create NumberValidator', inject([InputValidatorFactory], (service: InputValidatorFactory) => {
    const validators: { [key: string]: inputMsg.ValidatorConfig<undefined> } = {
      integer: { name: 'integer' }
    };
    const validator = service.create('number', validators);
    expect(validator instanceof NumberValidator).toBe(true);
  }));


});
