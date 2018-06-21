import { ElementRef } from '@angular/core';
import { AbstractInput } from '../models/abstract-input';
import { EmailValidatorFactory } from './email-validator-factory.service';
import { InputStorageService } from '../input-storage.service';
export declare class InputEmailDirective extends AbstractInput {
    protected elemRef: ElementRef;
    protected inputStorageService: InputStorageService;
    protected validatorFactory: EmailValidatorFactory;
    protected validatorOptions: {
        email: () => {
            name: string;
            set: boolean;
        };
    };
    constructor(elemRef: ElementRef, inputStorageService: InputStorageService, validatorFactory: EmailValidatorFactory);
}
