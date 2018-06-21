import { ElementRef, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { TextValidatorFactory } from './text-validator-factory.service';
export declare class InputTextDirective extends AbstractInput implements OnChanges, OnInit, OnDestroy {
    protected elemRef: ElementRef;
    protected inputStorageService: InputStorageService;
    protected validatorFactory: TextValidatorFactory;
    maxlength: string | number;
    minlength: string | number;
    pattern: RegExp;
    protected validatorOptions: {
        maxlength: () => {
            name: string;
            set: boolean;
            value: number;
        };
        minlength: () => {
            name: string;
            set: boolean;
            value: number;
        };
        pattern: () => {
            name: string;
            set: boolean;
            value: RegExp;
        };
    };
    private maxLengthSub;
    constructor(elemRef: ElementRef, inputStorageService: InputStorageService, validatorFactory: TextValidatorFactory);
    ngOnChanges(changes: {
        [prop: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    private emitMaxLengthStatus();
    /**
     * Stops generating 'maxlength' status
     */
    private maxLengthOff();
    /**
     * Starts generating 'maxlength' status
     */
    private maxLengthOn();
}
