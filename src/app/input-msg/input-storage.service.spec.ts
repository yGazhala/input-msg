import { TestBed, inject } from '@angular/core/testing';

import { InputStorageService } from './input-storage.service';

describe('InputStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputStorageService]
    });
  });

  it('should be created', inject([InputStorageService], (service: InputStorageService) => {
    expect(service).toBeTruthy();
  }));
});
