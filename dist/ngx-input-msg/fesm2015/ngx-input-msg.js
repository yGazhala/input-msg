import { Injectable, Input, Directive, ElementRef, Component, ViewEncapsulation, NgModule } from '@angular/core';
import { NgModel, NG_VALIDATORS, FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides configuration for displaying messages.
 */
class InputMsgConfigService {
    constructor() {
        this.defaultConfig = {
            colors: {
                error: '#f44336',
                maxlength: 'grey'
            },
            position: 'bottom-left',
            msg: {
                email: (label) => `Wrong ${label}`,
                integer: 'Fractional digits are forbidden',
                max: (label, allowed) => `Maximum allowed ${label} is ${allowed}`,
                min: (label, allowed) => `Minimum allowed ${label} is ${allowed}`,
                maxlength: (label, allowed) => `Maximum ${allowed} chars limit was reached`,
                minlength: (label, allowed) => `At least ${allowed} chars length are required`,
                pattern: (label) => `Invalid ${label}`,
                required: (label) => `${label} is required`
            }
        };
    }
    /**
     * @return {?}
     */
    get() {
        return this.defaultConfig;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set(config) {
        if (config.position) {
            this.defaultConfig.position = config.position;
        }
        // set colors
        if (config.colors) {
            Object.keys(config.colors).forEach((key) => {
                this.defaultConfig.colors[key] = config.colors[key];
            });
        }
        // set msg
        if (!config.msg) {
            return;
        }
        Object.keys(config.msg).forEach((key) => {
            this.defaultConfig.msg[key] = config.msg[key];
        });
    }
}
InputMsgConfigService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This utility service stores input element params
 * for communication between ngxInput directive,
 * ngx-msg component and ngxLabel directive.
 */
class InputStorageService {
    constructor() {
        this.storageById = {};
        /**
         * Note, this storage is provided, because
         * user might set id or name attribute to
         * the input element or even both of them.
         */
        this.storageByName = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return this.storageById[key] || this.storageByName[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.removeFromSpecificStorage('storageById', key);
        this.removeFromSpecificStorage('storageByName', key);
    }
    /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    set(input, id, name) {
        if (id) {
            this.storageById[id] = input;
        }
        if (name) {
            this.storageByName[name] = input;
        }
    }
    /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    removeFromSpecificStorage(storage, key) {
        if (!this[storage][key]) {
            return;
        }
        delete this[storage][key];
    }
}
InputStorageService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
const /** @type {?} */ fromEventMock = (eventTarget, eventName, handler) => {
    eventTarget.addEventListener(eventName, handler);
    return {
        unsubscribe: () => {
            eventTarget.removeEventListener(eventName, handler);
        }
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * An abstract class to be derived by
 * a concrete input directive class.
 * Validates an input element and emits
 * the validation status to the listeners
 * (MsgComponent, LabelDirective)
 * through InputStorageService.
 * @abstract
 */
class AbstractInput {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class InputValidator {
    /**
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        let /** @type {?} */ result = null;
        for (const /** @type {?} */ validator of this.currentValidators) {
            result = validator.fn(control.value, validator.value);
            // break if the input is invalid
            if (result !== null) {
                break;
            }
        }
        return result;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    empty(value) {
        return typeof value === 'undefined' || value === '' || value === null;
    }
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    setCurrentValidators(validatorsToApply) {
        if (typeof this.availableValidators !== 'object') {
            throw new Error('InputValidator class: this.availableValidators have to be initialized in the derived class');
        }
        if (!Array.isArray(this.validatorSequence)) {
            throw new Error('InputValidator class: this.validatorSequence have to be initialized in the derived class');
        }
        this.availableValidators["required"] = this.required.bind(this);
        this.currentValidators = [];
        const /** @type {?} */ paramSequence = this.getValidatorParamSequence(validatorsToApply);
        paramSequence.forEach(param => {
            const /** @type {?} */ config = {
                name: param.name,
                value: param.value,
                set: param.set,
                fn: this.availableValidators[param.name]
            };
            this.currentValidators.push(config);
        });
    }
    /**
     * Returns the sequence of configs of validators
     * @template T
     * @param {?} validatorsToApply
     * @return {?}
     */
    getValidatorParamSequence(validatorsToApply) {
        const /** @type {?} */ config = [];
        this.validatorSequence.forEach(name => {
            if (validatorsToApply[name]) {
                config.push(validatorsToApply[name]);
            }
        });
        return config;
    }
    /**
     * Validation function to be used with an any type of an input element
     * @param {?} value
     * @return {?}
     */
    required(value) {
        return this.empty(value) ? { required: true } : null;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EmailValidator extends InputValidator {
    /**
     * @param {?} validatorsToApply
     */
    constructor(validatorsToApply) {
        super();
        this.validatorsToApply = validatorsToApply;
        this.availableValidators = {
            email: this.email
        };
        this.validatorSequence = ['required', 'email'];
        super.setCurrentValidators(validatorsToApply);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    email(value) {
        /**
             * We should skip the validation for empty values.
             * Consider the case when a client sets an optional
             * email input that should be validated
             * only if a user inputs some text.
             */
        if (super.empty(value)) {
            return { email: null };
        }
        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        // tslint:disable-next-line:max-line-length
        const /** @type {?} */ regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const /** @type {?} */ isValid = regExp.test(value);
        return isValid ? null : { email: value };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EmailValidatorFactory {
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    create(validatorsToApply) {
        return new EmailValidator(validatorsToApply);
    }
}
EmailValidatorFactory.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputEmailDirective extends AbstractInput {
    /**
     * @param {?} elemRef
     * @param {?} inputStorageService
     * @param {?} validatorFactory
     */
    constructor(elemRef, inputStorageService, validatorFactory) {
        super(elemRef, inputStorageService, validatorFactory);
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.validatorFactory = validatorFactory;
        this.validatorOptions = {
            email: () => {
                // The email validator is always set by default
                return {
                    name: 'email',
                    set: true
                };
            }
        };
    }
}
InputEmailDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngxInputEmail]',
                providers: [
                    {
                        provide: NG_VALIDATORS,
                        useExisting: InputEmailDirective,
                        multi: true
                    },
                    EmailValidatorFactory
                ]
            },] },
];
/** @nocollapse */
InputEmailDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: EmailValidatorFactory }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NumberValidator extends InputValidator {
    /**
     * @param {?} validatorsToApply
     */
    constructor(validatorsToApply) {
        super();
        this.validatorsToApply = validatorsToApply;
        this.availableValidators = {
            integer: this.integer.bind(this),
            max: this.max.bind(this),
            min: this.min.bind(this)
        };
        this.validatorSequence = ['required', 'integer', 'min', 'max'];
        super.setCurrentValidators(validatorsToApply);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    integer(value) {
        if (!this.number(value)) {
            return { integer: 'Not a number' };
        }
        const /** @type {?} */ integer = Math.floor(value) === value;
        return integer ? null : { integer: value };
    }
    /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    max(value, max) {
        if (!this.number(value)) {
            return { max: 'Not a number' };
        }
        if (value > max) {
            const /** @type {?} */ error = {
                max: value === 0 ? '0' : value
            };
            return error;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    min(value, min) {
        if (!this.number(value)) {
            return { min: 'Not a number' };
        }
        if (value < min) {
            const /** @type {?} */ error = {
                min: value === 0 ? '0' : value
            };
            return error;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} arg
     * @return {?}
     */
    number(arg) {
        return !isNaN(parseFloat(arg)) && isFinite(arg);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NumberValidatorFactory {
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    create(validatorsToApply) {
        return new NumberValidator(validatorsToApply);
    }
}
NumberValidatorFactory.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputNumberDirective extends AbstractInput {
    /**
     * @param {?} elemRef
     * @param {?} inputStorageService
     * @param {?} validatorFactory
     */
    constructor(elemRef, inputStorageService, validatorFactory) {
        super(elemRef, inputStorageService, validatorFactory);
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.validatorFactory = validatorFactory;
        this.validatorOptions = {
            integer: () => {
                return {
                    name: 'integer',
                    set: super.hasBoolaenParam('integer')
                };
            },
            max: () => {
                return {
                    name: 'max',
                    set: super.hasNumberParam('max'),
                    value: +this.max
                };
            },
            min: () => {
                return {
                    name: 'min',
                    set: super.hasNumberParam('min'),
                    value: +this.min
                };
            }
        };
    }
}
InputNumberDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngxInputNumber][type="number"]',
                providers: [
                    {
                        provide: NG_VALIDATORS,
                        useExisting: InputNumberDirective,
                        multi: true
                    },
                    NumberValidatorFactory
                ]
            },] },
];
/** @nocollapse */
InputNumberDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: NumberValidatorFactory }
];
InputNumberDirective.propDecorators = {
    integer: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Validates 'text' like input element.
 */
class TextValidator extends InputValidator {
    /**
     * @param {?} validatorsToApply
     */
    constructor(validatorsToApply) {
        super();
        this.validatorsToApply = validatorsToApply;
        /**
         * Note, 'minlength' and 'maxlength' validators
         * are already supported by Angular NgForm, but
         * we should emplement them to stop the validation
         * process when the first validator fails.
         * See: InputValidator.validate() implementation.
         */
        this.availableValidators = {
            maxlength: this.maxlength,
            minlength: this.minlength,
            pattern: this.pattern
        };
        this.validatorSequence = ['required', 'minlength', 'maxlength', 'pattern'];
        super.setCurrentValidators(validatorsToApply);
    }
    /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    maxlength(value, max) {
        if (super.empty(value)) {
            return null;
        }
        return value.length > max ? { maxlength: value } : null;
    }
    /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    minlength(value, min) {
        if (value === null || typeof value === 'undefined') {
            return null;
        }
        if (value === '') {
            return { minlength: 'empty' };
        }
        return value.length < min ? { minlength: value } : null;
    }
    /**
     * @param {?} value
     * @param {?} regExp
     * @return {?}
     */
    pattern(value, regExp) {
        if (super.empty(value)) {
            return { pattern: 'empty' };
        }
        return regExp.test(value) ? null : { pattern: value };
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TextValidatorFactory {
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    create(validatorsToApply) {
        return new TextValidator(validatorsToApply);
    }
}
TextValidatorFactory.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputTextDirective extends AbstractInput {
    /**
     * @param {?} elemRef
     * @param {?} inputStorageService
     * @param {?} validatorFactory
     */
    constructor(elemRef, inputStorageService, validatorFactory) {
        super(elemRef, inputStorageService, validatorFactory);
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.validatorFactory = validatorFactory;
        this.validatorOptions = {
            maxlength: () => {
                return {
                    name: 'maxlength',
                    set: super.hasNumberParam('maxlength'),
                    value: +this.maxlength
                };
            },
            minlength: () => {
                return {
                    name: 'minlength',
                    set: super.hasNumberParam('minlength'),
                    value: +this.minlength
                };
            },
            pattern: () => {
                return {
                    name: 'pattern',
                    set: this.pattern instanceof RegExp,
                    value: this.pattern
                };
            }
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        this.maxLengthOn();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.maxLengthOff();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.maxLengthOn();
    }
    /**
     * @return {?}
     */
    emitMaxLengthStatus() {
        if (this.model.value.length === +this.maxlength) {
            this.inputParams.status.next('maxlength');
        }
    }
    /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    maxLengthOff() {
        if (this.maxLengthSub) {
            this.maxLengthSub.unsubscribe();
        }
    }
    /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    maxLengthOn() {
        if (super.hasNumberParam('maxlength') && !this.maxLengthSub) {
            this.maxLengthSub = this.model.valueChanges
                .subscribe(this.emitMaxLengthStatus.bind(this));
        }
    }
}
InputTextDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngxInputText], textarea[ngxInputText]',
                providers: [
                    {
                        provide: NG_VALIDATORS,
                        useExisting: InputTextDirective,
                        multi: true
                    },
                    TextValidatorFactory
                ]
            },] },
];
/** @nocollapse */
InputTextDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: TextValidatorFactory }
];
InputTextDirective.propDecorators = {
    maxlength: [{ type: Input }],
    minlength: [{ type: Input }],
    pattern: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Adds/removes 'ngx-input_invalid' css class
 * when input status changes
 */
class LabelDirective {
    /**
     * @param {?} configService
     * @param {?} elemRef
     * @param {?} inputStorageService
     */
    constructor(configService, elemRef, inputStorageService) {
        this.configService = configService;
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.valid && this.valid.unsubscribe) {
            this.valid.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.elem = this.elemRef.nativeElement;
        this.highlightColor = this.configService.get().colors.error;
        if (!this.for) {
            throw new Error('ngxLabel directive: \'for\' attribute with input id or name is required.');
        }
        this.setAnimation();
        // Wait till the input element will be initialized.
        // We should wait in case the label element was
        // inserted before the input.
        setTimeout(() => {
            const /** @type {?} */ inputParams = this.inputStorageService.get(this.for);
            if (!inputParams) {
                throw new Error(`ngxLabel directive: can\'t find the input element with id or name: ${this.for}`);
            }
            this.valid = inputParams.valid;
            this.valid.subscribe((valid) => {
                this.toggleClassOnValidChange(valid);
                this.highlightOnValidChange(valid);
            });
        }, 0);
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    highlightOnValidChange(valid) {
        if (valid) {
            this.elem.style.color = '';
        }
        else {
            this.elem.style.color = this.highlightColor;
        }
    }
    /**
     * @return {?}
     */
    setAnimation() {
        this.elem.style.transition = 'color 250ms ease-in';
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    toggleClassOnValidChange(valid) {
        if (valid) {
            this.elem.classList.remove('ngx-input_invalid');
        }
        else {
            this.elem.classList.add('ngx-input_invalid');
        }
    }
}
LabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxLabel]'
            },] },
];
/** @nocollapse */
LabelDirective.ctorParameters = () => [
    { type: InputMsgConfigService },
    { type: ElementRef },
    { type: InputStorageService }
];
LabelDirective.propDecorators = {
    for: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Displays a message for an input element
 * depending on it`s validation status.
 */
class MsgComponent {
    /**
     * @param {?} configService
     * @param {?} storageService
     */
    constructor(configService, storageService) {
        this.configService = configService;
        this.storageService = storageService;
        /**
         * All available messages corresponded
         * to validation params of the input
         */
        this.messages = {};
        this.subscriptions = [];
    }
    /**
     * @return {?}
     */
    getClasses() {
        const /** @type {?} */ position = this.position || this.configService.get().position;
        return {
            'ngx-msg_pos_bottom-left': position === 'bottom-left',
            'ngx-msg_pos_bottom-right': position === 'bottom-right',
            'ngx-msg_color_tooltip': this.currentStatus === 'maxlength',
            'ngx-msg_material': this.inputParams.material
        };
    }
    /**
     * @return {?}
     */
    getStyles() {
        let /** @type {?} */ color;
        if (this.currentStatus === 'maxlength') {
            color = this.defaultConfig.colors.maxlength;
        }
        else {
            color = this.defaultConfig.colors.error;
        }
        return { color: color };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ changeableProps = {
            email: true,
            integer: true,
            max: true,
            maxlength: true,
            min: true,
            minlength: true,
            position: true,
            required: true
        };
        Object.keys(changes).forEach(name => {
            if (!changeableProps[name] || changes[name].isFirstChange()) {
                return;
            }
            this.setMessage(/** @type {?} */ (name));
            // update currentMsg if it has been changed
            // and the input is invalid
            if (this.currentStatus === name && name !== 'maxlength') {
                this.currentMsg = this.messages[name];
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.defaultConfig = this.configService.get();
        if (!this.for) {
            throw new Error('ngxMsg component: \'for\' parameter with the input id or name must be provided.');
        }
        this.inputParams = this.storageService.get(this.for);
        if (!this.inputParams) {
            throw new Error(`ngxMsg component: can\'t find the input element with id or name: ${this.for}`);
        }
        // Set default or custom messages for given validation params
        this.setAllMessages();
        // Listen to the input status
        const /** @type {?} */ statusSub = this.inputParams.status
            .subscribe(this.onStatusChange.bind(this));
        this.subscriptions.push(statusSub);
        // Listen to the input params change
        const /** @type {?} */ inputParamsChangeSub = this.inputParams.paramChange
            .subscribe(this.onInputParamsChange.bind(this));
        this.subscriptions.push(inputParamsChangeSub);
    }
    /**
     * @param {?} changedPropName
     * @return {?}
     */
    onInputParamsChange(changedPropName) {
        if (changedPropName === 'label') {
            this.setAllMessages();
        }
        else {
            this.setMessage(/** @type {?} */ (changedPropName));
        }
        // update current msg if the input is invalid
        if (this.currentStatus === 'pristine' ||
            this.currentStatus === 'valid' ||
            this.currentStatus === 'maxlength') {
            return;
        }
        this.currentMsg = this.messages[this.currentStatus];
    }
    /**
     * @param {?} status
     * @return {?}
     */
    onStatusChange(status) {
        this.currentStatus = status;
        switch (status) {
            case 'pristine':
                this.currentMsg = '';
                break;
            case 'valid':
                this.currentMsg = '';
                break;
            case 'maxlength':
                this.currentMsg = this.messages[status];
                setTimeout(() => { this.currentMsg = ''; }, 2000);
                break;
            default:
                this.currentMsg = this.messages[status];
        }
    }
    /**
     * @return {?}
     */
    setAllMessages() {
        Object.keys(this.inputParams.validationParams).forEach((name) => {
            this.setMessage(name);
        });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setMessage(name) {
        if (!this.inputParams.validationParams[name]) {
            return;
        }
        // helper type guard
        const /** @type {?} */ isFn = (arg) => {
            return typeof arg === 'function';
        };
        // get specific or default msgExpression
        let /** @type {?} */ msgExpression;
        if (typeof this[name] !== 'undefined') {
            msgExpression = /** @type {?} */ (this[name]);
        }
        else {
            msgExpression = /** @type {?} */ (this.defaultConfig.msg[name]);
        }
        // Set a message generated by MsgFn() or as a simle string
        if (isFn(msgExpression)) {
            this.messages[name] = msgExpression(this.inputParams.label, this.inputParams.validationParams[name].value);
        }
        else {
            this.messages[name] = msgExpression;
        }
    }
}
MsgComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-msg',
                template: `<div class="ngx-msg__container" 
  [ngClass]="getClasses()"
  [ngStyle]="getStyles()"
  >

  <span *ngIf="currentMsg" [@msgAnimation]>
    {{currentMsg}}
  </span>

</div>
`,
                styles: [`.ngx-msg__mat-form-field{margin-bottom:16px;width:100%}.ngx-msg__container{display:block;font-size:12px;min-height:20px;margin-top:3px}.ngx-msg_material{margin-top:-33px}.ngx-msg_pos_bottom-left{text-align:left}.ngx-msg_pos_bottom-right{text-align:right}`],
                encapsulation: ViewEncapsulation.None,
                animations: [
                    trigger('msgAnimation', [
                        state('active', style({ opacity: 1 })),
                        transition('void => *', [
                            style({ opacity: 0 }),
                            animate('250ms ease-in', style({ opacity: 1 }))
                        ]),
                        transition('* => void', [
                            style({ opacity: 1 }),
                            animate('250ms ease-in', style({ opacity: 0 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
MsgComponent.ctorParameters = () => [
    { type: InputMsgConfigService },
    { type: InputStorageService }
];
MsgComponent.propDecorators = {
    for: [{ type: Input }],
    email: [{ type: Input }],
    integer: [{ type: Input }],
    max: [{ type: Input }],
    maxlength: [{ type: Input }],
    min: [{ type: Input }],
    minlength: [{ type: Input }],
    pattern: [{ type: Input }],
    position: [{ type: Input }],
    required: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InputMsgModule {
}
InputMsgModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserAnimationsModule,
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    InputEmailDirective,
                    InputNumberDirective,
                    InputTextDirective,
                    LabelDirective,
                    MsgComponent
                ],
                providers: [
                    InputMsgConfigService,
                    InputStorageService
                ],
                exports: [
                    InputEmailDirective,
                    InputNumberDirective,
                    InputTextDirective,
                    LabelDirective,
                    MsgComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { InputMsgConfigService, InputStorageService, InputEmailDirective, InputNumberDirective, InputTextDirective, LabelDirective, MsgComponent, InputMsgModule, EmailValidatorFactory as ɵc, NumberValidatorFactory as ɵd, TextValidatorFactory as ɵe, AbstractInput as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWlucHV0LW1zZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9mcm9tLWV2ZW50LW1vY2sudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9hYnN0cmFjdC1pbnB1dC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbW9kZWxzL2lucHV0LXZhbGlkYXRvci50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtZW1haWwvZW1haWwtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9lbWFpbC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9udW1iZXItdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1udW1iZXIvbnVtYmVyLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbGFiZWwvbGFiZWwuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9tc2cvbXNnLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtbXNnLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGNvbmZpZ3VyYXRpb24gZm9yIGRpc3BsYXlpbmcgbWVzc2FnZXMuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZyA9IHtcclxuICAgIGNvbG9yczoge1xyXG4gICAgICBlcnJvcjogJyNmNDQzMzYnLFxyXG4gICAgICBtYXhsZW5ndGg6ICdncmV5J1xyXG4gICAgfSxcclxuICAgIHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnLFxyXG4gICAgbXNnOiB7XHJcbiAgICAgIGVtYWlsOiAobGFiZWw6IHN0cmluZykgPT4gYFdyb25nICR7bGFiZWx9YCxcclxuICAgICAgaW50ZWdlcjogJ0ZyYWN0aW9uYWwgZGlnaXRzIGFyZSBmb3JiaWRkZW4nLFxyXG4gICAgICBtYXg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBNYXhpbXVtIGFsbG93ZWQgJHtsYWJlbH0gaXMgJHthbGxvd2VkfWAsXHJcbiAgICAgIG1pbjogKGxhYmVsOiBzdHJpbmcsIGFsbG93ZWQ6IG51bWJlcikgPT4gYE1pbmltdW0gYWxsb3dlZCAke2xhYmVsfSBpcyAke2FsbG93ZWR9YCxcclxuICAgICAgbWF4bGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgTWF4aW11bSAke2FsbG93ZWR9IGNoYXJzIGxpbWl0IHdhcyByZWFjaGVkYCxcclxuICAgICAgbWlubGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgQXQgbGVhc3QgJHthbGxvd2VkfSBjaGFycyBsZW5ndGggYXJlIHJlcXVpcmVkYCxcclxuICAgICAgcGF0dGVybjogKGxhYmVsOiBzdHJpbmcpID0+IGBJbnZhbGlkICR7bGFiZWx9YCxcclxuICAgICAgcmVxdWlyZWQ6IChsYWJlbDogc3RyaW5nKSA9PiBgJHtsYWJlbH0gaXMgcmVxdWlyZWRgXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldCgpOiBpbnB1dE1zZy5Db25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdENvbmZpZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoY29uZmlnOiBpbnB1dE1zZy5Db25maWcpIHtcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5wb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgY29sb3JzXHJcbiAgICBpZiAoY29uZmlnLmNvbG9ycykge1xyXG4gICAgICBPYmplY3Qua2V5cyhjb25maWcuY29sb3JzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnNba2V5XSA9IGNvbmZpZy5jb2xvcnNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IG1zZ1xyXG4gICAgaWYgKCFjb25maWcubXNnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNvbmZpZy5tc2cpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5tc2dba2V5XSA9IGNvbmZpZy5tc2dba2V5XTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHV0aWxpdHkgc2VydmljZSBzdG9yZXMgaW5wdXQgZWxlbWVudCBwYXJhbXNcclxuICogZm9yIGNvbW11bmljYXRpb24gYmV0d2VlbiBuZ3hJbnB1dCBkaXJlY3RpdmUsXHJcbiAqIG5neC1tc2cgY29tcG9uZW50IGFuZCBuZ3hMYWJlbCBkaXJlY3RpdmUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdG9yYWdlQnlJZDoge1xyXG4gICAgW2lkOiBzdHJpbmddOiBpbnB1dE1zZy5JbnB1dFBhcmFtc1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgdGhpcyBzdG9yYWdlIGlzIHByb3ZpZGVkLCBiZWNhdXNlXHJcbiAgICogdXNlciBtaWdodCBzZXQgaWQgb3IgbmFtZSBhdHRyaWJ1dGUgdG9cclxuICAgKiB0aGUgaW5wdXQgZWxlbWVudCBvciBldmVuIGJvdGggb2YgdGhlbS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JhZ2VCeU5hbWU6IHtcclxuICAgIFtpZDogc3RyaW5nXTogaW5wdXRNc2cuSW5wdXRQYXJhbXNcclxuICB9ID0ge307XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBpbnB1dE1zZy5JbnB1dFBhcmFtcyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQnlJZFtrZXldIHx8IHRoaXMuc3RvcmFnZUJ5TmFtZVtrZXldO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW1vdmVGcm9tU3BlY2lmaWNTdG9yYWdlKCdzdG9yYWdlQnlJZCcsIGtleSk7XHJcbiAgICB0aGlzLnJlbW92ZUZyb21TcGVjaWZpY1N0b3JhZ2UoJ3N0b3JhZ2VCeU5hbWUnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChpbnB1dDogaW5wdXRNc2cuSW5wdXRQYXJhbXMsIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlQnlJZFtpZF0gPSBpbnB1dDtcclxuICAgIH1cclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZUJ5TmFtZVtuYW1lXSA9IGlucHV0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRnJvbVNwZWNpZmljU3RvcmFnZShzdG9yYWdlOiAnc3RvcmFnZUJ5SWQnIHwgJ3N0b3JhZ2VCeU5hbWUnLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzW3N0b3JhZ2VdW2tleV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHRoaXNbc3RvcmFnZV1ba2V5XTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGlzIHRlbXBvcmFyeSBzdXJyb2dhdGUgcmVwbGFjZXNcclxuICogb3JpZ2luYWwgcnhqcyBmcm9tRXZlbnQgZnVuY3Rpb25cclxuICogdG8gaGFuZGxlIHJ4anMgdjUgdG8gdjYgbWlncmF0aW9uIHByb2JsZW0uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZnJvbUV2ZW50TW9jayA9IChldmVudFRhcmdldDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiAoKSA9PiB2b2lkKTogeyB1bnN1YnNjcmliZTogKCkgPT4gdm9pZDsgfSA9PiB7XHJcblxyXG4gIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICByZXR1cm4ge1xyXG4gICAgdW5zdWJzY3JpYmU6ICgpID0+IHtcclxuICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTmdNb2RlbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuLy8gcnhqcyB2NS92NiBjb21wYXRpYmxlXHJcbmltcG9ydCB7IGZyb21FdmVudE1vY2sgfSBmcm9tICcuL2Zyb20tZXZlbnQtbW9jayc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbi8vIHR5cGVzXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IGNsYXNzIHRvIGJlIGRlcml2ZWQgYnlcclxuICogYSBjb25jcmV0ZSBpbnB1dCBkaXJlY3RpdmUgY2xhc3MuXHJcbiAqIFZhbGlkYXRlcyBhbiBpbnB1dCBlbGVtZW50IGFuZCBlbWl0c1xyXG4gKiB0aGUgdmFsaWRhdGlvbiBzdGF0dXMgdG8gdGhlIGxpc3RlbmVyc1xyXG4gKiAoTXNnQ29tcG9uZW50LCBMYWJlbERpcmVjdGl2ZSlcclxuICogdGhyb3VnaCBJbnB1dFN0b3JhZ2VTZXJ2aWNlLlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIG1hdElucHV0OiAnJztcclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWw6IE5nTW9kZWw7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQ6ICcnIHwgYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGlucHV0UGFyYW1zOiBpbnB1dE1zZy5JbnB1dFBhcmFtcztcclxuICAvKipcclxuICAgKiBBIGRpY3Rpb25hcnkgd2l0aCBjYWxsYmFja3MgdG8gZ2V0IGN1cnJlbnQgdmFsaWRhdGlvbiBwYXJhbXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvck9wdGlvbnM6IHsgW25hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtRm4gfTtcclxuXHJcbiAgcHJpdmF0ZSBlbGVtOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgZm9ybTogTmdGb3JtO1xyXG4gIHByaXZhdGUgaW5wdXRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIGlzTWF0ZXJpYWw6IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQ29udGFpbnMgdHJ1ZSBpZiB0aGUgcHJldm9pdXMgaW5wdXQgc3RhdGUgd2FzIHZhbGlkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJldlZhbGlkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgc3RhdHVzU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvZiB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRvclBhcmFtczogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXTtcclxuICBwcml2YXRlIHZhbGlkYXRvcjogaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCBpbnB1dFZhbGlkYXRvckZhY3Rvcnk6IGlucHV0TXNnLklucHV0VmFsaWRhdG9yRmFjdG9yeVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWFibGVQcm9wcyA9IHtcclxuICAgICAgcGxhY2Vob2xkZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgIGlmICghY2hhbmdlYWJsZVByb3BzW25hbWVdIHx8XHJcbiAgICAgICAgIXRoaXMudmFsaWRhdG9yT3B0aW9uc1tuYW1lXSB8fFxyXG4gICAgICAgIGNoYW5nZXNbbmFtZV0uaXNGaXJzdENoYW5nZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5hbWUgPT09ICdwbGFjZWhvbGRlcicgfHwgbmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMubGFiZWwgPSBjaGFuZ2VzW25hbWVdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnBhcmFtQ2hhbmdlLm5leHQoJ2xhYmVsJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgICAgdGhpcy5pbnB1dFBhcmFtcy5wYXJhbUNoYW5nZS5uZXh0KG5hbWUgYXMgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICAgIHRoaXMubW9kZWwuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhdHVzT2ZmKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UucmVtb3ZlKHRoaXMuaW5wdXRLZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZWxlbSA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5pc01hdGVyaWFsID0gdGhpcy5tYXRJbnB1dCA9PT0gJyc7XHJcbiAgICB0aGlzLmlucHV0S2V5ID0gdGhpcy5pZCB8fCB0aGlzLm5hbWU7XHJcblxyXG4gICAgdGhpcy5jaGVja1JlcXVpcmVkUGFyYW1zKCk7XHJcblxyXG4gICAgdGhpcy5zZXRNYXRGb3JtRmllbGRDbGFzcygpO1xyXG5cclxuICAgIHRoaXMuaW5pdElucHV0UGFyYW1zKCk7XHJcbiAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2Uuc2V0KHRoaXMuaW5wdXRQYXJhbXMsIHRoaXMuaWQsIHRoaXMubmFtZSk7XHJcblxyXG4gICAgLy8gV2FpdCB0aWxsIE5nRm9ybSB3aWxsIGJlIGluaXRpYWxpemVkXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5tb2RlbC5mb3JtRGlyZWN0aXZlIGFzIE5nRm9ybTtcclxuICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neElucHV0IGRpcmVjdGl2ZTogdGhlIGVsZW1lbnQgd2l0aCBuYW1lPVwiJHt0aGlzLm5hbWV9XCIgaGF2ZSB0byBiZSBpbnNpZGUgYSA8Zm9ybT4gZWxlbWVudGApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdHVzT24oKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzQm9vbGFlblBhcmFtKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXNbbmFtZV0gPT09ICcnIHx8IHRoaXNbbmFtZV0gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzTnVtYmVyUGFyYW0obmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHRoaXNbbmFtZV0pICYmIGlzRmluaXRlKHRoaXNbbmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja1JlcXVpcmVkUGFyYW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hJbnB1dCBkaXJlY3RpdmU6IGNhblxcJ3QgZmluZCBuYW1lIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gICAgaWYgKCEodGhpcy5tb2RlbCBpbnN0YW5jZW9mIE5nTW9kZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4SW5wdXQgZGlyZWN0aXZlOiBOZ01vZGVsIGluc3RhbmNlIGhhdmUgdG8gYmUgcHJvdmlkZWQgdG8gW21vZGVsXSBwYXJhbSBvZiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdG9yczogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSA9IHt9O1xyXG4gICAgdGhpcy52YWxpZGF0b3JQYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgIHZhbGlkYXRvcnNbcGFyYW0ubmFtZV0gPSBwYXJhbTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdG9yID0gdGhpcy5pbnB1dFZhbGlkYXRvckZhY3RvcnkuY3JlYXRlKHZhbGlkYXRvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SW5wdXRQYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcyA9IHtcclxuICAgICAgbGFiZWw6IHRoaXMucGxhY2Vob2xkZXIgfHwgdGhpcy5sYWJlbCxcclxuICAgICAgbWF0ZXJpYWw6IHRoaXMuaXNNYXRlcmlhbCxcclxuICAgICAgcGFyYW1DaGFuZ2U6IG5ldyBTdWJqZWN0KCksXHJcbiAgICAgIHN0YXR1czogbmV3IEJlaGF2aW9yU3ViamVjdCgncHJpc3RpbmUnIGFzIGlucHV0TXNnLklucHV0U3RhdHVzKSxcclxuICAgICAgdmFsaWQ6IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSksXHJcbiAgICAgIHZhbGlkYXRpb25QYXJhbXM6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgJ25neC1tc2dfX21hdC1mb3JtLWZpZWxkJ1xyXG4gICAqIGlmIG1hdElucHV0IGRpcmVjdGl2ZSB3YXMgc2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRNYXRGb3JtRmllbGRDbGFzcygpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNNYXRlcmlhbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBsZXQgcGFyZW50OiBIVE1MRWxlbWVudCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ01BVC1GT1JNLUZJRUxEJykge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBpZiAoaSA9PT0gOSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbmd4SW5wdXQgZGlyZWN0aXZlOiBDYW5cXCd0IGZpbmQgcGFyZW50IDxtYXQtZm9ybS1maWVsZD4gZWxlbScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnbmd4LW1zZ19fbWF0LWZvcm0tZmllbGQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvbiBpbml0IG9yIG9uIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNldFZhbGlkYXRpb25QYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zID0ge307XHJcbiAgICB0aGlzLnZhbGlkYXRvclBhcmFtcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLmhhc0Jvb2xhZW5QYXJhbSgncmVxdWlyZWQnKSkge1xyXG4gICAgICBjb25zdCByZXF1aXJlZFBhcmFtOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSA9IHtcclxuICAgICAgICBuYW1lOiAncmVxdWlyZWQnLFxyXG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgc2V0OiB0cnVlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcy5yZXF1aXJlZCA9IHJlcXVpcmVkUGFyYW07XHJcbiAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocmVxdWlyZWRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy52YWxpZGF0b3JPcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwYXJhbTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gPSB0aGlzLnZhbGlkYXRvck9wdGlvbnNbbmFtZV0oKTtcclxuICAgICAgaWYgKHBhcmFtLnNldCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXSA9IHBhcmFtO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT2ZmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YikgPT4ge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT24oKTogdm9pZCB7XHJcblxyXG4gICAgLy8gRW1pdHMgYW4gZXJyb3Igc3RhdHVzIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkLlxyXG4gICAgY29uc3QgZW1pdEVycm9yU3RhdHVzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHRoaXMudmFsaWRhdG9yUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaGFzRXJyb3IocGFyYW0ubmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KHBhcmFtLm5hbWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlbWl0RXJyb3JTdGF0dXNPblRvdWNoZWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm1vZGVsLnRvdWNoZWQgfHwgdGhpcy5mb3JtLnN1Ym1pdHRlZCkge1xyXG4gICAgICAgIGVtaXRFcnJvclN0YXR1cygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzID0gKHN0YXR1czogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgY2FzZSAnSU5WQUxJRCc6XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnVkFMSUQnOlxyXG4gICAgICAgICAgaWYgKCF0aGlzLnByZXZWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQUklTVElORSc6XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCdwcmlzdGluZScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBibHVyU3ViID0gZnJvbUV2ZW50TW9jayh0aGlzLmVsZW0sICdibHVyJywgZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGJsdXJTdWIgYXMgU3Vic2NyaXB0aW9uKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sVmFsdWVTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xWYWx1ZVN1Yik7XHJcblxyXG4gICAgY29uc3QgZm9ybVN1Ym1pdFN1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLm5nU3VibWl0XHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGZvcm1TdWJtaXRTdWIpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xTdGF0dXNTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwuc3RhdHVzQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xTdGF0dXNTdWIpO1xyXG5cclxuICAgIC8vIEFkZHMvcmVtb3ZlcyAnbmd4LWlucHV0X2ludmFsaWQnIGNsYXNzIHRvIHRoZSBpbnB1dFxyXG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlID0gKHZhbGlkOiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgdmFsaWRTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMudmFsaWRcclxuICAgICAgLnN1YnNjcmliZSh0b2dnbGVDbGFzc09uVmFsaWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLnB1c2godmFsaWRTdWIpO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElucHV0VmFsaWRhdG9yIGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3Ige1xyXG5cclxuICAvKipcclxuICAgKiBBbGwgYXZhaWxhYmxlIHZhbGlkYXRvcnMgZm9yIHNwZWNpZmljIGlucHV0IHR5cGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXZhaWxhYmxlVmFsaWRhdG9yczogeyBbbmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yRm48YW55PiB9O1xyXG4gIC8qKlxyXG4gICAqIFRoZSBzZXF1ZW5jZSBvZiB2YWxpZGF0b3IgbmFtZXMgdG8gdmFsaWRhdGUgYW4gaW5wdXQgZWxlbWVudCB3aXRoLlxyXG4gICAqIFZhbGlkYXRvcnMgYXJlIGFwcGxpZWQgb25lIGJ5IG9uZS5cclxuICAgKiBAZXhhbXBsZSBbJ3JlcXVpcmVkJywgJ21pbmxlbmdodCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvclNlcXVlbmNlOiBzdHJpbmdbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0b3JzIGFwcGxpZWQgdG8gdGhlIHNwZWNpZmljIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGN1cnJlbnRWYWxpZGF0b3JzOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PltdO1xyXG5cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogYW55IH0gfCBudWxsID0gbnVsbDtcclxuICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHRoaXMuY3VycmVudFZhbGlkYXRvcnMpIHtcclxuICAgICAgcmVzdWx0ID0gdmFsaWRhdG9yLmZuKGNvbnRyb2wudmFsdWUsIHZhbGlkYXRvci52YWx1ZSk7XHJcbiAgICAgIC8vIGJyZWFrIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG5cclxuICBwcm90ZWN0ZWQgZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmF2YWlsYWJsZVZhbGlkYXRvcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRWYWxpZGF0b3IgY2xhc3M6IHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9ycyBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWxpZGF0b3JTZXF1ZW5jZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dFZhbGlkYXRvciBjbGFzczogdGhpcy52YWxpZGF0b3JTZXF1ZW5jZSBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzLnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMgPSBbXTtcclxuICAgIGNvbnN0IHBhcmFtU2VxdWVuY2UgPSB0aGlzLmdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2UodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gICAgcGFyYW1TZXF1ZW5jZS5mb3JFYWNoKHBhcmFtID0+IHtcclxuICAgICAgY29uc3QgY29uZmlnOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PiA9IHtcclxuICAgICAgICBuYW1lOiBwYXJhbS5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiBwYXJhbS52YWx1ZSxcclxuICAgICAgICBzZXQ6IHBhcmFtLnNldCxcclxuICAgICAgICBmbjogdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzW3BhcmFtLm5hbWVdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMucHVzaChjb25maWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzZXF1ZW5jZSBvZiBjb25maWdzIG9mIHZhbGlkYXRvcnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2U8VD4odmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW10ge1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZzogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXSA9IFtdO1xyXG4gICAgdGhpcy52YWxpZGF0b3JTZXF1ZW5jZS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBpZiAodmFsaWRhdG9yc1RvQXBwbHlbbmFtZV0pIHtcclxuICAgICAgICBjb25maWcucHVzaCh2YWxpZGF0b3JzVG9BcHBseVtuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRpb24gZnVuY3Rpb24gdG8gYmUgdXNlZCB3aXRoIGFuIGFueSB0eXBlIG9mIGFuIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlcXVpcmVkKHZhbHVlOiBzdHJpbmcpOiB7IHJlcXVpcmVkOiB0cnVlIH0gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmVtcHR5KHZhbHVlKSA/IHsgcmVxdWlyZWQ6IHRydWUgfSA6IG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbnB1dFZhbGlkYXRvciB9IGZyb20gJy4uL21vZGVscy9pbnB1dC12YWxpZGF0b3InO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIHByb3RlY3RlZCBhdmFpbGFibGVWYWxpZGF0b3JzID0ge1xyXG4gICAgZW1haWw6IHRoaXMuZW1haWxcclxuICB9O1xyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JTZXF1ZW5jZSA9IFsncmVxdWlyZWQnLCAnZW1haWwnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtYWlsKHZhbHVlOiBzdHJpbmcpOiB7IGVtYWlsOiBzdHJpbmcgfSB8IG51bGwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2Ugc2hvdWxkIHNraXAgdGhlIHZhbGlkYXRpb24gZm9yIGVtcHR5IHZhbHVlcy5cclxuICAgICAqIENvbnNpZGVyIHRoZSBjYXNlIHdoZW4gYSBjbGllbnQgc2V0cyBhbiBvcHRpb25hbFxyXG4gICAgICogZW1haWwgaW5wdXQgdGhhdCBzaG91bGQgYmUgdmFsaWRhdGVkXHJcbiAgICAgKiBvbmx5IGlmIGEgdXNlciBpbnB1dHMgc29tZSB0ZXh0LlxyXG4gICAgICovXHJcbiAgICBpZiAoc3VwZXIuZW1wdHkodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB7IGVtYWlsOiBudWxsIH07XHJcbiAgICB9XHJcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ2MTU1L3ZhbGlkYXRlLWVtYWlsLWFkZHJlc3MtaW4tamF2YXNjcmlwdFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgcmVnRXhwID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICBjb25zdCBpc1ZhbGlkOiBib29sZWFuID0gcmVnRXhwLnRlc3QodmFsdWUpO1xyXG5cclxuICAgIHJldHVybiBpc1ZhbGlkID8gbnVsbCA6IHsgZW1haWw6IHZhbHVlIH07XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbWFpbFZhbGlkYXRvciB9IGZyb20gJy4vZW1haWwtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0b3JGYWN0b3J5IGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3JGYWN0b3J5IHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZSh2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogRW1haWxWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBFbWFpbFZhbGlkYXRvcih2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEFic3RyYWN0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvYWJzdHJhY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBFbWFpbFZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL2VtYWlsLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXRFbWFpbF0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICBFbWFpbFZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEVtYWlsRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCB7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgZW1haWw6ICgpID0+IHtcclxuICAgICAgLy8gVGhlIGVtYWlsIHZhbGlkYXRvciBpcyBhbHdheXMgc2V0IGJ5IGRlZmF1bHRcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnZW1haWwnLFxyXG4gICAgICAgIHNldDogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JGYWN0b3J5OiBFbWFpbFZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgcHJvdGVjdGVkIGF2YWlsYWJsZVZhbGlkYXRvcnMgPSB7XHJcbiAgICBpbnRlZ2VyOiB0aGlzLmludGVnZXIuYmluZCh0aGlzKSxcclxuICAgIG1heDogdGhpcy5tYXguYmluZCh0aGlzKSxcclxuICAgIG1pbjogdGhpcy5taW4uYmluZCh0aGlzKVxyXG4gIH07XHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvclNlcXVlbmNlID0gWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ21pbicsICdtYXgnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGludGVnZXIodmFsdWU6IG51bWJlcik6IHsgaW50ZWdlcjogYW55IH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAoIXRoaXMubnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBpbnRlZ2VyOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW50ZWdlcjogYm9vbGVhbiA9IE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxuICAgIHJldHVybiBpbnRlZ2VyID8gbnVsbCA6IHsgaW50ZWdlcjogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4KHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogeyBtYXg6IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWF4OiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1heDogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWluKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyKTogeyBtaW46IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWluOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1pbjogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbnVtYmVyKGFyZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoYXJnKSkgJiYgaXNGaW5pdGUoYXJnKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbnVtYmVyLXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvckZhY3RvcnkgaW1wbGVtZW50cyBpbnB1dE1zZy5JbnB1dFZhbGlkYXRvckZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgY3JlYXRlKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBOdW1iZXJWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBOdW1iZXJWYWxpZGF0b3IodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi9udW1iZXItdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0TnVtYmVyXVt0eXBlPVwibnVtYmVyXCJdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgdXNlRXhpc3Rpbmc6IElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIE51bWJlclZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE51bWJlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQge1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgaW50ZWdlcjogJycgfCBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IHN0cmluZyB8IG51bWJlcjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWluOiBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgaW50ZWdlcjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdpbnRlZ2VyJyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc0Jvb2xhZW5QYXJhbSgnaW50ZWdlcicpXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbWF4OiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21heCcsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4JyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1heFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1pbjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtaW4nLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21pbicpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5taW5cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogTnVtYmVyVmFsaWRhdG9yRmFjdG9yeVxyXG4gICkge1xyXG4gICAgc3VwZXIoZWxlbVJlZiwgaW5wdXRTdG9yYWdlU2VydmljZSwgdmFsaWRhdG9yRmFjdG9yeSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbnB1dFZhbGlkYXRvciB9IGZyb20gJy4uL21vZGVscy9pbnB1dC12YWxpZGF0b3InO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogVmFsaWRhdGVzICd0ZXh0JyBsaWtlIGlucHV0IGVsZW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgJ21pbmxlbmd0aCcgYW5kICdtYXhsZW5ndGgnIHZhbGlkYXRvcnNcclxuICAgKiBhcmUgYWxyZWFkeSBzdXBwb3J0ZWQgYnkgQW5ndWxhciBOZ0Zvcm0sIGJ1dFxyXG4gICAqIHdlIHNob3VsZCBlbXBsZW1lbnQgdGhlbSB0byBzdG9wIHRoZSB2YWxpZGF0aW9uXHJcbiAgICogcHJvY2VzcyB3aGVuIHRoZSBmaXJzdCB2YWxpZGF0b3IgZmFpbHMuXHJcbiAgICogU2VlOiBJbnB1dFZhbGlkYXRvci52YWxpZGF0ZSgpIGltcGxlbWVudGF0aW9uLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhdmFpbGFibGVWYWxpZGF0b3JzID0ge1xyXG4gICAgbWF4bGVuZ3RoOiB0aGlzLm1heGxlbmd0aCxcclxuICAgIG1pbmxlbmd0aDogdGhpcy5taW5sZW5ndGgsXHJcbiAgICBwYXR0ZXJuOiB0aGlzLnBhdHRlcm5cclxuICB9O1xyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JTZXF1ZW5jZSA9IFsncmVxdWlyZWQnLCAnbWlubGVuZ3RoJywgJ21heGxlbmd0aCcsICdwYXR0ZXJuJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0Q3VycmVudFZhbGlkYXRvcnModmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXhsZW5ndGgodmFsdWU6IHN0cmluZywgbWF4OiBudW1iZXIpOiB7IG1heGxlbmd0aDogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gbWF4ID8geyBtYXhsZW5ndGg6IHZhbHVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtaW5sZW5ndGgodmFsdWU6IHN0cmluZywgbWluOiBudW1iZXIpOiB7IG1pbmxlbmd0aDogc3RyaW5nIH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHsgbWlubGVuZ3RoOiAnZW1wdHknIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDwgbWluID8geyBtaW5sZW5ndGg6IHZhbHVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXR0ZXJuKHZhbHVlOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogeyBwYXR0ZXJuOiBzdHJpbmcgfSB8IG51bGwge1xyXG4gICAgaWYgKHN1cGVyLmVtcHR5KHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBwYXR0ZXJuOiAnZW1wdHknIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVnRXhwLnRlc3QodmFsdWUpID8gbnVsbCA6IHsgcGF0dGVybjogdmFsdWUgfTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRleHRWYWxpZGF0b3IgfSBmcm9tICcuL3RleHQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvckZhY3RvcnkgaW1wbGVtZW50cyBpbnB1dE1zZy5JbnB1dFZhbGlkYXRvckZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgY3JlYXRlKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBUZXh0VmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgVGV4dFZhbGlkYXRvcih2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZXh0VmFsaWRhdG9yRmFjdG9yeSB9IGZyb20gJy4vdGV4dC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXRUZXh0XSwgdGV4dGFyZWFbbmd4SW5wdXRUZXh0XScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBJbnB1dFRleHREaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbWF4bGVuZ3RoOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIG1pbmxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuOiBSZWdFeHA7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgbWF4bGVuZ3RoOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21heGxlbmd0aCcsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1heGxlbmd0aFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1pbmxlbmd0aDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21pbmxlbmd0aCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5taW5sZW5ndGhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBwYXR0ZXJuOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ3BhdHRlcm4nLFxyXG4gICAgICAgIHNldDogdGhpcy5wYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnBhdHRlcm5cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIG1heExlbmd0aFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3A6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9mZigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkluaXQoKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdE1heExlbmd0aFN0YXR1cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1vZGVsLnZhbHVlLmxlbmd0aCA9PT0gK3RoaXMubWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ21heGxlbmd0aCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgZ2VuZXJhdGluZyAnbWF4bGVuZ3RoJyBzdGF0dXNcclxuICAgKi9cclxuICBwcml2YXRlIG1heExlbmd0aE9mZigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1heExlbmd0aFN1Yikge1xyXG4gICAgICB0aGlzLm1heExlbmd0aFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgJ21heGxlbmd0aCcgc3RhdHVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhPbigpOiB2b2lkIHtcclxuICAgIGlmIChzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJykgJiYgIXRoaXMubWF4TGVuZ3RoU3ViKSB7XHJcbiAgICAgIHRoaXMubWF4TGVuZ3RoU3ViID0gdGhpcy5tb2RlbC52YWx1ZUNoYW5nZXNcclxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZW1pdE1heExlbmd0aFN0YXR1cy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL2lucHV0LW1zZy1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQWRkcy9yZW1vdmVzICduZ3gtaW5wdXRfaW52YWxpZCcgY3NzIGNsYXNzXHJcbiAqIHdoZW4gaW5wdXQgc3RhdHVzIGNoYW5nZXNcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25neExhYmVsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExhYmVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBpbnB1dCBlbGVtZW50IGlkIG9yIG5hbWVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9yOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgZWxlbTogSFRNTExhYmVsRWxlbWVudDtcclxuICBwcml2YXRlIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB2YWxpZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudmFsaWQgJiYgdGhpcy52YWxpZC51bnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLnZhbGlkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5lbGVtID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmhpZ2hsaWdodENvbG9yID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpLmNvbG9ycy5lcnJvcjtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmd4TGFiZWwgZGlyZWN0aXZlOiBcXCdmb3JcXCcgYXR0cmlidXRlIHdpdGggaW5wdXQgaWQgb3IgbmFtZSBpcyByZXF1aXJlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xyXG5cclxuICAgIC8vIFdhaXQgdGlsbCB0aGUgaW5wdXQgZWxlbWVudCB3aWxsIGJlIGluaXRpYWxpemVkLlxyXG4gICAgLy8gV2Ugc2hvdWxkIHdhaXQgaW4gY2FzZSB0aGUgbGFiZWwgZWxlbWVudCB3YXNcclxuICAgIC8vIGluc2VydGVkIGJlZm9yZSB0aGUgaW5wdXQuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXRQYXJhbXMgPSB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UuZ2V0KHRoaXMuZm9yKTtcclxuICAgICAgaWYgKCFpbnB1dFBhcmFtcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4TGFiZWwgZGlyZWN0aXZlOiBjYW5cXCd0IGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgd2l0aCBpZCBvciBuYW1lOiAke3RoaXMuZm9yfWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnZhbGlkID0gaW5wdXRQYXJhbXMudmFsaWQ7XHJcbiAgICAgIHRoaXMudmFsaWQuc3Vic2NyaWJlKCh2YWxpZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlKHZhbGlkKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodE9uVmFsaWRDaGFuZ2UodmFsaWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlnaGxpZ2h0T25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5zdHlsZS5jb2xvciA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLnN0eWxlLmNvbG9yID0gdGhpcy5oaWdobGlnaHRDb2xvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtLnN0eWxlLnRyYW5zaXRpb24gPSAnY29sb3IgMjUwbXMgZWFzZS1pbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUNsYXNzT25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ25neC1pbnB1dF9pbnZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyBhIG1lc3NhZ2UgZm9yIGFuIGlucHV0IGVsZW1lbnRcclxuICogZGVwZW5kaW5nIG9uIGl0YHMgdmFsaWRhdGlvbiBzdGF0dXMuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1tc2cnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5neC1tc2dfX2NvbnRhaW5lclwiIFxyXG4gIFtuZ0NsYXNzXT1cImdldENsYXNzZXMoKVwiXHJcbiAgW25nU3R5bGVdPVwiZ2V0U3R5bGVzKClcIlxyXG4gID5cclxuXHJcbiAgPHNwYW4gKm5nSWY9XCJjdXJyZW50TXNnXCIgW0Btc2dBbmltYXRpb25dPlxyXG4gICAge3tjdXJyZW50TXNnfX1cclxuICA8L3NwYW4+XHJcblxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLm5neC1tc2dfX21hdC1mb3JtLWZpZWxke21hcmdpbi1ib3R0b206MTZweDt3aWR0aDoxMDAlfS5uZ3gtbXNnX19jb250YWluZXJ7ZGlzcGxheTpibG9jaztmb250LXNpemU6MTJweDttaW4taGVpZ2h0OjIwcHg7bWFyZ2luLXRvcDozcHh9Lm5neC1tc2dfbWF0ZXJpYWx7bWFyZ2luLXRvcDotMzNweH0ubmd4LW1zZ19wb3NfYm90dG9tLWxlZnR7dGV4dC1hbGlnbjpsZWZ0fS5uZ3gtbXNnX3Bvc19ib3R0b20tcmlnaHR7dGV4dC1hbGlnbjpyaWdodH1gXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ21zZ0FuaW1hdGlvbicsIFtcclxuICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcclxuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcclxuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXNnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGlucHV0IGlkIG9yIG5hbWUgYXR0cmlidXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGZvcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIE9wdGlvbmFsIHBhcmFtcyB3aXRoIGN1c3RvbSBtZXNzYWdlc1xyXG4gICAqIHRvIG92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBvbmVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGVtYWlsOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgaW50ZWdlcjogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1heDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1heGxlbmd0aDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1pbjogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1pbmxlbmd0aDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIHBhdHRlcm46IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwb3NpdGlvbjogaW5wdXRNc2cuUG9zaXRpb247XHJcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuXHJcbiAgLy8gQ3VycmVudGx5IHNob3duIG1lc3NhZ2VcclxuICBwdWJsaWMgY3VycmVudE1zZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGN1cnJlbnRTdGF0dXM6IGlucHV0TXNnLklucHV0U3RhdHVzO1xyXG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogaW5wdXRNc2cuQ29uZmlnO1xyXG4gIHByaXZhdGUgaW5wdXRQYXJhbXM6IGlucHV0TXNnLklucHV0UGFyYW1zO1xyXG4gIC8qKlxyXG4gICAqIEFsbCBhdmFpbGFibGUgbWVzc2FnZXMgY29ycmVzcG9uZGVkXHJcbiAgICogdG8gdmFsaWRhdGlvbiBwYXJhbXMgb2YgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtZXNzYWdlczogaW5wdXRNc2cuUmVzdWx0TXNnID0ge307XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXRDbGFzc2VzKCk6IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb246ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyA9IHRoaXMucG9zaXRpb24gfHwgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpLnBvc2l0aW9uO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ25neC1tc2dfcG9zX2JvdHRvbS1sZWZ0JzogcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcsXHJcbiAgICAgICduZ3gtbXNnX3Bvc19ib3R0b20tcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ2JvdHRvbS1yaWdodCcsXHJcbiAgICAgICduZ3gtbXNnX2NvbG9yX3Rvb2x0aXAnOiB0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdtYXhsZW5ndGgnLFxyXG4gICAgICAnbmd4LW1zZ19tYXRlcmlhbCc6IHRoaXMuaW5wdXRQYXJhbXMubWF0ZXJpYWxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3R5bGVzKCk6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9IHtcclxuXHJcbiAgICBsZXQgY29sb3I6IHN0cmluZztcclxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdtYXhsZW5ndGgnKSB7XHJcbiAgICAgIGNvbG9yID0gdGhpcy5kZWZhdWx0Q29uZmlnLmNvbG9ycy5tYXhsZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBjb2xvcjogY29sb3IgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWFibGVQcm9wcyA9IHtcclxuICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgIGludGVnZXI6IHRydWUsXHJcbiAgICAgIG1heDogdHJ1ZSxcclxuICAgICAgbWF4bGVuZ3RoOiB0cnVlLFxyXG4gICAgICBtaW46IHRydWUsXHJcbiAgICAgIG1pbmxlbmd0aDogdHJ1ZSxcclxuICAgICAgcG9zaXRpb246IHRydWUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIGlmICghY2hhbmdlYWJsZVByb3BzW25hbWVdIHx8IGNoYW5nZXNbbmFtZV0uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShuYW1lIGFzIGlucHV0TXNnLlZhbGlkYXRvck5hbWUpO1xyXG5cclxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRNc2cgaWYgaXQgaGFzIGJlZW4gY2hhbmdlZFxyXG4gICAgICAvLyBhbmQgdGhlIGlucHV0IGlzIGludmFsaWRcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXR1cyA9PT0gbmFtZSAmJiBuYW1lICE9PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9IHRoaXMubWVzc2FnZXNbbmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmZvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25neE1zZyBjb21wb25lbnQ6IFxcJ2ZvclxcJyBwYXJhbWV0ZXIgd2l0aCB0aGUgaW5wdXQgaWQgb3IgbmFtZSBtdXN0IGJlIHByb3ZpZGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5wdXRQYXJhbXMgPSB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldCh0aGlzLmZvcik7XHJcbiAgICBpZiAoIXRoaXMuaW5wdXRQYXJhbXMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hNc2cgY29tcG9uZW50OiBjYW5cXCd0IGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgd2l0aCBpZCBvciBuYW1lOiAke3RoaXMuZm9yfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IG9yIGN1c3RvbSBtZXNzYWdlcyBmb3IgZ2l2ZW4gdmFsaWRhdGlvbiBwYXJhbXNcclxuICAgIHRoaXMuc2V0QWxsTWVzc2FnZXMoKTtcclxuXHJcbiAgICAvLyBMaXN0ZW4gdG8gdGhlIGlucHV0IHN0YXR1c1xyXG4gICAgY29uc3Qgc3RhdHVzU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0UGFyYW1zLnN0YXR1c1xyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub25TdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdGF0dXNTdWIpO1xyXG5cclxuICAgIC8vIExpc3RlbiB0byB0aGUgaW5wdXQgcGFyYW1zIGNoYW5nZVxyXG4gICAgY29uc3QgaW5wdXRQYXJhbXNDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMucGFyYW1DaGFuZ2VcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9uSW5wdXRQYXJhbXNDaGFuZ2UuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChpbnB1dFBhcmFtc0NoYW5nZVN1Yik7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGVzIG1lc3NhZ2VzIHdoZW4gaW5wdXQgcGFyYW1zIGNoYW5nZVxyXG4gIHByaXZhdGUgb25JbnB1dFBhcmFtc0NoYW5nZShjaGFuZ2VkUHJvcE5hbWU6ICdsYWJlbCcgfCBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKGNoYW5nZWRQcm9wTmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICB0aGlzLnNldEFsbE1lc3NhZ2VzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoY2hhbmdlZFByb3BOYW1lIGFzIGlucHV0TXNnLlZhbGlkYXRvck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSBjdXJyZW50IG1zZyBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ3ByaXN0aW5lJyB8fFxyXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICd2YWxpZCcgfHxcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3RoaXMuY3VycmVudFN0YXR1c107XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGVzIGN1cnJlbnRTdGF0dXMgYW5kIHNob3dzL2hpZGVzIGN1cnJlbnRNc2dcclxuICBwcml2YXRlIG9uU3RhdHVzQ2hhbmdlKHN0YXR1czogaW5wdXRNc2cuSW5wdXRTdGF0dXMpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICBjYXNlICdwcmlzdGluZSc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gJyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZhbGlkJzpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSAnJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3N0YXR1c107XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY3VycmVudE1zZyA9ICcnOyB9LCAyMDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3N0YXR1c107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEFsbE1lc3NhZ2VzKCk6IHZvaWQge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zKS5mb3JFYWNoKChuYW1lOiBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShuYW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0cyBtZXNzYWdlIHRleHQgZm9yIGEgZ2l2ZW4gdmFsaWRhdGlvbiBwYXJhbWV0ZXIuXHJcbiAgLy8gSWYgYXBwcm9wcmlhdGUgbWVzc2FnZSBleHByZXNzaW9uIGlzIG5vdCBwcm92aWRlZFxyXG4gIC8vIHRocm9naCBASW5wdXQoKSBiaW5kaW5nIC0gdGhlIGRlZmF1bHQgb25lIGlzIHVzZWQgaW5zdGVhZC5cclxuICBwcml2YXRlIHNldE1lc3NhZ2UobmFtZTogaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk6IHZvaWQge1xyXG5cclxuICAgIGlmICghdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zW25hbWVdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoZWxwZXIgdHlwZSBndWFyZFxyXG4gICAgY29uc3QgaXNGbiA9IChhcmc6IHN0cmluZyB8IEZ1bmN0aW9uKTogYXJnIGlzIGlucHV0TXNnLk1zZ0ZuID0+IHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGdldCBzcGVjaWZpYyBvciBkZWZhdWx0IG1zZ0V4cHJlc3Npb25cclxuICAgIGxldCBtc2dFeHByZXNzaW9uOiBpbnB1dE1zZy5Nc2dGbiB8IHN0cmluZztcclxuICAgIGlmICh0eXBlb2YgdGhpc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgbXNnRXhwcmVzc2lvbiA9IHRoaXNbbmFtZV0gYXMgaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtc2dFeHByZXNzaW9uID0gdGhpcy5kZWZhdWx0Q29uZmlnLm1zZ1tuYW1lXSBhcyBpbnB1dE1zZy5Nc2dGbiB8IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgYSBtZXNzYWdlIGdlbmVyYXRlZCBieSBNc2dGbigpIG9yIGFzIGEgc2ltbGUgc3RyaW5nXHJcbiAgICBpZiAoaXNGbihtc2dFeHByZXNzaW9uKSkge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzW25hbWVdID0gbXNnRXhwcmVzc2lvbih0aGlzLmlucHV0UGFyYW1zLmxhYmVsLCB0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXNbbmFtZV0udmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tZXNzYWdlc1tuYW1lXSA9IG1zZ0V4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4vaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElucHV0RW1haWxEaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LWVtYWlsL2lucHV0LWVtYWlsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElucHV0VGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9sYWJlbC9sYWJlbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNc2dDb21wb25lbnQgfSBmcm9tICcuL21zZy9tc2cuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgIElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgTGFiZWxEaXJlY3RpdmUsXHJcbiAgICBNc2dDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgSW5wdXRTdG9yYWdlU2VydmljZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgIElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgTGFiZWxEaXJlY3RpdmUsXHJcbiAgICBNc2dDb21wb25lbnRcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRNc2dNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7QUFRQTs7NkJBRTJDO1lBQ3ZDLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLE1BQU07YUFDbEI7WUFDRCxRQUFRLEVBQUUsYUFBYTtZQUN2QixHQUFHLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLENBQUMsS0FBYSxLQUFLLFNBQVMsS0FBSyxFQUFFO2dCQUMxQyxPQUFPLEVBQUUsaUNBQWlDO2dCQUMxQyxHQUFHLEVBQUUsQ0FB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