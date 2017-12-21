import { TestBed, inject } from '@angular/core/testing';

import { InputValidator } from './input-validator.service';

describe('ValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputValidator]
    });
  });

  it('should ...', inject([InputValidator], (service: InputValidator) => {
    expect(service).toBeTruthy();
  }));
});
