import { TestBed, inject } from '@angular/core/testing';

import { InputMsgService } from './input-msg.service';

describe('InputMsgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputMsgService]
    });
  });

  it('should ...', inject([InputMsgService], (service: InputMsgService) => {
    expect(service).toBeTruthy();
  }));
});
