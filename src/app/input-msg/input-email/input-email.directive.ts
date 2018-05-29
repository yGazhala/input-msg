import { Directive, ElementRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

import { AbstractInput } from '../models/abstract-input';
import { EmailValidatorFactory } from './email-validator-factory.service';
import { InputStorageService } from '../input-storage.service';

@Directive({
  selector: 'input[ngxInputEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: InputEmailDirective,
      multi: true
    },
    EmailValidatorFactory
  ]
})
export class InputEmailDirective extends AbstractInput {

  protected validatorOptions = {
    email: () => {
      // The email validator is always set by default
      return {
        name: 'email',
        set: true
      };
    }
  };

  constructor(
    protected elemRef: ElementRef,
    protected inputStorageService: InputStorageService,
    protected validatorFactory: EmailValidatorFactory
  ) {
    super(elemRef, inputStorageService, validatorFactory);
  }

}
