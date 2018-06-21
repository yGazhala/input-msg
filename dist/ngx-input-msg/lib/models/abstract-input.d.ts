import { ElementRef, OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { AbstractControl, NgModel } from '@angular/forms';
import { InputStorageService } from '../input-storage.service';
import { inputMsg } from '../types';
/**
 * An abstract class to be derived by
 * a concrete input directive class.
 * Validates an input element and emits
 * the validation status to the listeners
 * (MsgComponent, LabelDirective)
 * through InputStorageService.
 */
export declare abstract class AbstractInput implements OnInit, OnChanges, OnDestroy {
    protected elemRef: ElementRef;
    protected inputStorageService: InputStorageService;
    protected inputValidatorFactory: inputMsg.InputValidatorFactory;
    id: string;
    label: string;
    matInput: '';
    model: NgModel;
    name: string;
    placeholder: string;
    required: '' | boolean;
    protected inputParams: inputMsg.InputParams;
    /**
     * A dictionary with callbacks to get current validation params.
     */
    protected abstract validatorOptions: {
        [name: string]: inputMsg.ValidatorParamFn;
    };
    private elem;
    private form;
    private inputKey;
    private isMaterial;
    /**
     * Contains true if the prevoius input state was valid.
     */
    private prevValid;
    private statusSubscriptions;
    /**
     * The current validation params of the input
     */
    private validatorParams;
    private validator;
    constructor(elemRef: ElementRef, inputStorageService: InputStorageService, inputValidatorFactory: inputMsg.InputValidatorFactory);
    ngOnChanges(changes: {
        [prop: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    validate(control: AbstractControl): {
        [validatorName: string]: any;
    } | null;
    protected hasBoolaenParam(name: string): boolean;
    protected hasNumberParam(name: string): boolean;
    private checkRequiredParams();
    private createValidator();
    private initInputParams();
    /**
     * Sets 'ngx-msg__mat-form-field'
     * if matInput directive was set
     */
    private setMatFormFieldClass();
    /**
     * Sets current validation params on init or on changes
     */
    private setValidationParams();
    /**
     * Stops generating the input status
     */
    private statusOff();
    /**
     * Starts generating the input status
     */
    private statusOn();
}
