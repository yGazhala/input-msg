import { TestBed, inject } from '@angular/core/testing';

import { InputValidatorFactory } from './input-validator-factory.service';

describe('InputValidatorFactory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputValidatorFactory]
    });
  });

  it('should ...', inject([InputValidatorFactory], (service: InputValidatorFactory) => {
    expect(service).toBeTruthy();
  }));
});
