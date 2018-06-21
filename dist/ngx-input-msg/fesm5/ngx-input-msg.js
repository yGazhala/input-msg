import { Injectable, Input, Directive, ElementRef, Component, ViewEncapsulation, NgModule } from '@angular/core';
import { __values, __extends } from 'tslib';
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
var InputMsgConfigService = /** @class */ (function () {
    function InputMsgConfigService() {
        this.defaultConfig = {
            colors: {
                error: '#f44336',
                maxlength: 'grey'
            },
            position: 'bottom-left',
            msg: {
                email: function (label) { return "Wrong " + label; },
                integer: 'Fractional digits are forbidden',
                max: function (label, allowed) { return "Maximum allowed " + label + " is " + allowed; },
                min: function (label, allowed) { return "Minimum allowed " + label + " is " + allowed; },
                maxlength: function (label, allowed) { return "Maximum " + allowed + " chars limit was reached"; },
                minlength: function (label, allowed) { return "At least " + allowed + " chars length are required"; },
                pattern: function (label) { return "Invalid " + label; },
                required: function (label) { return label + " is required"; }
            }
        };
    }
    /**
     * @return {?}
     */
    InputMsgConfigService.prototype.get = /**
     * @return {?}
     */
    function () {
        return this.defaultConfig;
    };
    /**
     * @param {?} config
     * @return {?}
     */
    InputMsgConfigService.prototype.set = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        if (config.position) {
            this.defaultConfig.position = config.position;
        }
        // set colors
        if (config.colors) {
            Object.keys(config.colors).forEach(function (key) {
                _this.defaultConfig.colors[key] = config.colors[key];
            });
        }
        // set msg
        if (!config.msg) {
            return;
        }
        Object.keys(config.msg).forEach(function (key) {
            _this.defaultConfig.msg[key] = config.msg[key];
        });
    };
    InputMsgConfigService.decorators = [
        { type: Injectable },
    ];
    return InputMsgConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This utility service stores input element params
 * for communication between ngxInput directive,
 * ngx-msg component and ngxLabel directive.
 */
var InputStorageService = /** @class */ (function () {
    function InputStorageService() {
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
    InputStorageService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.storageById[key] || this.storageByName[key];
    };
    /**
     * @param {?} key
     * @return {?}
     */
    InputStorageService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.removeFromSpecificStorage('storageById', key);
        this.removeFromSpecificStorage('storageByName', key);
    };
    /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    InputStorageService.prototype.set = /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    function (input, id, name) {
        if (id) {
            this.storageById[id] = input;
        }
        if (name) {
            this.storageByName[name] = input;
        }
    };
    /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    InputStorageService.prototype.removeFromSpecificStorage = /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    function (storage, key) {
        if (!this[storage][key]) {
            return;
        }
        delete this[storage][key];
    };
    InputStorageService.decorators = [
        { type: Injectable },
    ];
    return InputStorageService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
var /** @type {?} */ fromEventMock = function (eventTarget, eventName, handler) {
    eventTarget.addEventListener(eventName, handler);
    return {
        unsubscribe: function () {
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
var AbstractInput = /** @class */ (function () {
    function AbstractInput(elemRef, inputStorageService, inputValidatorFactory) {
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.inputValidatorFactory = inputValidatorFactory;
        this.statusSubscriptions = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    AbstractInput.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ changeableProps = {
            placeholder: true,
            label: true,
            required: true
        };
        Object.keys(changes).forEach(function (name) {
            if (!changeableProps[name] ||
                !_this.validatorOptions[name] ||
                changes[name].isFirstChange()) {
                return;
            }
            if (name === 'placeholder' || name === 'label') {
                _this.inputParams.label = changes[name].currentValue;
                _this.inputParams.paramChange.next('label');
                return;
            }
            _this.setValidationParams();
            _this.inputParams.paramChange.next(/** @type {?} */ (name));
            _this.createValidator();
            _this.model.control.updateValueAndValidity();
        });
    };
    /**
     * @return {?}
     */
    AbstractInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.statusOff();
        this.inputStorageService.remove(this.inputKey);
    };
    /**
     * @return {?}
     */
    AbstractInput.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        setTimeout(function () {
            _this.form = /** @type {?} */ (_this.model.formDirective);
            if (!_this.form) {
                throw new Error("ngxInput directive: the element with name=\"" + _this.name + "\" have to be inside a <form> element");
            }
            _this.statusOn();
        }, 0);
    };
    /**
     * @param {?} control
     * @return {?}
     */
    AbstractInput.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        return this.validator.validate(control);
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AbstractInput.prototype.hasBoolaenParam = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this[name] === '' || this[name] === true;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    AbstractInput.prototype.hasNumberParam = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return !isNaN(this[name]) && isFinite(this[name]);
    };
    /**
     * @return {?}
     */
    AbstractInput.prototype.checkRequiredParams = /**
     * @return {?}
     */
    function () {
        if (!this.name) {
            throw new Error("ngxInput directive: can't find name attribute on the element");
        }
        if (!(this.model instanceof NgModel)) {
            throw new Error("ngxInput directive: NgModel instance have to be provided to [model] param of the element");
        }
    };
    /**
     * @return {?}
     */
    AbstractInput.prototype.createValidator = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ validators = {};
        this.validatorParams.forEach(function (param) {
            validators[param.name] = param;
        });
        this.validator = this.inputValidatorFactory.create(validators);
    };
    /**
     * @return {?}
     */
    AbstractInput.prototype.initInputParams = /**
     * @return {?}
     */
    function () {
        this.inputParams = {
            label: this.placeholder || this.label,
            material: this.isMaterial,
            paramChange: new Subject(),
            status: new BehaviorSubject(/** @type {?} */ ('pristine')),
            valid: new BehaviorSubject(true),
            validationParams: undefined
        };
    };
    /**
     * Sets 'ngx-msg__mat-form-field'
     * if matInput directive was set
     * @return {?}
     */
    AbstractInput.prototype.setMatFormFieldClass = /**
     * Sets 'ngx-msg__mat-form-field'
     * if matInput directive was set
     * @return {?}
     */
    function () {
        if (!this.isMaterial) {
            return;
        }
        var /** @type {?} */ input = /** @type {?} */ (this.elemRef.nativeElement);
        var /** @type {?} */ parent = input.parentElement;
        for (var /** @type {?} */ i = 0; i < 10; i++) {
            if (parent.tagName === 'MAT-FORM-FIELD') {
                break;
            }
            parent = parent.parentElement;
            if (i === 9) {
                throw new Error('ngxInput directive: Can\'t find parent <mat-form-field> elem');
            }
        }
        parent.classList.add('ngx-msg__mat-form-field');
    };
    /**
     * Sets current validation params on init or on changes
     * @return {?}
     */
    AbstractInput.prototype.setValidationParams = /**
     * Sets current validation params on init or on changes
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputParams.validationParams = {};
        this.validatorParams = [];
        if (this.hasBoolaenParam('required')) {
            var /** @type {?} */ requiredParam = {
                name: 'required',
                value: undefined,
                set: true
            };
            this.inputParams.validationParams["required"] = requiredParam;
            this.validatorParams.push(requiredParam);
        }
        Object.keys(this.validatorOptions).forEach(function (name) {
            var /** @type {?} */ param = _this.validatorOptions[name]();
            if (param.set) {
                _this.inputParams.validationParams[name] = param;
                _this.validatorParams.push(param);
            }
        });
    };
    /**
     * Stops generating the input status
     * @return {?}
     */
    AbstractInput.prototype.statusOff = /**
     * Stops generating the input status
     * @return {?}
     */
    function () {
        this.statusSubscriptions.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    /**
     * Starts generating the input status
     * @return {?}
     */
    AbstractInput.prototype.statusOn = /**
     * Starts generating the input status
     * @return {?}
     */
    function () {
        var _this = this;
        // Emits an error status if the input is invalid.
        var /** @type {?} */ emitErrorStatus = function () {
            try {
                for (var _a = __values(_this.validatorParams), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var param = _b.value;
                    if (_this.model.hasError(param.name)) {
                        _this.inputParams.valid.next(false);
                        _this.inputParams.status.next(param.name);
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _c;
        };
        var /** @type {?} */ emitErrorStatusOnTouched = function () {
            if (_this.model.touched || _this.form.submitted) {
                emitErrorStatus();
            }
        };
        var /** @type {?} */ emitValidAndPristineStatus = function (status) {
            switch (status) {
                case 'INVALID':
                    _this.prevValid = false;
                    break;
                case 'VALID':
                    if (!_this.prevValid) {
                        _this.inputParams.valid.next(true);
                        _this.inputParams.status.next('valid');
                    }
                    _this.prevValid = true;
                    break;
                case 'PRISTINE':
                    _this.inputParams.valid.next(true);
                    _this.inputParams.status.next('pristine');
                    break;
                default:
                    return;
            }
        };
        var /** @type {?} */ blurSub = fromEventMock(this.elem, 'blur', emitErrorStatusOnTouched);
        this.statusSubscriptions.push(/** @type {?} */ (blurSub));
        var /** @type {?} */ controlValueSub = this.model.valueChanges
            .subscribe(emitErrorStatusOnTouched);
        this.statusSubscriptions.push(controlValueSub);
        var /** @type {?} */ formSubmitSub = this.form.ngSubmit
            .subscribe(emitErrorStatus);
        this.statusSubscriptions.push(formSubmitSub);
        var /** @type {?} */ controlStatusSub = this.model.statusChanges
            .subscribe(emitValidAndPristineStatus);
        this.statusSubscriptions.push(controlStatusSub);
        // Adds/removes 'ngx-input_invalid' class to the input
        var /** @type {?} */ toggleClassOnValidChange = function (valid) {
            if (valid) {
                _this.elem.classList.remove('ngx-input_invalid');
            }
            else {
                _this.elem.classList.add('ngx-input_invalid');
            }
        };
        var /** @type {?} */ validSub = this.inputParams.valid
            .subscribe(toggleClassOnValidChange);
        this.statusSubscriptions.push(validSub);
    };
    AbstractInput.propDecorators = {
        id: [{ type: Input }],
        label: [{ type: Input }],
        matInput: [{ type: Input }],
        model: [{ type: Input }],
        name: [{ type: Input }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }]
    };
    return AbstractInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var /**
 * @abstract
 */
InputValidator = /** @class */ (function () {
    function InputValidator() {
    }
    /**
     * @param {?} control
     * @return {?}
     */
    InputValidator.prototype.validate = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ result = null;
        try {
            for (var _a = __values(this.currentValidators), _b = _a.next(); !_b.done; _b = _a.next()) {
                var validator = _b.value;
                result = validator.fn(control.value, validator.value);
                // break if the input is invalid
                if (result !== null) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
        var e_1, _c;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    InputValidator.prototype.empty = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'undefined' || value === '' || value === null;
    };
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    InputValidator.prototype.setCurrentValidators = /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    function (validatorsToApply) {
        var _this = this;
        if (typeof this.availableValidators !== 'object') {
            throw new Error('InputValidator class: this.availableValidators have to be initialized in the derived class');
        }
        if (!Array.isArray(this.validatorSequence)) {
            throw new Error('InputValidator class: this.validatorSequence have to be initialized in the derived class');
        }
        this.availableValidators["required"] = this.required.bind(this);
        this.currentValidators = [];
        var /** @type {?} */ paramSequence = this.getValidatorParamSequence(validatorsToApply);
        paramSequence.forEach(function (param) {
            var /** @type {?} */ config = {
                name: param.name,
                value: param.value,
                set: param.set,
                fn: _this.availableValidators[param.name]
            };
            _this.currentValidators.push(config);
        });
    };
    /**
     * Returns the sequence of configs of validators
     * @template T
     * @param {?} validatorsToApply
     * @return {?}
     */
    InputValidator.prototype.getValidatorParamSequence = /**
     * Returns the sequence of configs of validators
     * @template T
     * @param {?} validatorsToApply
     * @return {?}
     */
    function (validatorsToApply) {
        var /** @type {?} */ config = [];
        this.validatorSequence.forEach(function (name) {
            if (validatorsToApply[name]) {
                config.push(validatorsToApply[name]);
            }
        });
        return config;
    };
    /**
     * Validation function to be used with an any type of an input element
     * @param {?} value
     * @return {?}
     */
    InputValidator.prototype.required = /**
     * Validation function to be used with an any type of an input element
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.empty(value) ? { required: true } : null;
    };
    return InputValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EmailValidator = /** @class */ (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator(validatorsToApply) {
        var _this = _super.call(this) || this;
        _this.validatorsToApply = validatorsToApply;
        _this.availableValidators = {
            email: _this.email
        };
        _this.validatorSequence = ['required', 'email'];
        _super.prototype.setCurrentValidators.call(_this, validatorsToApply);
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    EmailValidator.prototype.email = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /**
             * We should skip the validation for empty values.
             * Consider the case when a client sets an optional
             * email input that should be validated
             * only if a user inputs some text.
             */
        if (_super.prototype.empty.call(this, value)) {
            return { email: null };
        }
        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        // tslint:disable-next-line:max-line-length
        var /** @type {?} */ regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var /** @type {?} */ isValid = regExp.test(value);
        return isValid ? null : { email: value };
    };
    return EmailValidator;
}(InputValidator));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EmailValidatorFactory = /** @class */ (function () {
    function EmailValidatorFactory() {
    }
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    EmailValidatorFactory.prototype.create = /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    function (validatorsToApply) {
        return new EmailValidator(validatorsToApply);
    };
    EmailValidatorFactory.decorators = [
        { type: Injectable },
    ];
    return EmailValidatorFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputEmailDirective = /** @class */ (function (_super) {
    __extends(InputEmailDirective, _super);
    function InputEmailDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            email: function () {
                // The email validator is always set by default
                return {
                    name: 'email',
                    set: true
                };
            }
        };
        return _this;
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
    InputEmailDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: EmailValidatorFactory }
    ]; };
    return InputEmailDirective;
}(AbstractInput));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NumberValidator = /** @class */ (function (_super) {
    __extends(NumberValidator, _super);
    function NumberValidator(validatorsToApply) {
        var _this = _super.call(this) || this;
        _this.validatorsToApply = validatorsToApply;
        _this.availableValidators = {
            integer: _this.integer.bind(_this),
            max: _this.max.bind(_this),
            min: _this.min.bind(_this)
        };
        _this.validatorSequence = ['required', 'integer', 'min', 'max'];
        _super.prototype.setCurrentValidators.call(_this, validatorsToApply);
        return _this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NumberValidator.prototype.integer = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.number(value)) {
            return { integer: 'Not a number' };
        }
        var /** @type {?} */ integer = Math.floor(value) === value;
        return integer ? null : { integer: value };
    };
    /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    NumberValidator.prototype.max = /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    function (value, max) {
        if (!this.number(value)) {
            return { max: 'Not a number' };
        }
        if (value > max) {
            var /** @type {?} */ error = {
                max: value === 0 ? '0' : value
            };
            return error;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    NumberValidator.prototype.min = /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    function (value, min) {
        if (!this.number(value)) {
            return { min: 'Not a number' };
        }
        if (value < min) {
            var /** @type {?} */ error = {
                min: value === 0 ? '0' : value
            };
            return error;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} arg
     * @return {?}
     */
    NumberValidator.prototype.number = /**
     * @param {?} arg
     * @return {?}
     */
    function (arg) {
        return !isNaN(parseFloat(arg)) && isFinite(arg);
    };
    return NumberValidator;
}(InputValidator));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NumberValidatorFactory = /** @class */ (function () {
    function NumberValidatorFactory() {
    }
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    NumberValidatorFactory.prototype.create = /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    function (validatorsToApply) {
        return new NumberValidator(validatorsToApply);
    };
    NumberValidatorFactory.decorators = [
        { type: Injectable },
    ];
    return NumberValidatorFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputNumberDirective = /** @class */ (function (_super) {
    __extends(InputNumberDirective, _super);
    function InputNumberDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            integer: function () {
                return {
                    name: 'integer',
                    set: _super.prototype.hasBoolaenParam.call(_this, 'integer')
                };
            },
            max: function () {
                return {
                    name: 'max',
                    set: _super.prototype.hasNumberParam.call(_this, 'max'),
                    value: +_this.max
                };
            },
            min: function () {
                return {
                    name: 'min',
                    set: _super.prototype.hasNumberParam.call(_this, 'min'),
                    value: +_this.min
                };
            }
        };
        return _this;
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
    InputNumberDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: NumberValidatorFactory }
    ]; };
    InputNumberDirective.propDecorators = {
        integer: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }]
    };
    return InputNumberDirective;
}(AbstractInput));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Validates 'text' like input element.
 */
var /**
 * Validates 'text' like input element.
 */
TextValidator = /** @class */ (function (_super) {
    __extends(TextValidator, _super);
    function TextValidator(validatorsToApply) {
        var _this = _super.call(this) || this;
        _this.validatorsToApply = validatorsToApply;
        /**
         * Note, 'minlength' and 'maxlength' validators
         * are already supported by Angular NgForm, but
         * we should emplement them to stop the validation
         * process when the first validator fails.
         * See: InputValidator.validate() implementation.
         */
        _this.availableValidators = {
            maxlength: _this.maxlength,
            minlength: _this.minlength,
            pattern: _this.pattern
        };
        _this.validatorSequence = ['required', 'minlength', 'maxlength', 'pattern'];
        _super.prototype.setCurrentValidators.call(_this, validatorsToApply);
        return _this;
    }
    /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    TextValidator.prototype.maxlength = /**
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    function (value, max) {
        if (_super.prototype.empty.call(this, value)) {
            return null;
        }
        return value.length > max ? { maxlength: value } : null;
    };
    /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    TextValidator.prototype.minlength = /**
     * @param {?} value
     * @param {?} min
     * @return {?}
     */
    function (value, min) {
        if (value === null || typeof value === 'undefined') {
            return null;
        }
        if (value === '') {
            return { minlength: 'empty' };
        }
        return value.length < min ? { minlength: value } : null;
    };
    /**
     * @param {?} value
     * @param {?} regExp
     * @return {?}
     */
    TextValidator.prototype.pattern = /**
     * @param {?} value
     * @param {?} regExp
     * @return {?}
     */
    function (value, regExp) {
        if (_super.prototype.empty.call(this, value)) {
            return { pattern: 'empty' };
        }
        return regExp.test(value) ? null : { pattern: value };
    };
    return TextValidator;
}(InputValidator));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextValidatorFactory = /** @class */ (function () {
    function TextValidatorFactory() {
    }
    /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    TextValidatorFactory.prototype.create = /**
     * @param {?} validatorsToApply
     * @return {?}
     */
    function (validatorsToApply) {
        return new TextValidator(validatorsToApply);
    };
    TextValidatorFactory.decorators = [
        { type: Injectable },
    ];
    return TextValidatorFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputTextDirective = /** @class */ (function (_super) {
    __extends(InputTextDirective, _super);
    function InputTextDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            maxlength: function () {
                return {
                    name: 'maxlength',
                    set: _super.prototype.hasNumberParam.call(_this, 'maxlength'),
                    value: +_this.maxlength
                };
            },
            minlength: function () {
                return {
                    name: 'minlength',
                    set: _super.prototype.hasNumberParam.call(_this, 'minlength'),
                    value: +_this.minlength
                };
            },
            pattern: function () {
                return {
                    name: 'pattern',
                    set: _this.pattern instanceof RegExp,
                    value: _this.pattern
                };
            }
        };
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    InputTextDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        this.maxLengthOn();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.maxLengthOff();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.maxLengthOn();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.emitMaxLengthStatus = /**
     * @return {?}
     */
    function () {
        if (this.model.value.length === +this.maxlength) {
            this.inputParams.status.next('maxlength');
        }
    };
    /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    InputTextDirective.prototype.maxLengthOff = /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    function () {
        if (this.maxLengthSub) {
            this.maxLengthSub.unsubscribe();
        }
    };
    /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    InputTextDirective.prototype.maxLengthOn = /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    function () {
        if (_super.prototype.hasNumberParam.call(this, 'maxlength') && !this.maxLengthSub) {
            this.maxLengthSub = this.model.valueChanges
                .subscribe(this.emitMaxLengthStatus.bind(this));
        }
    };
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
    InputTextDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: TextValidatorFactory }
    ]; };
    InputTextDirective.propDecorators = {
        maxlength: [{ type: Input }],
        minlength: [{ type: Input }],
        pattern: [{ type: Input }]
    };
    return InputTextDirective;
}(AbstractInput));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Adds/removes 'ngx-input_invalid' css class
 * when input status changes
 */
