import { ElementRef } from '@angular/core';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { NumberValidatorFactory } from './number-validator-factory.service';
export declare class InputNumberDirective extends AbstractInput {
    protected elemRef: ElementRef;
    protected inputStorageService: InputStorageService;
    protected validatorFactory: NumberValidatorFactory;
    integer: '' | boolean;
    max: string | number;
    min: string | number;
    protected validatorOptions: {
        integer: () => {
            name: string;
            set: boolean;
        };
        max: () => {
            name: string;
            set: boolean;
            value: number;
        };
        min: () => {
            name: string;
            set: boolean;
            value: number;
        };
    };
    constructor(elemRef: ElementRef, inputStorageService: InputStorageService, validatorFactory: NumberValidatorFactory);
}
