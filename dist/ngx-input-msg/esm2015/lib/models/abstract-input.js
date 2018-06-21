/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { fromEventMock } from './from-event-mock';
/**
 * An abstract class to be derived by
 * a concrete input directive class.
 * Validates an input element and emits
 * the validation status to the listeners
 * (MsgComponent, LabelDirective)
 * through InputStorageService.
 * @abstract
 */
export class AbstractInput {
    /**
     * @param {?} elemRef
     * @param {?} inputStorageService
     * @param {?} inputValidatorFactory
     */
    constructor(elemRef, inputStorageService, inputValidatorFactory) {
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.inputValidatorFactory = inputValidatorFactory;
        this.statusSubscriptions = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ changeableProps = {
            placeholder: true,
            label: true,
            required: true
        };
        Object.keys(changes).forEach((name) => {
            if (!changeableProps[name] ||
                !this.validatorOptions[name] ||
                changes[name].isFirstChange()) {
                return;
            }
            if (name === 'placeholder' || name === 'label') {
                this.inputParams.label = changes[name].currentValue;
                this.inputParams.paramChange.next('label');
                return;
            }
            this.setValidationParams();
            this.inputParams.paramChange.next(/** @type {?} */ (name));
            this.createValidator();
            this.model.control.updateValueAndValidity();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.statusOff();
        this.inputStorageService.remove(this.inputKey);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.elem = this.elemRef.nativeElement;
        this.isMaterial = this.matInput === '';
        this.inputKey = this.id || this.name;
        this.checkRequiredParams();
        this.setMatFormFieldClass();
        this.initInputParams();
        this.setValidationParams();
        this.createValidator();
        this.inputStorageService.set(this.inputParams, this.id, this.name);
        // Wait till NgForm will be initialized
        setTimeout(() => {
            this.form = /** @type {?} */ (this.model.formDirective);
            if (!this.form) {
                throw new Error(`ngxInput directive: the element with name="${this.name}" have to be inside a <form> element`);
            }
            this.statusOn();
        }, 0);
    }
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.validator.validate(control);
    }
    /**
     * @param {?} name
     * @return {?}
     */
    hasBoolaenParam(name) {
        return this[name] === '' || this[name] === true;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    hasNumberParam(name) {
        return !isNaN(this[name]) && isFinite(this[name]);
    }
    /**
     * @return {?}
     */
    checkRequiredParams() {
        if (!this.name) {
            throw new Error(`ngxInput directive: can\'t find name attribute on the element`);
        }
        if (!(this.model instanceof NgModel)) {
            throw new Error(`ngxInput directive: NgModel instance have to be provided to [model] param of the element`);
        }
    }
    /**
     * @return {?}
     */
    createValidator() {
        const /** @type {?} */ validators = {};
        this.validatorParams.forEach(param => {
            validators[param.name] = param;
        });
        this.validator = this.inputValidatorFactory.create(validators);
    }
    /**
     * @return {?}
     */
    initInputParams() {
        this.inputParams = {
            label: this.placeholder || this.label,
            material: this.isMaterial,
            paramChange: new Subject(),
            status: new BehaviorSubject(/** @type {?} */ ('pristine')),
            valid: new BehaviorSubject(true),
            validationParams: undefined
        };
    }
    /**
     * Sets 'ngx-msg__mat-form-field'
     * if matInput directive was set
     * @return {?}
     */
    setMatFormFieldClass() {
        if (!this.isMaterial) {
            return;
        }
        const /** @type {?} */ input = /** @type {?} */ (this.elemRef.nativeElement);
        let /** @type {?} */ parent = input.parentElement;
        for (let /** @type {?} */ i = 0; i < 10; i++) {
            if (parent.tagName === 'MAT-FORM-FIELD') {
                break;
            }
            parent = parent.parentElement;
            if (i === 9) {
                throw new Error('ngxInput directive: Can\'t find parent <mat-form-field> elem');
            }
        }
        parent.classList.add('ngx-msg__mat-form-field');
    }
    /**
     * Sets current validation params on init or on changes
     * @return {?}
     */
    setValidationParams() {
        this.inputParams.validationParams = {};
        this.validatorParams = [];
        if (this.hasBoolaenParam('required')) {
            const /** @type {?} */ requiredParam = {
                name: 'required',
                value: undefined,
                set: true
            };
            this.inputParams.validationParams["required"] = requiredParam;
            this.validatorParams.push(requiredParam);
        }
        Object.keys(this.validatorOptions).forEach(name => {
            const /** @type {?} */ param = this.validatorOptions[name]();
            if (param.set) {
                this.inputParams.validationParams[name] = param;
                this.validatorParams.push(param);
            }
        });
    }
    /**
     * Stops generating the input status
     * @return {?}
     */
    statusOff() {
        this.statusSubscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }
    /**
     * Starts generating the input status
     * @return {?}
     */
    statusOn() {
        // Emits an error status if the input is invalid.
        const /** @type {?} */ emitErrorStatus = () => {
            for (const /** @type {?} */ param of this.validatorParams) {
                if (this.model.hasError(param.name)) {
                    this.inputParams.valid.next(false);
                    this.inputParams.status.next(param.name);
                    return;
                }
            }
        };
        const /** @type {?} */ emitErrorStatusOnTouched = () => {
            if (this.model.touched || this.form.submitted) {
                emitErrorStatus();
            }
        };
        const /** @type {?} */ emitValidAndPristineStatus = (status) => {
            switch (status) {
                case 'INVALID':
                    this.prevValid = false;
                    break;
                case 'VALID':
                    if (!this.prevValid) {
                        this.inputParams.valid.next(true);
                        this.inputParams.status.next('valid');
                    }
                    this.prevValid = true;
                    break;
                case 'PRISTINE':
                    this.inputParams.valid.next(true);
                    this.inputParams.status.next('pristine');
                    break;
                default:
                    return;
            }
        };
        const /** @type {?} */ blurSub = fromEventMock(this.elem, 'blur', emitErrorStatusOnTouched);
        this.statusSubscriptions.push(/** @type {?} */ (blurSub));
        const /** @type {?} */ controlValueSub = this.model.valueChanges
            .subscribe(emitErrorStatusOnTouched);
        this.statusSubscriptions.push(controlValueSub);
        const /** @type {?} */ formSubmitSub = this.form.ngSubmit
            .subscribe(emitErrorStatus);
        this.statusSubscriptions.push(formSubmitSub);
        const /** @type {?} */ controlStatusSub = this.model.statusChanges
            .subscribe(emitValidAndPristineStatus);
        this.statusSubscriptions.push(controlStatusSub);
        // Adds/removes 'ngx-input_invalid' class to the input
        const /** @type {?} */ toggleClassOnValidChange = (valid) => {
            if (valid) {
                this.elem.classList.remove('ngx-input_invalid');
            }
            else {
                this.elem.classList.add('ngx-input_invalid');
            }
        };
        const /** @type {?} */ validSub = this.inputParams.valid
            .subscribe(toggleClassOnValidChange);
        this.statusSubscriptions.push(validSub);
    }
}
AbstractInput.propDecorators = {
    id: [{ type: Input }],
    label: [{ type: Input }],
    matInput: [{ type: Input }],
    model: [{ type: Input }],
    name: [{ type: Input }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }]
};
function AbstractInput_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractInput.prototype.id;
    /** @type {?} */
    AbstractInput.prototype.label;
    /** @type {?} */
    AbstractInput.prototype.matInput;
    /** @type {?} */
    AbstractInput.prototype.model;
    /** @type {?} */
    AbstractInput.prototype.name;
    /** @type {?} */
    AbstractInput.prototype.placeholder;
    /** @type {?} */
    AbstractInput.prototype.required;
    /** @type {?} */
    AbstractInput.prototype.inputParams;
    /**
     * A dictionary with callbacks to get current validation params.
     * @type {?}
     */
    AbstractInput.prototype.validatorOptions;
    /** @type {?} */
    AbstractInput.prototype.elem;
    /** @type {?} */
    AbstractInput.prototype.form;
    /** @type {?} */
    AbstractInput.prototype.inputKey;
    /** @type {?} */
    AbstractInput.prototype.isMaterial;
    /**
     * Contains true if the prevoius input state was valid.
     * @type {?}
     */
    AbstractInput.prototype.prevValid;
    /** @type {?} */
    AbstractInput.prototype.statusSubscriptions;
    /**
     * The current validation params of the input
     * @type {?}
     */
    AbstractInput.prototype.validatorParams;
    /** @type {?} */
    AbstractInput.prototype.validator;
    /** @type {?} */
    AbstractInput.prototype.elemRef;
    /** @type {?} */
    AbstractInput.prototype.inputStorageService;
    /** @type {?} */
    AbstractInput.prototype.inputValidatorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtaW5wdXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5wdXQtbXNnLyIsInNvdXJjZXMiOlsibGliL21vZGVscy9hYnN0cmFjdC1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLEtBQUssRUFBOEMsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFtQixPQUFPLEVBQVUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7O0FBZWxELE1BQU07Ozs7OztJQStCSixZQUNZLE9BQW1CLEVBQ25CLG1CQUF3QyxFQUN4QyxxQkFBcUQ7UUFGckQsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBZ0M7bUNBVm5CLEVBQUU7S0FXM0M7Ozs7O0lBRUUsV0FBVyxDQUFDLE9BQXlDO1FBRTFELHVCQUFNLGVBQWUsR0FBRztZQUN0QixXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUN4QixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxhQUFhLEVBQzdCLENBQUMsQ0FBQyxDQUFDO2dCQUNELE1BQU0sQ0FBQzthQUNSO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLGFBQWEsSUFBSSxJ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RTtZQUN4RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ2pEO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDOUM7U0FDRixDQUFDO1FBQ0YsdUJBQU0sUUFBUSxHQUFpQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7YUFDbEQsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7OztpQkF6UXpDLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7bUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTmdNb2RlbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuLy8gcnhqcyB2NS92NiBjb21wYXRpYmxlXHJcbmltcG9ydCB7IGZyb21FdmVudE1vY2sgfSBmcm9tICcuL2Zyb20tZXZlbnQtbW9jayc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbi8vIHR5cGVzXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IGNsYXNzIHRvIGJlIGRlcml2ZWQgYnlcclxuICogYSBjb25jcmV0ZSBpbnB1dCBkaXJlY3RpdmUgY2xhc3MuXHJcbiAqIFZhbGlkYXRlcyBhbiBpbnB1dCBlbGVtZW50IGFuZCBlbWl0c1xyXG4gKiB0aGUgdmFsaWRhdGlvbiBzdGF0dXMgdG8gdGhlIGxpc3RlbmVyc1xyXG4gKiAoTXNnQ29tcG9uZW50LCBMYWJlbERpcmVjdGl2ZSlcclxuICogdGhyb3VnaCBJbnB1dFN0b3JhZ2VTZXJ2aWNlLlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIG1hdElucHV0OiAnJztcclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWw6IE5nTW9kZWw7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQ6ICcnIHwgYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGlucHV0UGFyYW1zOiBpbnB1dE1zZy5JbnB1dFBhcmFtcztcclxuICAvKipcclxuICAgKiBBIGRpY3Rpb25hcnkgd2l0aCBjYWxsYmFja3MgdG8gZ2V0IGN1cnJlbnQgdmFsaWRhdGlvbiBwYXJhbXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvck9wdGlvbnM6IHsgW25hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtRm4gfTtcclxuXHJcbiAgcHJpdmF0ZSBlbGVtOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgZm9ybTogTmdGb3JtO1xyXG4gIHByaXZhdGUgaW5wdXRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIGlzTWF0ZXJpYWw6IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQ29udGFpbnMgdHJ1ZSBpZiB0aGUgcHJldm9pdXMgaW5wdXQgc3RhdGUgd2FzIHZhbGlkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJldlZhbGlkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgc3RhdHVzU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvZiB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRvclBhcmFtczogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXTtcclxuICBwcml2YXRlIHZhbGlkYXRvcjogaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCBpbnB1dFZhbGlkYXRvckZhY3Rvcnk6IGlucHV0TXNnLklucHV0VmFsaWRhdG9yRmFjdG9yeVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWFibGVQcm9wcyA9IHtcclxuICAgICAgcGxhY2Vob2xkZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgIGlmICghY2hhbmdlYWJsZVByb3BzW25hbWVdIHx8XHJcbiAgICAgICAgIXRoaXMudmFsaWRhdG9yT3B0aW9uc1tuYW1lXSB8fFxyXG4gICAgICAgIGNoYW5nZXNbbmFtZV0uaXNGaXJzdENoYW5nZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5hbWUgPT09ICdwbGFjZWhvbGRlcicgfHwgbmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMubGFiZWwgPSBjaGFuZ2VzW25hbWVdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnBhcmFtQ2hhbmdlLm5leHQoJ2xhYmVsJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgICAgdGhpcy5pbnB1dFBhcmFtcy5wYXJhbUNoYW5nZS5uZXh0KG5hbWUgYXMgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICAgIHRoaXMubW9kZWwuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhdHVzT2ZmKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UucmVtb3ZlKHRoaXMuaW5wdXRLZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZWxlbSA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5pc01hdGVyaWFsID0gdGhpcy5tYXRJbnB1dCA9PT0gJyc7XHJcbiAgICB0aGlzLmlucHV0S2V5ID0gdGhpcy5pZCB8fCB0aGlzLm5hbWU7XHJcblxyXG4gICAgdGhpcy5jaGVja1JlcXVpcmVkUGFyYW1zKCk7XHJcblxyXG4gICAgdGhpcy5zZXRNYXRGb3JtRmllbGRDbGFzcygpO1xyXG5cclxuICAgIHRoaXMuaW5pdElucHV0UGFyYW1zKCk7XHJcbiAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2Uuc2V0KHRoaXMuaW5wdXRQYXJhbXMsIHRoaXMuaWQsIHRoaXMubmFtZSk7XHJcblxyXG4gICAgLy8gV2FpdCB0aWxsIE5nRm9ybSB3aWxsIGJlIGluaXRpYWxpemVkXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5tb2RlbC5mb3JtRGlyZWN0aXZlIGFzIE5nRm9ybTtcclxuICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neElucHV0IGRpcmVjdGl2ZTogdGhlIGVsZW1lbnQgd2l0aCBuYW1lPVwiJHt0aGlzLm5hbWV9XCIgaGF2ZSB0byBiZSBpbnNpZGUgYSA8Zm9ybT4gZWxlbWVudGApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdHVzT24oKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzQm9vbGFlblBhcmFtKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXNbbmFtZV0gPT09ICcnIHx8IHRoaXNbbmFtZV0gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzTnVtYmVyUGFyYW0obmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHRoaXNbbmFtZV0pICYmIGlzRmluaXRlKHRoaXNbbmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja1JlcXVpcmVkUGFyYW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hJbnB1dCBkaXJlY3RpdmU6IGNhblxcJ3QgZmluZCBuYW1lIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gICAgaWYgKCEodGhpcy5tb2RlbCBpbnN0YW5jZW9mIE5nTW9kZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4SW5wdXQgZGlyZWN0aXZlOiBOZ01vZGVsIGluc3RhbmNlIGhhdmUgdG8gYmUgcHJvdmlkZWQgdG8gW21vZGVsXSBwYXJhbSBvZiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdG9yczogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSA9IHt9O1xyXG4gICAgdGhpcy52YWxpZGF0b3JQYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgIHZhbGlkYXRvcnNbcGFyYW0ubmFtZV0gPSBwYXJhbTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdG9yID0gdGhpcy5pbnB1dFZhbGlkYXRvckZhY3RvcnkuY3JlYXRlKHZhbGlkYXRvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SW5wdXRQYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcyA9IHtcclxuICAgICAgbGFiZWw6IHRoaXMucGxhY2Vob2xkZXIgfHwgdGhpcy5sYWJlbCxcclxuICAgICAgbWF0ZXJpYWw6IHRoaXMuaXNNYXRlcmlhbCxcclxuICAgICAgcGFyYW1DaGFuZ2U6IG5ldyBTdWJqZWN0KCksXHJcbiAgICAgIHN0YXR1czogbmV3IEJlaGF2aW9yU3ViamVjdCgncHJpc3RpbmUnIGFzIGlucHV0TXNnLklucHV0U3RhdHVzKSxcclxuICAgICAgdmFsaWQ6IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSksXHJcbiAgICAgIHZhbGlkYXRpb25QYXJhbXM6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgJ25neC1tc2dfX21hdC1mb3JtLWZpZWxkJ1xyXG4gICAqIGlmIG1hdElucHV0IGRpcmVjdGl2ZSB3YXMgc2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRNYXRGb3JtRmllbGRDbGFzcygpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNNYXRlcmlhbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBsZXQgcGFyZW50OiBIVE1MRWxlbWVudCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ01BVC1GT1JNLUZJRUxEJykge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBpZiAoaSA9PT0gOSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbmd4SW5wdXQgZGlyZWN0aXZlOiBDYW5cXCd0IGZpbmQgcGFyZW50IDxtYXQtZm9ybS1maWVsZD4gZWxlbScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnbmd4LW1zZ19fbWF0LWZvcm0tZmllbGQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvbiBpbml0IG9yIG9uIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNldFZhbGlkYXRpb25QYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zID0ge307XHJcbiAgICB0aGlzLnZhbGlkYXRvclBhcmFtcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLmhhc0Jvb2xhZW5QYXJhbSgncmVxdWlyZWQnKSkge1xyXG4gICAgICBjb25zdCByZXF1aXJlZFBhcmFtOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSA9IHtcclxuICAgICAgICBuYW1lOiAncmVxdWlyZWQnLFxyXG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgc2V0OiB0cnVlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcy5yZXF1aXJlZCA9IHJlcXVpcmVkUGFyYW07XHJcbiAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocmVxdWlyZWRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy52YWxpZGF0b3JPcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwYXJhbTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gPSB0aGlzLnZhbGlkYXRvck9wdGlvbnNbbmFtZV0oKTtcclxuICAgICAgaWYgKHBhcmFtLnNldCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXSA9IHBhcmFtO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT2ZmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YikgPT4ge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT24oKTogdm9pZCB7XHJcblxyXG4gICAgLy8gRW1pdHMgYW4gZXJyb3Igc3RhdHVzIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkLlxyXG4gICAgY29uc3QgZW1pdEVycm9yU3RhdHVzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHRoaXMudmFsaWRhdG9yUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaGFzRXJyb3IocGFyYW0ubmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KHBhcmFtLm5hbWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlbWl0RXJyb3JTdGF0dXNPblRvdWNoZWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm1vZGVsLnRvdWNoZWQgfHwgdGhpcy5mb3JtLnN1Ym1pdHRlZCkge1xyXG4gICAgICAgIGVtaXRFcnJvclN0YXR1cygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzID0gKHN0YXR1czogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgY2FzZSAnSU5WQUxJRCc6XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnVkFMSUQnOlxyXG4gICAgICAgICAgaWYgKCF0aGlzLnByZXZWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQUklTVElORSc6XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCdwcmlzdGluZScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBibHVyU3ViID0gZnJvbUV2ZW50TW9jayh0aGlzLmVsZW0sICdibHVyJywgZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGJsdXJTdWIgYXMgU3Vic2NyaXB0aW9uKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sVmFsdWVTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xWYWx1ZVN1Yik7XHJcblxyXG4gICAgY29uc3QgZm9ybVN1Ym1pdFN1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLm5nU3VibWl0XHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGZvcm1TdWJtaXRTdWIpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xTdGF0dXNTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwuc3RhdHVzQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xTdGF0dXNTdWIpO1xyXG5cclxuICAgIC8vIEFkZHMvcmVtb3ZlcyAnbmd4LWlucHV0X2ludmFsaWQnIGNsYXNzIHRvIHRoZSBpbnB1dFxyXG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlID0gKHZhbGlkOiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgdmFsaWRTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMudmFsaWRcclxuICAgICAgLnN1YnNjcmliZSh0b2dnbGVDbGFzc09uVmFsaWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLnB1c2godmFsaWRTdWIpO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==