var LabelDirective = /** @class */ (function () {
    function LabelDirective(configService, elemRef, inputStorageService) {
        this.configService = configService;
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
    }
    /**
     * @return {?}
     */
    LabelDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.valid && this.valid.unsubscribe) {
            this.valid.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    LabelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.elem = this.elemRef.nativeElement;
        this.highlightColor = this.configService.get().colors.error;
        if (!this.for) {
            throw new Error('ngxLabel directive: \'for\' attribute with input id or name is required.');
        }
        this.setAnimation();
        // Wait till the input element will be initialized.
        // We should wait in case the label element was
        // inserted before the input.
        setTimeout(function () {
            var /** @type {?} */ inputParams = _this.inputStorageService.get(_this.for);
            if (!inputParams) {
                throw new Error("ngxLabel directive: can't find the input element with id or name: " + _this.for);
            }
            _this.valid = inputParams.valid;
            _this.valid.subscribe(function (valid) {
                _this.toggleClassOnValidChange(valid);
                _this.highlightOnValidChange(valid);
            });
        }, 0);
    };
    /**
     * @param {?} valid
     * @return {?}
     */
    LabelDirective.prototype.highlightOnValidChange = /**
     * @param {?} valid
     * @return {?}
     */
    function (valid) {
        if (valid) {
            this.elem.style.color = '';
        }
        else {
            this.elem.style.color = this.highlightColor;
        }
    };
    /**
     * @return {?}
     */
    LabelDirective.prototype.setAnimation = /**
     * @return {?}
     */
    function () {
        this.elem.style.transition = 'color 250ms ease-in';
    };
    /**
     * @param {?} valid
     * @return {?}
     */
    LabelDirective.prototype.toggleClassOnValidChange = /**
     * @param {?} valid
     * @return {?}
     */
    function (valid) {
        if (valid) {
            this.elem.classList.remove('ngx-input_invalid');
        }
        else {
            this.elem.classList.add('ngx-input_invalid');
        }
    };
    LabelDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxLabel]'
                },] },
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: InputMsgConfigService },
        { type: ElementRef },
        { type: InputStorageService }
    ]; };
    LabelDirective.propDecorators = {
        for: [{ type: Input }]
    };
    return LabelDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Displays a message for an input element
 * depending on it`s validation status.
 */
var MsgComponent = /** @class */ (function () {
    function MsgComponent(configService, storageService) {
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
    MsgComponent.prototype.getClasses = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ position = this.position || this.configService.get().position;
        return {
            'ngx-msg_pos_bottom-left': position === 'bottom-left',
            'ngx-msg_pos_bottom-right': position === 'bottom-right',
            'ngx-msg_color_tooltip': this.currentStatus === 'maxlength',
            'ngx-msg_material': this.inputParams.material
        };
    };
    /**
     * @return {?}
     */
    MsgComponent.prototype.getStyles = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ color;
        if (this.currentStatus === 'maxlength') {
            color = this.defaultConfig.colors.maxlength;
        }
        else {
            color = this.defaultConfig.colors.error;
        }
        return { color: color };
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MsgComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        var /** @type {?} */ changeableProps = {
            email: true,
            integer: true,
            max: true,
            maxlength: true,
            min: true,
            minlength: true,
            position: true,
            required: true
        };
        Object.keys(changes).forEach(function (name) {
            if (!changeableProps[name] || changes[name].isFirstChange()) {
                return;
            }
            _this.setMessage(/** @type {?} */ (name));
            // update currentMsg if it has been changed
            // and the input is invalid
            if (_this.currentStatus === name && name !== 'maxlength') {
                _this.currentMsg = _this.messages[name];
            }
        });
    };
    /**
     * @return {?}
     */
    MsgComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    MsgComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.defaultConfig = this.configService.get();
        if (!this.for) {
            throw new Error('ngxMsg component: \'for\' parameter with the input id or name must be provided.');
        }
        this.inputParams = this.storageService.get(this.for);
        if (!this.inputParams) {
            throw new Error("ngxMsg component: can't find the input element with id or name: " + this.for);
        }
        // Set default or custom messages for given validation params
        this.setAllMessages();
        // Listen to the input status
        var /** @type {?} */ statusSub = this.inputParams.status
            .subscribe(this.onStatusChange.bind(this));
        this.subscriptions.push(statusSub);
        // Listen to the input params change
        var /** @type {?} */ inputParamsChangeSub = this.inputParams.paramChange
            .subscribe(this.onInputParamsChange.bind(this));
        this.subscriptions.push(inputParamsChangeSub);
    };
    /**
     * @param {?} changedPropName
     * @return {?}
     */
    MsgComponent.prototype.onInputParamsChange = /**
     * @param {?} changedPropName
     * @return {?}
     */
    function (changedPropName) {
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
    };
    /**
     * @param {?} status
     * @return {?}
     */
    MsgComponent.prototype.onStatusChange = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        var _this = this;
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
                setTimeout(function () { _this.currentMsg = ''; }, 2000);
                break;
            default:
                this.currentMsg = this.messages[status];
        }
    };
    /**
     * @return {?}
     */
    MsgComponent.prototype.setAllMessages = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.inputParams.validationParams).forEach(function (name) {
            _this.setMessage(name);
        });
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MsgComponent.prototype.setMessage = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!this.inputParams.validationParams[name]) {
            return;
        }
        // helper type guard
        var /** @type {?} */ isFn = function (arg) {
            return typeof arg === 'function';
        };
        // get specific or default msgExpression
        var /** @type {?} */ msgExpression;
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
    };
    MsgComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-msg',
                    template: "<div class=\"ngx-msg__container\" \n  [ngClass]=\"getClasses()\"\n  [ngStyle]=\"getStyles()\"\n  >\n\n  <span *ngIf=\"currentMsg\" [@msgAnimation]>\n    {{currentMsg}}\n  </span>\n\n</div>\n",
                    styles: [".ngx-msg__mat-form-field{margin-bottom:16px;width:100%}.ngx-msg__container{display:block;font-size:12px;min-height:20px;margin-top:3px}.ngx-msg_material{margin-top:-33px}.ngx-msg_pos_bottom-left{text-align:left}.ngx-msg_pos_bottom-right{text-align:right}"],
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
    MsgComponent.ctorParameters = function () { return [
        { type: InputMsgConfigService },
        { type: InputStorageService }
    ]; };
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
    return MsgComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var InputMsgModule = /** @class */ (function () {
    function InputMsgModule() {
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
    return InputMsgModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { InputMsgConfigService, InputStorageService, InputEmailDirective, InputNumberDirective, InputTextDirective, LabelDirective, MsgComponent, InputMsgModule, EmailValidatorFactory as ɵc, NumberValidatorFactory as ɵd, TextValidatorFactory as ɵe, AbstractInput as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWlucHV0LW1zZy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9mcm9tLWV2ZW50LW1vY2sudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9hYnN0cmFjdC1pbnB1dC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbW9kZWxzL2lucHV0LXZhbGlkYXRvci50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtZW1haWwvZW1haWwtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9lbWFpbC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9udW1iZXItdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1udW1iZXIvbnVtYmVyLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbGFiZWwvbGFiZWwuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9tc2cvbXNnLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtbXNnLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGNvbmZpZ3VyYXRpb24gZm9yIGRpc3BsYXlpbmcgbWVzc2FnZXMuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZyA9IHtcclxuICAgIGNvbG9yczoge1xyXG4gICAgICBlcnJvcjogJyNmNDQzMzYnLFxyXG4gICAgICBtYXhsZW5ndGg6ICdncmV5J1xyXG4gICAgfSxcclxuICAgIHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnLFxyXG4gICAgbXNnOiB7XHJcbiAgICAgIGVtYWlsOiAobGFiZWw6IHN0cmluZykgPT4gYFdyb25nICR7bGFiZWx9YCxcclxuICAgICAgaW50ZWdlcjogJ0ZyYWN0aW9uYWwgZGlnaXRzIGFyZSBmb3JiaWRkZW4nLFxyXG4gICAgICBtYXg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBNYXhpbXVtIGFsbG93ZWQgJHtsYWJlbH0gaXMgJHthbGxvd2VkfWAsXHJcbiAgICAgIG1pbjogKGxhYmVsOiBzdHJpbmcsIGFsbG93ZWQ6IG51bWJlcikgPT4gYE1pbmltdW0gYWxsb3dlZCAke2xhYmVsfSBpcyAke2FsbG93ZWR9YCxcclxuICAgICAgbWF4bGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgTWF4aW11bSAke2FsbG93ZWR9IGNoYXJzIGxpbWl0IHdhcyByZWFjaGVkYCxcclxuICAgICAgbWlubGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgQXQgbGVhc3QgJHthbGxvd2VkfSBjaGFycyBsZW5ndGggYXJlIHJlcXVpcmVkYCxcclxuICAgICAgcGF0dGVybjogKGxhYmVsOiBzdHJpbmcpID0+IGBJbnZhbGlkICR7bGFiZWx9YCxcclxuICAgICAgcmVxdWlyZWQ6IChsYWJlbDogc3RyaW5nKSA9PiBgJHtsYWJlbH0gaXMgcmVxdWlyZWRgXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldCgpOiBpbnB1dE1zZy5Db25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdENvbmZpZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoY29uZmlnOiBpbnB1dE1zZy5Db25maWcpIHtcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5wb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgY29sb3JzXHJcbiAgICBpZiAoY29uZmlnLmNvbG9ycykge1xyXG4gICAgICBPYmplY3Qua2V5cyhjb25maWcuY29sb3JzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnNba2V5XSA9IGNvbmZpZy5jb2xvcnNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IG1zZ1xyXG4gICAgaWYgKCFjb25maWcubXNnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNvbmZpZy5tc2cpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5tc2dba2V5XSA9IGNvbmZpZy5tc2dba2V5XTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHV0aWxpdHkgc2VydmljZSBzdG9yZXMgaW5wdXQgZWxlbWVudCBwYXJhbXNcclxuICogZm9yIGNvbW11bmljYXRpb24gYmV0d2VlbiBuZ3hJbnB1dCBkaXJlY3RpdmUsXHJcbiAqIG5neC1tc2cgY29tcG9uZW50IGFuZCBuZ3hMYWJlbCBkaXJlY3RpdmUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdG9yYWdlQnlJZDoge1xyXG4gICAgW2lkOiBzdHJpbmddOiBpbnB1dE1zZy5JbnB1dFBhcmFtc1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgdGhpcyBzdG9yYWdlIGlzIHByb3ZpZGVkLCBiZWNhdXNlXHJcbiAgICogdXNlciBtaWdodCBzZXQgaWQgb3IgbmFtZSBhdHRyaWJ1dGUgdG9cclxuICAgKiB0aGUgaW5wdXQgZWxlbWVudCBvciBldmVuIGJvdGggb2YgdGhlbS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JhZ2VCeU5hbWU6IHtcclxuICAgIFtpZDogc3RyaW5nXTogaW5wdXRNc2cuSW5wdXRQYXJhbXNcclxuICB9ID0ge307XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBpbnB1dE1zZy5JbnB1dFBhcmFtcyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQnlJZFtrZXldIHx8IHRoaXMuc3RvcmFnZUJ5TmFtZVtrZXldO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW1vdmVGcm9tU3BlY2lmaWNTdG9yYWdlKCdzdG9yYWdlQnlJZCcsIGtleSk7XHJcbiAgICB0aGlzLnJlbW92ZUZyb21TcGVjaWZpY1N0b3JhZ2UoJ3N0b3JhZ2VCeU5hbWUnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChpbnB1dDogaW5wdXRNc2cuSW5wdXRQYXJhbXMsIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlQnlJZFtpZF0gPSBpbnB1dDtcclxuICAgIH1cclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZUJ5TmFtZVtuYW1lXSA9IGlucHV0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRnJvbVNwZWNpZmljU3RvcmFnZShzdG9yYWdlOiAnc3RvcmFnZUJ5SWQnIHwgJ3N0b3JhZ2VCeU5hbWUnLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzW3N0b3JhZ2VdW2tleV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHRoaXNbc3RvcmFnZV1ba2V5XTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGlzIHRlbXBvcmFyeSBzdXJyb2dhdGUgcmVwbGFjZXNcclxuICogb3JpZ2luYWwgcnhqcyBmcm9tRXZlbnQgZnVuY3Rpb25cclxuICogdG8gaGFuZGxlIHJ4anMgdjUgdG8gdjYgbWlncmF0aW9uIHByb2JsZW0uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZnJvbUV2ZW50TW9jayA9IChldmVudFRhcmdldDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiAoKSA9PiB2b2lkKTogeyB1bnN1YnNjcmliZTogKCkgPT4gdm9pZDsgfSA9PiB7XHJcblxyXG4gIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICByZXR1cm4ge1xyXG4gICAgdW5zdWJzY3JpYmU6ICgpID0+IHtcclxuICAgICAgZXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG59O1xyXG4iLCJpbXBvcnQgeyBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgTmdNb2RlbCwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuLy8gcnhqcyB2NS92NiBjb21wYXRpYmxlXHJcbmltcG9ydCB7IGZyb21FdmVudE1vY2sgfSBmcm9tICcuL2Zyb20tZXZlbnQtbW9jayc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbi8vIHR5cGVzXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEFuIGFic3RyYWN0IGNsYXNzIHRvIGJlIGRlcml2ZWQgYnlcclxuICogYSBjb25jcmV0ZSBpbnB1dCBkaXJlY3RpdmUgY2xhc3MuXHJcbiAqIFZhbGlkYXRlcyBhbiBpbnB1dCBlbGVtZW50IGFuZCBlbWl0c1xyXG4gKiB0aGUgdmFsaWRhdGlvbiBzdGF0dXMgdG8gdGhlIGxpc3RlbmVyc1xyXG4gKiAoTXNnQ29tcG9uZW50LCBMYWJlbERpcmVjdGl2ZSlcclxuICogdGhyb3VnaCBJbnB1dFN0b3JhZ2VTZXJ2aWNlLlxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0SW5wdXQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIGxhYmVsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIG1hdElucHV0OiAnJztcclxuICBASW5wdXQoKSBwdWJsaWMgbW9kZWw6IE5nTW9kZWw7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQ6ICcnIHwgYm9vbGVhbjtcclxuXHJcbiAgcHJvdGVjdGVkIGlucHV0UGFyYW1zOiBpbnB1dE1zZy5JbnB1dFBhcmFtcztcclxuICAvKipcclxuICAgKiBBIGRpY3Rpb25hcnkgd2l0aCBjYWxsYmFja3MgdG8gZ2V0IGN1cnJlbnQgdmFsaWRhdGlvbiBwYXJhbXMuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvck9wdGlvbnM6IHsgW25hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtRm4gfTtcclxuXHJcbiAgcHJpdmF0ZSBlbGVtOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgZm9ybTogTmdGb3JtO1xyXG4gIHByaXZhdGUgaW5wdXRLZXk6IHN0cmluZztcclxuICBwcml2YXRlIGlzTWF0ZXJpYWw6IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogQ29udGFpbnMgdHJ1ZSBpZiB0aGUgcHJldm9pdXMgaW5wdXQgc3RhdGUgd2FzIHZhbGlkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgcHJldlZhbGlkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgc3RhdHVzU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvZiB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRvclBhcmFtczogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXTtcclxuICBwcml2YXRlIHZhbGlkYXRvcjogaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCBpbnB1dFZhbGlkYXRvckZhY3Rvcnk6IGlucHV0TXNnLklucHV0VmFsaWRhdG9yRmFjdG9yeVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWFibGVQcm9wcyA9IHtcclxuICAgICAgcGxhY2Vob2xkZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKChuYW1lKSA9PiB7XHJcbiAgICAgIGlmICghY2hhbmdlYWJsZVByb3BzW25hbWVdIHx8XHJcbiAgICAgICAgIXRoaXMudmFsaWRhdG9yT3B0aW9uc1tuYW1lXSB8fFxyXG4gICAgICAgIGNoYW5nZXNbbmFtZV0uaXNGaXJzdENoYW5nZSgpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5hbWUgPT09ICdwbGFjZWhvbGRlcicgfHwgbmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMubGFiZWwgPSBjaGFuZ2VzW25hbWVdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnBhcmFtQ2hhbmdlLm5leHQoJ2xhYmVsJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgICAgdGhpcy5pbnB1dFBhcmFtcy5wYXJhbUNoYW5nZS5uZXh0KG5hbWUgYXMgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk7XHJcbiAgICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICAgIHRoaXMubW9kZWwuY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhdHVzT2ZmKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UucmVtb3ZlKHRoaXMuaW5wdXRLZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZWxlbSA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5pc01hdGVyaWFsID0gdGhpcy5tYXRJbnB1dCA9PT0gJyc7XHJcbiAgICB0aGlzLmlucHV0S2V5ID0gdGhpcy5pZCB8fCB0aGlzLm5hbWU7XHJcblxyXG4gICAgdGhpcy5jaGVja1JlcXVpcmVkUGFyYW1zKCk7XHJcblxyXG4gICAgdGhpcy5zZXRNYXRGb3JtRmllbGRDbGFzcygpO1xyXG5cclxuICAgIHRoaXMuaW5pdElucHV0UGFyYW1zKCk7XHJcbiAgICB0aGlzLnNldFZhbGlkYXRpb25QYXJhbXMoKTtcclxuICAgIHRoaXMuY3JlYXRlVmFsaWRhdG9yKCk7XHJcbiAgICB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2Uuc2V0KHRoaXMuaW5wdXRQYXJhbXMsIHRoaXMuaWQsIHRoaXMubmFtZSk7XHJcblxyXG4gICAgLy8gV2FpdCB0aWxsIE5nRm9ybSB3aWxsIGJlIGluaXRpYWxpemVkXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5mb3JtID0gdGhpcy5tb2RlbC5mb3JtRGlyZWN0aXZlIGFzIE5nRm9ybTtcclxuICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neElucHV0IGRpcmVjdGl2ZTogdGhlIGVsZW1lbnQgd2l0aCBuYW1lPVwiJHt0aGlzLm5hbWV9XCIgaGF2ZSB0byBiZSBpbnNpZGUgYSA8Zm9ybT4gZWxlbWVudGApO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdHVzT24oKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoY29udHJvbCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzQm9vbGFlblBhcmFtKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXNbbmFtZV0gPT09ICcnIHx8IHRoaXNbbmFtZV0gPT09IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzTnVtYmVyUGFyYW0obmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHRoaXNbbmFtZV0pICYmIGlzRmluaXRlKHRoaXNbbmFtZV0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjaGVja1JlcXVpcmVkUGFyYW1zKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm5hbWUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hJbnB1dCBkaXJlY3RpdmU6IGNhblxcJ3QgZmluZCBuYW1lIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gICAgaWYgKCEodGhpcy5tb2RlbCBpbnN0YW5jZW9mIE5nTW9kZWwpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4SW5wdXQgZGlyZWN0aXZlOiBOZ01vZGVsIGluc3RhbmNlIGhhdmUgdG8gYmUgcHJvdmlkZWQgdG8gW21vZGVsXSBwYXJhbSBvZiB0aGUgZWxlbWVudGApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVWYWxpZGF0b3IoKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgdmFsaWRhdG9yczogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSA9IHt9O1xyXG4gICAgdGhpcy52YWxpZGF0b3JQYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgIHZhbGlkYXRvcnNbcGFyYW0ubmFtZV0gPSBwYXJhbTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMudmFsaWRhdG9yID0gdGhpcy5pbnB1dFZhbGlkYXRvckZhY3RvcnkuY3JlYXRlKHZhbGlkYXRvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SW5wdXRQYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcyA9IHtcclxuICAgICAgbGFiZWw6IHRoaXMucGxhY2Vob2xkZXIgfHwgdGhpcy5sYWJlbCxcclxuICAgICAgbWF0ZXJpYWw6IHRoaXMuaXNNYXRlcmlhbCxcclxuICAgICAgcGFyYW1DaGFuZ2U6IG5ldyBTdWJqZWN0KCksXHJcbiAgICAgIHN0YXR1czogbmV3IEJlaGF2aW9yU3ViamVjdCgncHJpc3RpbmUnIGFzIGlucHV0TXNnLklucHV0U3RhdHVzKSxcclxuICAgICAgdmFsaWQ6IG5ldyBCZWhhdmlvclN1YmplY3QodHJ1ZSksXHJcbiAgICAgIHZhbGlkYXRpb25QYXJhbXM6IHVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgJ25neC1tc2dfX21hdC1mb3JtLWZpZWxkJ1xyXG4gICAqIGlmIG1hdElucHV0IGRpcmVjdGl2ZSB3YXMgc2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRNYXRGb3JtRmllbGRDbGFzcygpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNNYXRlcmlhbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBsZXQgcGFyZW50OiBIVE1MRWxlbWVudCA9IGlucHV0LnBhcmVudEVsZW1lbnQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ01BVC1GT1JNLUZJRUxEJykge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBpZiAoaSA9PT0gOSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbmd4SW5wdXQgZGlyZWN0aXZlOiBDYW5cXCd0IGZpbmQgcGFyZW50IDxtYXQtZm9ybS1maWVsZD4gZWxlbScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnbmd4LW1zZ19fbWF0LWZvcm0tZmllbGQnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgY3VycmVudCB2YWxpZGF0aW9uIHBhcmFtcyBvbiBpbml0IG9yIG9uIGNoYW5nZXNcclxuICAgKi9cclxuICBwcml2YXRlIHNldFZhbGlkYXRpb25QYXJhbXMoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zID0ge307XHJcbiAgICB0aGlzLnZhbGlkYXRvclBhcmFtcyA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLmhhc0Jvb2xhZW5QYXJhbSgncmVxdWlyZWQnKSkge1xyXG4gICAgICBjb25zdCByZXF1aXJlZFBhcmFtOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSA9IHtcclxuICAgICAgICBuYW1lOiAncmVxdWlyZWQnLFxyXG4gICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgc2V0OiB0cnVlXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcy5yZXF1aXJlZCA9IHJlcXVpcmVkUGFyYW07XHJcbiAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocmVxdWlyZWRQYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgT2JqZWN0LmtleXModGhpcy52YWxpZGF0b3JPcHRpb25zKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBjb25zdCBwYXJhbTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gPSB0aGlzLnZhbGlkYXRvck9wdGlvbnNbbmFtZV0oKTtcclxuICAgICAgaWYgKHBhcmFtLnNldCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXSA9IHBhcmFtO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLnB1c2gocGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT2ZmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YikgPT4ge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgdGhlIGlucHV0IHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdHVzT24oKTogdm9pZCB7XHJcblxyXG4gICAgLy8gRW1pdHMgYW4gZXJyb3Igc3RhdHVzIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkLlxyXG4gICAgY29uc3QgZW1pdEVycm9yU3RhdHVzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICBmb3IgKGNvbnN0IHBhcmFtIG9mIHRoaXMudmFsaWRhdG9yUGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuaGFzRXJyb3IocGFyYW0ubmFtZSkpIHtcclxuICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWQubmV4dChmYWxzZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KHBhcmFtLm5hbWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlbWl0RXJyb3JTdGF0dXNPblRvdWNoZWQgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm1vZGVsLnRvdWNoZWQgfHwgdGhpcy5mb3JtLnN1Ym1pdHRlZCkge1xyXG4gICAgICAgIGVtaXRFcnJvclN0YXR1cygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzID0gKHN0YXR1czogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgICAgY2FzZSAnSU5WQUxJRCc6XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnVkFMSUQnOlxyXG4gICAgICAgICAgaWYgKCF0aGlzLnByZXZWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ3ZhbGlkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnByZXZWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdQUklTVElORSc6XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQodHJ1ZSk7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCdwcmlzdGluZScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBibHVyU3ViID0gZnJvbUV2ZW50TW9jayh0aGlzLmVsZW0sICdibHVyJywgZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGJsdXJTdWIgYXMgU3Vic2NyaXB0aW9uKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sVmFsdWVTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwudmFsdWVDaGFuZ2VzXHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xWYWx1ZVN1Yik7XHJcblxyXG4gICAgY29uc3QgZm9ybVN1Ym1pdFN1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtLm5nU3VibWl0XHJcbiAgICAgIC5zdWJzY3JpYmUoZW1pdEVycm9yU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGZvcm1TdWJtaXRTdWIpO1xyXG5cclxuICAgIGNvbnN0IGNvbnRyb2xTdGF0dXNTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMubW9kZWwuc3RhdHVzQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKGVtaXRWYWxpZEFuZFByaXN0aW5lU3RhdHVzKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKGNvbnRyb2xTdGF0dXNTdWIpO1xyXG5cclxuICAgIC8vIEFkZHMvcmVtb3ZlcyAnbmd4LWlucHV0X2ludmFsaWQnIGNsYXNzIHRvIHRoZSBpbnB1dFxyXG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlID0gKHZhbGlkOiBib29sZWFuKTogdm9pZCA9PiB7XHJcbiAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgdmFsaWRTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMudmFsaWRcclxuICAgICAgLnN1YnNjcmliZSh0b2dnbGVDbGFzc09uVmFsaWRDaGFuZ2UpO1xyXG4gICAgdGhpcy5zdGF0dXNTdWJzY3JpcHRpb25zLnB1c2godmFsaWRTdWIpO1xyXG5cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElucHV0VmFsaWRhdG9yIGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3Ige1xyXG5cclxuICAvKipcclxuICAgKiBBbGwgYXZhaWxhYmxlIHZhbGlkYXRvcnMgZm9yIHNwZWNpZmljIGlucHV0IHR5cGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXZhaWxhYmxlVmFsaWRhdG9yczogeyBbbmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yRm48YW55PiB9O1xyXG4gIC8qKlxyXG4gICAqIFRoZSBzZXF1ZW5jZSBvZiB2YWxpZGF0b3IgbmFtZXMgdG8gdmFsaWRhdGUgYW4gaW5wdXQgZWxlbWVudCB3aXRoLlxyXG4gICAqIFZhbGlkYXRvcnMgYXJlIGFwcGxpZWQgb25lIGJ5IG9uZS5cclxuICAgKiBAZXhhbXBsZSBbJ3JlcXVpcmVkJywgJ21pbmxlbmdodCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvclNlcXVlbmNlOiBzdHJpbmdbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0b3JzIGFwcGxpZWQgdG8gdGhlIHNwZWNpZmljIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGN1cnJlbnRWYWxpZGF0b3JzOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PltdO1xyXG5cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogYW55IH0gfCBudWxsID0gbnVsbDtcclxuICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHRoaXMuY3VycmVudFZhbGlkYXRvcnMpIHtcclxuICAgICAgcmVzdWx0ID0gdmFsaWRhdG9yLmZuKGNvbnRyb2wudmFsdWUsIHZhbGlkYXRvci52YWx1ZSk7XHJcbiAgICAgIC8vIGJyZWFrIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG5cclxuICBwcm90ZWN0ZWQgZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmF2YWlsYWJsZVZhbGlkYXRvcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRWYWxpZGF0b3IgY2xhc3M6IHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9ycyBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWxpZGF0b3JTZXF1ZW5jZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dFZhbGlkYXRvciBjbGFzczogdGhpcy52YWxpZGF0b3JTZXF1ZW5jZSBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzLnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMgPSBbXTtcclxuICAgIGNvbnN0IHBhcmFtU2VxdWVuY2UgPSB0aGlzLmdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2UodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gICAgcGFyYW1TZXF1ZW5jZS5mb3JFYWNoKHBhcmFtID0+IHtcclxuICAgICAgY29uc3QgY29uZmlnOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PiA9IHtcclxuICAgICAgICBuYW1lOiBwYXJhbS5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiBwYXJhbS52YWx1ZSxcclxuICAgICAgICBzZXQ6IHBhcmFtLnNldCxcclxuICAgICAgICBmbjogdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzW3BhcmFtLm5hbWVdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMucHVzaChjb25maWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzZXF1ZW5jZSBvZiBjb25maWdzIG9mIHZhbGlkYXRvcnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2U8VD4odmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW10ge1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZzogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXSA9IFtdO1xyXG4gICAgdGhpcy52YWxpZGF0b3JTZXF1ZW5jZS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBpZiAodmFsaWRhdG9yc1RvQXBwbHlbbmFtZV0pIHtcclxuICAgICAgICBjb25maWcucHVzaCh2YWxpZGF0b3JzVG9BcHBseVtuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRpb24gZnVuY3Rpb24gdG8gYmUgdXNlZCB3aXRoIGFuIGFueSB0eXBlIG9mIGFuIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlcXVpcmVkKHZhbHVlOiBzdHJpbmcpOiB7IHJlcXVpcmVkOiB0cnVlIH0gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmVtcHR5KHZhbHVlKSA/IHsgcmVxdWlyZWQ6IHRydWUgfSA6IG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbnB1dFZhbGlkYXRvciB9IGZyb20gJy4uL21vZGVscy9pbnB1dC12YWxpZGF0b3InO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIHByb3RlY3RlZCBhdmFpbGFibGVWYWxpZGF0b3JzID0ge1xyXG4gICAgZW1haWw6IHRoaXMuZW1haWxcclxuICB9O1xyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JTZXF1ZW5jZSA9IFsncmVxdWlyZWQnLCAnZW1haWwnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtYWlsKHZhbHVlOiBzdHJpbmcpOiB7IGVtYWlsOiBzdHJpbmcgfSB8IG51bGwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2Ugc2hvdWxkIHNraXAgdGhlIHZhbGlkYXRpb24gZm9yIGVtcHR5IHZhbHVlcy5cclxuICAgICAqIENvbnNpZGVyIHRoZSBjYXNlIHdoZW4gYSBjbGllbnQgc2V0cyBhbiBvcHRpb25hbFxyXG4gICAgICogZW1haWwgaW5wdXQgdGhhdCBzaG91bGQgYmUgdmFsaWRhdGVkXHJcbiAgICAgKiBvbmx5IGlmIGEgdXNlciBpbnB1dHMgc29tZSB0ZXh0LlxyXG4gICAgICovXHJcbiAgICBpZiAoc3VwZXIuZW1wdHkodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB7IGVtYWlsOiBudWxsIH07XHJcbiAgICB9XHJcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ2MTU1L3ZhbGlkYXRlLWVtYWlsLWFkZHJlc3MtaW4tamF2YXNjcmlwdFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG4gICAgY29uc3QgcmVnRXhwID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcbiAgICBjb25zdCBpc1ZhbGlkOiBib29sZWFuID0gcmVnRXhwLnRlc3QodmFsdWUpO1xyXG5cclxuICAgIHJldHVybiBpc1ZhbGlkID8gbnVsbCA6IHsgZW1haWw6IHZhbHVlIH07XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBFbWFpbFZhbGlkYXRvciB9IGZyb20gJy4vZW1haWwtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRW1haWxWYWxpZGF0b3JGYWN0b3J5IGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3JGYWN0b3J5IHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZSh2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogRW1haWxWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBFbWFpbFZhbGlkYXRvcih2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEFic3RyYWN0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvYWJzdHJhY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBFbWFpbFZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL2VtYWlsLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXRFbWFpbF0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICBFbWFpbFZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dEVtYWlsRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCB7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgZW1haWw6ICgpID0+IHtcclxuICAgICAgLy8gVGhlIGVtYWlsIHZhbGlkYXRvciBpcyBhbHdheXMgc2V0IGJ5IGRlZmF1bHRcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnZW1haWwnLFxyXG4gICAgICAgIHNldDogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JGYWN0b3J5OiBFbWFpbFZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgcHJvdGVjdGVkIGF2YWlsYWJsZVZhbGlkYXRvcnMgPSB7XHJcbiAgICBpbnRlZ2VyOiB0aGlzLmludGVnZXIuYmluZCh0aGlzKSxcclxuICAgIG1heDogdGhpcy5tYXguYmluZCh0aGlzKSxcclxuICAgIG1pbjogdGhpcy5taW4uYmluZCh0aGlzKVxyXG4gIH07XHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvclNlcXVlbmNlID0gWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ21pbicsICdtYXgnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGludGVnZXIodmFsdWU6IG51bWJlcik6IHsgaW50ZWdlcjogYW55IH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAoIXRoaXMubnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBpbnRlZ2VyOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW50ZWdlcjogYm9vbGVhbiA9IE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxuICAgIHJldHVybiBpbnRlZ2VyID8gbnVsbCA6IHsgaW50ZWdlcjogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4KHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogeyBtYXg6IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWF4OiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1heDogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWluKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyKTogeyBtaW46IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWluOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1pbjogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbnVtYmVyKGFyZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoYXJnKSkgJiYgaXNGaW5pdGUoYXJnKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbnVtYmVyLXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvckZhY3RvcnkgaW1wbGVtZW50cyBpbnB1dE1zZy5JbnB1dFZhbGlkYXRvckZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgY3JlYXRlKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBOdW1iZXJWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBOdW1iZXJWYWxpZGF0b3IodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi9udW1iZXItdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0TnVtYmVyXVt0eXBlPVwibnVtYmVyXCJdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgdXNlRXhpc3Rpbmc6IElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIE51bWJlclZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE51bWJlckRpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQge1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgaW50ZWdlcjogJycgfCBib29sZWFuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IHN0cmluZyB8IG51bWJlcjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWluOiBzdHJpbmcgfCBudW1iZXI7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgaW50ZWdlcjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdpbnRlZ2VyJyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc0Jvb2xhZW5QYXJhbSgnaW50ZWdlcicpXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbWF4OiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21heCcsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4JyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1heFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1pbjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtaW4nLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21pbicpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5taW5cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogTnVtYmVyVmFsaWRhdG9yRmFjdG9yeVxyXG4gICkge1xyXG4gICAgc3VwZXIoZWxlbVJlZiwgaW5wdXRTdG9yYWdlU2VydmljZSwgdmFsaWRhdG9yRmFjdG9yeSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbnB1dFZhbGlkYXRvciB9IGZyb20gJy4uL21vZGVscy9pbnB1dC12YWxpZGF0b3InO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogVmFsaWRhdGVzICd0ZXh0JyBsaWtlIGlucHV0IGVsZW1lbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgJ21pbmxlbmd0aCcgYW5kICdtYXhsZW5ndGgnIHZhbGlkYXRvcnNcclxuICAgKiBhcmUgYWxyZWFkeSBzdXBwb3J0ZWQgYnkgQW5ndWxhciBOZ0Zvcm0sIGJ1dFxyXG4gICAqIHdlIHNob3VsZCBlbXBsZW1lbnQgdGhlbSB0byBzdG9wIHRoZSB2YWxpZGF0aW9uXHJcbiAgICogcHJvY2VzcyB3aGVuIHRoZSBmaXJzdCB2YWxpZGF0b3IgZmFpbHMuXHJcbiAgICogU2VlOiBJbnB1dFZhbGlkYXRvci52YWxpZGF0ZSgpIGltcGxlbWVudGF0aW9uLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhdmFpbGFibGVWYWxpZGF0b3JzID0ge1xyXG4gICAgbWF4bGVuZ3RoOiB0aGlzLm1heGxlbmd0aCxcclxuICAgIG1pbmxlbmd0aDogdGhpcy5taW5sZW5ndGgsXHJcbiAgICBwYXR0ZXJuOiB0aGlzLnBhdHRlcm5cclxuICB9O1xyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JTZXF1ZW5jZSA9IFsncmVxdWlyZWQnLCAnbWlubGVuZ3RoJywgJ21heGxlbmd0aCcsICdwYXR0ZXJuJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0Q3VycmVudFZhbGlkYXRvcnModmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXhsZW5ndGgodmFsdWU6IHN0cmluZywgbWF4OiBudW1iZXIpOiB7IG1heGxlbmd0aDogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gbWF4ID8geyBtYXhsZW5ndGg6IHZhbHVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtaW5sZW5ndGgodmFsdWU6IHN0cmluZywgbWluOiBudW1iZXIpOiB7IG1pbmxlbmd0aDogc3RyaW5nIH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHsgbWlubGVuZ3RoOiAnZW1wdHknIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDwgbWluID8geyBtaW5sZW5ndGg6IHZhbHVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwYXR0ZXJuKHZhbHVlOiBzdHJpbmcsIHJlZ0V4cDogUmVnRXhwKTogeyBwYXR0ZXJuOiBzdHJpbmcgfSB8IG51bGwge1xyXG4gICAgaWYgKHN1cGVyLmVtcHR5KHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBwYXR0ZXJuOiAnZW1wdHknIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVnRXhwLnRlc3QodmFsdWUpID8gbnVsbCA6IHsgcGF0dGVybjogdmFsdWUgfTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFRleHRWYWxpZGF0b3IgfSBmcm9tICcuL3RleHQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvckZhY3RvcnkgaW1wbGVtZW50cyBpbnB1dE1zZy5JbnB1dFZhbGlkYXRvckZhY3Rvcnkge1xyXG5cclxuICBwdWJsaWMgY3JlYXRlKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBUZXh0VmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgVGV4dFZhbGlkYXRvcih2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZXh0VmFsaWRhdG9yRmFjdG9yeSB9IGZyb20gJy4vdGV4dC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXRUZXh0XSwgdGV4dGFyZWFbbmd4SW5wdXRUZXh0XScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBJbnB1dFRleHREaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbWF4bGVuZ3RoOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIG1pbmxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuOiBSZWdFeHA7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgbWF4bGVuZ3RoOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21heGxlbmd0aCcsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1heGxlbmd0aFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1pbmxlbmd0aDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21pbmxlbmd0aCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5taW5sZW5ndGhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBwYXR0ZXJuOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ3BhdHRlcm4nLFxyXG4gICAgICAgIHNldDogdGhpcy5wYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnBhdHRlcm5cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIG1heExlbmd0aFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3A6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9mZigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkluaXQoKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdE1heExlbmd0aFN0YXR1cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1vZGVsLnZhbHVlLmxlbmd0aCA9PT0gK3RoaXMubWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ21heGxlbmd0aCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgZ2VuZXJhdGluZyAnbWF4bGVuZ3RoJyBzdGF0dXNcclxuICAgKi9cclxuICBwcml2YXRlIG1heExlbmd0aE9mZigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1heExlbmd0aFN1Yikge1xyXG4gICAgICB0aGlzLm1heExlbmd0aFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgJ21heGxlbmd0aCcgc3RhdHVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhPbigpOiB2b2lkIHtcclxuICAgIGlmIChzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJykgJiYgIXRoaXMubWF4TGVuZ3RoU3ViKSB7XHJcbiAgICAgIHRoaXMubWF4TGVuZ3RoU3ViID0gdGhpcy5tb2RlbC52YWx1ZUNoYW5nZXNcclxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZW1pdE1heExlbmd0aFN0YXR1cy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL2lucHV0LW1zZy1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQWRkcy9yZW1vdmVzICduZ3gtaW5wdXRfaW52YWxpZCcgY3NzIGNsYXNzXHJcbiAqIHdoZW4gaW5wdXQgc3RhdHVzIGNoYW5nZXNcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25neExhYmVsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExhYmVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBpbnB1dCBlbGVtZW50IGlkIG9yIG5hbWVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9yOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgZWxlbTogSFRNTExhYmVsRWxlbWVudDtcclxuICBwcml2YXRlIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB2YWxpZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudmFsaWQgJiYgdGhpcy52YWxpZC51bnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLnZhbGlkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5lbGVtID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmhpZ2hsaWdodENvbG9yID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpLmNvbG9ycy5lcnJvcjtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmd4TGFiZWwgZGlyZWN0aXZlOiBcXCdmb3JcXCcgYXR0cmlidXRlIHdpdGggaW5wdXQgaWQgb3IgbmFtZSBpcyByZXF1aXJlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xyXG5cclxuICAgIC8vIFdhaXQgdGlsbCB0aGUgaW5wdXQgZWxlbWVudCB3aWxsIGJlIGluaXRpYWxpemVkLlxyXG4gICAgLy8gV2Ugc2hvdWxkIHdhaXQgaW4gY2FzZSB0aGUgbGFiZWwgZWxlbWVudCB3YXNcclxuICAgIC8vIGluc2VydGVkIGJlZm9yZSB0aGUgaW5wdXQuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXRQYXJhbXMgPSB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UuZ2V0KHRoaXMuZm9yKTtcclxuICAgICAgaWYgKCFpbnB1dFBhcmFtcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4TGFiZWwgZGlyZWN0aXZlOiBjYW5cXCd0IGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgd2l0aCBpZCBvciBuYW1lOiAke3RoaXMuZm9yfWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnZhbGlkID0gaW5wdXRQYXJhbXMudmFsaWQ7XHJcbiAgICAgIHRoaXMudmFsaWQuc3Vic2NyaWJlKCh2YWxpZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlKHZhbGlkKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodE9uVmFsaWRDaGFuZ2UodmFsaWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlnaGxpZ2h0T25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5zdHlsZS5jb2xvciA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLnN0eWxlLmNvbG9yID0gdGhpcy5oaWdobGlnaHRDb2xvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtLnN0eWxlLnRyYW5zaXRpb24gPSAnY29sb3IgMjUwbXMgZWFzZS1pbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUNsYXNzT25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ25neC1pbnB1dF9pbnZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyBhIG1lc3NhZ2UgZm9yIGFuIGlucHV0IGVsZW1lbnRcclxuICogZGVwZW5kaW5nIG9uIGl0YHMgdmFsaWRhdGlvbiBzdGF0dXMuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25neC1tc2cnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5neC1tc2dfX2NvbnRhaW5lclwiIFxyXG4gIFtuZ0NsYXNzXT1cImdldENsYXNzZXMoKVwiXHJcbiAgW25nU3R5bGVdPVwiZ2V0U3R5bGVzKClcIlxyXG4gID5cclxuXHJcbiAgPHNwYW4gKm5nSWY9XCJjdXJyZW50TXNnXCIgW0Btc2dBbmltYXRpb25dPlxyXG4gICAge3tjdXJyZW50TXNnfX1cclxuICA8L3NwYW4+XHJcblxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLm5neC1tc2dfX21hdC1mb3JtLWZpZWxke21hcmdpbi1ib3R0b206MTZweDt3aWR0aDoxMDAlfS5uZ3gtbXNnX19jb250YWluZXJ7ZGlzcGxheTpibG9jaztmb250LXNpemU6MTJweDttaW4taGVpZ2h0OjIwcHg7bWFyZ2luLXRvcDozcHh9Lm5neC1tc2dfbWF0ZXJpYWx7bWFyZ2luLXRvcDotMzNweH0ubmd4LW1zZ19wb3NfYm90dG9tLWxlZnR7dGV4dC1hbGlnbjpsZWZ0fS5uZ3gtbXNnX3Bvc19ib3R0b20tcmlnaHR7dGV4dC1hbGlnbjpyaWdodH1gXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ21zZ0FuaW1hdGlvbicsIFtcclxuICAgICAgc3RhdGUoJ2FjdGl2ZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gKicsIFtcclxuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcclxuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnMjUwbXMgZWFzZS1pbicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgXSlcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXNnQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFuIGlucHV0IGlkIG9yIG5hbWUgYXR0cmlidXRlXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGZvcjogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIE9wdGlvbmFsIHBhcmFtcyB3aXRoIGN1c3RvbSBtZXNzYWdlc1xyXG4gICAqIHRvIG92ZXJ3cml0ZSB0aGUgZGVmYXVsdCBvbmVzXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGVtYWlsOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgaW50ZWdlcjogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1heDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1heGxlbmd0aDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1pbjogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIG1pbmxlbmd0aDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIHBhdHRlcm46IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwb3NpdGlvbjogaW5wdXRNc2cuUG9zaXRpb247XHJcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuXHJcbiAgLy8gQ3VycmVudGx5IHNob3duIG1lc3NhZ2VcclxuICBwdWJsaWMgY3VycmVudE1zZzogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGN1cnJlbnRTdGF0dXM6IGlucHV0TXNnLklucHV0U3RhdHVzO1xyXG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogaW5wdXRNc2cuQ29uZmlnO1xyXG4gIHByaXZhdGUgaW5wdXRQYXJhbXM6IGlucHV0TXNnLklucHV0UGFyYW1zO1xyXG4gIC8qKlxyXG4gICAqIEFsbCBhdmFpbGFibGUgbWVzc2FnZXMgY29ycmVzcG9uZGVkXHJcbiAgICogdG8gdmFsaWRhdGlvbiBwYXJhbXMgb2YgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtZXNzYWdlczogaW5wdXRNc2cuUmVzdWx0TXNnID0ge307XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXRDbGFzc2VzKCk6IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfSB7XHJcblxyXG4gICAgY29uc3QgcG9zaXRpb246ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JyA9IHRoaXMucG9zaXRpb24gfHwgdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpLnBvc2l0aW9uO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgJ25neC1tc2dfcG9zX2JvdHRvbS1sZWZ0JzogcG9zaXRpb24gPT09ICdib3R0b20tbGVmdCcsXHJcbiAgICAgICduZ3gtbXNnX3Bvc19ib3R0b20tcmlnaHQnOiBwb3NpdGlvbiA9PT0gJ2JvdHRvbS1yaWdodCcsXHJcbiAgICAgICduZ3gtbXNnX2NvbG9yX3Rvb2x0aXAnOiB0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdtYXhsZW5ndGgnLFxyXG4gICAgICAnbmd4LW1zZ19tYXRlcmlhbCc6IHRoaXMuaW5wdXRQYXJhbXMubWF0ZXJpYWxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3R5bGVzKCk6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9IHtcclxuXHJcbiAgICBsZXQgY29sb3I6IHN0cmluZztcclxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdtYXhsZW5ndGgnKSB7XHJcbiAgICAgIGNvbG9yID0gdGhpcy5kZWZhdWx0Q29uZmlnLmNvbG9ycy5tYXhsZW5ndGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBjb2xvcjogY29sb3IgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IGNoYW5nZWFibGVQcm9wcyA9IHtcclxuICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgIGludGVnZXI6IHRydWUsXHJcbiAgICAgIG1heDogdHJ1ZSxcclxuICAgICAgbWF4bGVuZ3RoOiB0cnVlLFxyXG4gICAgICBtaW46IHRydWUsXHJcbiAgICAgIG1pbmxlbmd0aDogdHJ1ZSxcclxuICAgICAgcG9zaXRpb246IHRydWUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIE9iamVjdC5rZXlzKGNoYW5nZXMpLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgIGlmICghY2hhbmdlYWJsZVByb3BzW25hbWVdIHx8IGNoYW5nZXNbbmFtZV0uaXNGaXJzdENoYW5nZSgpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShuYW1lIGFzIGlucHV0TXNnLlZhbGlkYXRvck5hbWUpO1xyXG5cclxuICAgICAgLy8gdXBkYXRlIGN1cnJlbnRNc2cgaWYgaXQgaGFzIGJlZW4gY2hhbmdlZFxyXG4gICAgICAvLyBhbmQgdGhlIGlucHV0IGlzIGludmFsaWRcclxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXR1cyA9PT0gbmFtZSAmJiBuYW1lICE9PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9IHRoaXMubWVzc2FnZXNbbmFtZV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2goc3ViID0+IHN1Yi51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmZvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25neE1zZyBjb21wb25lbnQ6IFxcJ2ZvclxcJyBwYXJhbWV0ZXIgd2l0aCB0aGUgaW5wdXQgaWQgb3IgbmFtZSBtdXN0IGJlIHByb3ZpZGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5wdXRQYXJhbXMgPSB0aGlzLnN0b3JhZ2VTZXJ2aWNlLmdldCh0aGlzLmZvcik7XHJcbiAgICBpZiAoIXRoaXMuaW5wdXRQYXJhbXMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hNc2cgY29tcG9uZW50OiBjYW5cXCd0IGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgd2l0aCBpZCBvciBuYW1lOiAke3RoaXMuZm9yfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBkZWZhdWx0IG9yIGN1c3RvbSBtZXNzYWdlcyBmb3IgZ2l2ZW4gdmFsaWRhdGlvbiBwYXJhbXNcclxuICAgIHRoaXMuc2V0QWxsTWVzc2FnZXMoKTtcclxuXHJcbiAgICAvLyBMaXN0ZW4gdG8gdGhlIGlucHV0IHN0YXR1c1xyXG4gICAgY29uc3Qgc3RhdHVzU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0UGFyYW1zLnN0YXR1c1xyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub25TdGF0dXNDaGFuZ2UuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdGF0dXNTdWIpO1xyXG5cclxuICAgIC8vIExpc3RlbiB0byB0aGUgaW5wdXQgcGFyYW1zIGNoYW5nZVxyXG4gICAgY29uc3QgaW5wdXRQYXJhbXNDaGFuZ2VTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMucGFyYW1DaGFuZ2VcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9uSW5wdXRQYXJhbXNDaGFuZ2UuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChpbnB1dFBhcmFtc0NoYW5nZVN1Yik7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGVzIG1lc3NhZ2VzIHdoZW4gaW5wdXQgcGFyYW1zIGNoYW5nZVxyXG4gIHByaXZhdGUgb25JbnB1dFBhcmFtc0NoYW5nZShjaGFuZ2VkUHJvcE5hbWU6ICdsYWJlbCcgfCBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKGNoYW5nZWRQcm9wTmFtZSA9PT0gJ2xhYmVsJykge1xyXG4gICAgICB0aGlzLnNldEFsbE1lc3NhZ2VzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UoY2hhbmdlZFByb3BOYW1lIGFzIGlucHV0TXNnLlZhbGlkYXRvck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSBjdXJyZW50IG1zZyBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ3ByaXN0aW5lJyB8fFxyXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICd2YWxpZCcgfHxcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3RoaXMuY3VycmVudFN0YXR1c107XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGVzIGN1cnJlbnRTdGF0dXMgYW5kIHNob3dzL2hpZGVzIGN1cnJlbnRNc2dcclxuICBwcml2YXRlIG9uU3RhdHVzQ2hhbmdlKHN0YXR1czogaW5wdXRNc2cuSW5wdXRTdGF0dXMpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICBjYXNlICdwcmlzdGluZSc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gJyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3ZhbGlkJzpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSAnJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3N0YXR1c107XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY3VycmVudE1zZyA9ICcnOyB9LCAyMDAwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW3N0YXR1c107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEFsbE1lc3NhZ2VzKCk6IHZvaWQge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zKS5mb3JFYWNoKChuYW1lOiBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShuYW1lKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0cyBtZXNzYWdlIHRleHQgZm9yIGEgZ2l2ZW4gdmFsaWRhdGlvbiBwYXJhbWV0ZXIuXHJcbiAgLy8gSWYgYXBwcm9wcmlhdGUgbWVzc2FnZSBleHByZXNzaW9uIGlzIG5vdCBwcm92aWRlZFxyXG4gIC8vIHRocm9naCBASW5wdXQoKSBiaW5kaW5nIC0gdGhlIGRlZmF1bHQgb25lIGlzIHVzZWQgaW5zdGVhZC5cclxuICBwcml2YXRlIHNldE1lc3NhZ2UobmFtZTogaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk6IHZvaWQge1xyXG5cclxuICAgIGlmICghdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zW25hbWVdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBoZWxwZXIgdHlwZSBndWFyZFxyXG4gICAgY29uc3QgaXNGbiA9IChhcmc6IHN0cmluZyB8IEZ1bmN0aW9uKTogYXJnIGlzIGlucHV0TXNnLk1zZ0ZuID0+IHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGdldCBzcGVjaWZpYyBvciBkZWZhdWx0IG1zZ0V4cHJlc3Npb25cclxuICAgIGxldCBtc2dFeHByZXNzaW9uOiBpbnB1dE1zZy5Nc2dGbiB8IHN0cmluZztcclxuICAgIGlmICh0eXBlb2YgdGhpc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgbXNnRXhwcmVzc2lvbiA9IHRoaXNbbmFtZV0gYXMgaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtc2dFeHByZXNzaW9uID0gdGhpcy5kZWZhdWx0Q29uZmlnLm1zZ1tuYW1lXSBhcyBpbnB1dE1zZy5Nc2dGbiB8IHN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgYSBtZXNzYWdlIGdlbmVyYXRlZCBieSBNc2dGbigpIG9yIGFzIGEgc2ltbGUgc3RyaW5nXHJcbiAgICBpZiAoaXNGbihtc2dFeHByZXNzaW9uKSkge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzW25hbWVdID0gbXNnRXhwcmVzc2lvbih0aGlzLmlucHV0UGFyYW1zLmxhYmVsLCB0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXNbbmFtZV0udmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tZXNzYWdlc1tuYW1lXSA9IG1zZ0V4cHJlc3Npb247XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4vaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IElucHV0RW1haWxEaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LWVtYWlsL2lucHV0LWVtYWlsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElucHV0TnVtYmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC1udW1iZXIvaW5wdXQtbnVtYmVyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IElucHV0VGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IExhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9sYWJlbC9sYWJlbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBNc2dDb21wb25lbnQgfSBmcm9tICcuL21zZy9tc2cuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgIElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgTGFiZWxEaXJlY3RpdmUsXHJcbiAgICBNc2dDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgSW5wdXRTdG9yYWdlU2VydmljZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgSW5wdXRFbWFpbERpcmVjdGl2ZSxcclxuICAgIElucHV0TnVtYmVyRGlyZWN0aXZlLFxyXG4gICAgSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgTGFiZWxEaXJlY3RpdmUsXHJcbiAgICBNc2dDb21wb25lbnRcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRNc2dNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIiwidHNsaWJfMS5fX2V4dGVuZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs2QkFVMkM7WUFDdkMsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxTQUFTO2dCQUNoQixTQUFTLEVBQUUsTUFBTTthQUNsQjtZQUNELFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLEdBQUcsRUFBRTtnQkFDSCxLQUFLLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxXQUFTLEtBQU8sR0FBQTtnQkFD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