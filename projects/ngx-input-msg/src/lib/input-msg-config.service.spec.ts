import { TestBed, inject } from '@angular/core/testing';

import { InputMsgConfigService } from './input-msg-config.service';

describe('InputMsgConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputMsgConfigService]
    });
  });

  it('should ...', inject([InputMsgConfigService], (service: InputMsgConfigService) => {
    expect(service).toBeTruthy();
  }));
});
