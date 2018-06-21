(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/animations'), require('@angular/platform-browser/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-input-msg', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/animations', '@angular/platform-browser/animations', '@angular/common'], factory) :
    (factory((global['ngx-input-msg'] = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.animations,global.ng.platformBrowser.animations,global.ng.common));
}(this, (function (exports,core,forms,rxjs,animations,animations$1,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Provides configuration for displaying messages.
     */
    var InputMsgConfigService = (function () {
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
            { type: core.Injectable },
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
    var InputStorageService = (function () {
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
            { type: core.Injectable },
        ];
        return InputStorageService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

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
    var AbstractInput = (function () {
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
                if (!(this.model instanceof forms.NgModel)) {
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
                    paramChange: new rxjs.Subject(),
                    status: new rxjs.BehaviorSubject(/** @type {?} */ ('pristine')),
                    valid: new rxjs.BehaviorSubject(true),
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
                var /** @type {?} */ input = (this.elemRef.nativeElement);
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            id: [{ type: core.Input }],
            label: [{ type: core.Input }],
            matInput: [{ type: core.Input }],
            model: [{ type: core.Input }],
            name: [{ type: core.Input }],
            placeholder: [{ type: core.Input }],
            required: [{ type: core.Input }]
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
     */ InputValidator = (function () {
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
    var EmailValidator = (function (_super) {
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
    var EmailValidatorFactory = (function () {
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
            { type: core.Injectable },
        ];
        return EmailValidatorFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var InputEmailDirective = (function (_super) {
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
            { type: core.Directive, args: [{
                        selector: 'input[ngxInputEmail]',
                        providers: [
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: InputEmailDirective,
                                multi: true
                            },
                            EmailValidatorFactory
                        ]
                    },] },
        ];
        /** @nocollapse */
        InputEmailDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: InputStorageService },
                { type: EmailValidatorFactory }
            ];
        };
        return InputEmailDirective;
    }(AbstractInput));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NumberValidator = (function (_super) {
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
    var NumberValidatorFactory = (function () {
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
            { type: core.Injectable },
        ];
        return NumberValidatorFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var InputNumberDirective = (function (_super) {
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
            { type: core.Directive, args: [{
                        selector: 'input[ngxInputNumber][type="number"]',
                        providers: [
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: InputNumberDirective,
                                multi: true
                            },
                            NumberValidatorFactory
                        ]
                    },] },
        ];
        /** @nocollapse */
        InputNumberDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: InputStorageService },
                { type: NumberValidatorFactory }
            ];
        };
        InputNumberDirective.propDecorators = {
            integer: [{ type: core.Input }],
            max: [{ type: core.Input }],
            min: [{ type: core.Input }]
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
     */ TextValidator = (function (_super) {
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
    var TextValidatorFactory = (function () {
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
            { type: core.Injectable },
        ];
        return TextValidatorFactory;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var InputTextDirective = (function (_super) {
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
            { type: core.Directive, args: [{
                        selector: 'input[ngxInputText], textarea[ngxInputText]',
                        providers: [
                            {
                                provide: forms.NG_VALIDATORS,
                                useExisting: InputTextDirective,
                                multi: true
                            },
                            TextValidatorFactory
                        ]
                    },] },
        ];
        /** @nocollapse */
        InputTextDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: InputStorageService },
                { type: TextValidatorFactory }
            ];
        };
        InputTextDirective.propDecorators = {
            maxlength: [{ type: core.Input }],
            minlength: [{ type: core.Input }],
            pattern: [{ type: core.Input }]
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
    var LabelDirective = (function () {
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
            { type: core.Directive, args: [{
                        selector: '[ngxLabel]'
                    },] },
        ];
        /** @nocollapse */
        LabelDirective.ctorParameters = function () {
            return [
                { type: InputMsgConfigService },
                { type: core.ElementRef },
                { type: InputStorageService }
            ];
        };
        LabelDirective.propDecorators = {
            for: [{ type: core.Input }]
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
    var MsgComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'ngx-msg',
                        template: "<div class=\"ngx-msg__container\" \n  [ngClass]=\"getClasses()\"\n  [ngStyle]=\"getStyles()\"\n  >\n\n  <span *ngIf=\"currentMsg\" [@msgAnimation]>\n    {{currentMsg}}\n  </span>\n\n</div>\n",
                        styles: [".ngx-msg__mat-form-field{margin-bottom:16px;width:100%}.ngx-msg__container{display:block;font-size:12px;min-height:20px;margin-top:3px}.ngx-msg_material{margin-top:-33px}.ngx-msg_pos_bottom-left{text-align:left}.ngx-msg_pos_bottom-right{text-align:right}"],
                        encapsulation: core.ViewEncapsulation.None,
                        animations: [
                            animations.trigger('msgAnimation', [
                                animations.state('active', animations.style({ opacity: 1 })),
                                animations.transition('void => *', [
                                    animations.style({ opacity: 0 }),
                                    animations.animate('250ms ease-in', animations.style({ opacity: 1 }))
                                ]),
                                animations.transition('* => void', [
                                    animations.style({ opacity: 1 }),
                                    animations.animate('250ms ease-in', animations.style({ opacity: 0 }))
                                ])
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        MsgComponent.ctorParameters = function () {
            return [
                { type: InputMsgConfigService },
                { type: InputStorageService }
            ];
        };
        MsgComponent.propDecorators = {
            for: [{ type: core.Input }],
            email: [{ type: core.Input }],
            integer: [{ type: core.Input }],
            max: [{ type: core.Input }],
            maxlength: [{ type: core.Input }],
            min: [{ type: core.Input }],
            minlength: [{ type: core.Input }],
            pattern: [{ type: core.Input }],
            position: [{ type: core.Input }],
            required: [{ type: core.Input }]
        };
        return MsgComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var InputMsgModule = (function () {
        function InputMsgModule() {
        }
        InputMsgModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            animations$1.BrowserAnimationsModule,
                            common.CommonModule,
                            forms.FormsModule
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

    exports.InputMsgConfigService = InputMsgConfigService;
    exports.InputStorageService = InputStorageService;
    exports.InputEmailDirective = InputEmailDirective;
    exports.InputNumberDirective = InputNumberDirective;
    exports.InputTextDirective = InputTextDirective;
    exports.LabelDirective = LabelDirective;
    exports.MsgComponent = MsgComponent;
    exports.InputMsgModule = InputMsgModule;
    exports.ɵc = EmailValidatorFactory;
    exports.ɵd = NumberValidatorFactory;
    exports.ɵe = TextValidatorFactory;
    exports.ɵa = AbstractInput;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWlucHV0LW1zZy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW1zZy1jb25maWcuc2VydmljZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtc3RvcmFnZS5zZXJ2aWNlLnRzIixudWxsLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9mcm9tLWV2ZW50LW1vY2sudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL21vZGVscy9hYnN0cmFjdC1pbnB1dC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbW9kZWxzL2lucHV0LXZhbGlkYXRvci50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtZW1haWwvZW1haWwtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9lbWFpbC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9udW1iZXItdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC1udW1iZXIvbnVtYmVyLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UudHMiLCJuZzovL25neC1pbnB1dC1tc2cvbGliL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9pbnB1dC10ZXh0L3RleHQtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtdGV4dC9pbnB1dC10ZXh0LmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvbGFiZWwvbGFiZWwuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtaW5wdXQtbXNnL2xpYi9tc2cvbXNnLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWlucHV0LW1zZy9saWIvaW5wdXQtbXNnLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGNvbmZpZ3VyYXRpb24gZm9yIGRpc3BsYXlpbmcgbWVzc2FnZXMuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZyA9IHtcclxuICAgIGNvbG9yczoge1xyXG4gICAgICBlcnJvcjogJyNmNDQzMzYnLFxyXG4gICAgICBtYXhsZW5ndGg6ICdncmV5J1xyXG4gICAgfSxcclxuICAgIHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnLFxyXG4gICAgbXNnOiB7XHJcbiAgICAgIGVtYWlsOiAobGFiZWw6IHN0cmluZykgPT4gYFdyb25nICR7bGFiZWx9YCxcclxuICAgICAgaW50ZWdlcjogJ0ZyYWN0aW9uYWwgZGlnaXRzIGFyZSBmb3JiaWRkZW4nLFxyXG4gICAgICBtYXg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBNYXhpbXVtIGFsbG93ZWQgJHtsYWJlbH0gaXMgJHthbGxvd2VkfWAsXHJcbiAgICAgIG1pbjogKGxhYmVsOiBzdHJpbmcsIGFsbG93ZWQ6IG51bWJlcikgPT4gYE1pbmltdW0gYWxsb3dlZCAke2xhYmVsfSBpcyAke2FsbG93ZWR9YCxcclxuICAgICAgbWF4bGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgTWF4aW11bSAke2FsbG93ZWR9IGNoYXJzIGxpbWl0IHdhcyByZWFjaGVkYCxcclxuICAgICAgbWlubGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgQXQgbGVhc3QgJHthbGxvd2VkfSBjaGFycyBsZW5ndGggYXJlIHJlcXVpcmVkYCxcclxuICAgICAgcGF0dGVybjogKGxhYmVsOiBzdHJpbmcpID0+IGBJbnZhbGlkICR7bGFiZWx9YCxcclxuICAgICAgcmVxdWlyZWQ6IChsYWJlbDogc3RyaW5nKSA9PiBgJHtsYWJlbH0gaXMgcmVxdWlyZWRgXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldCgpOiBpbnB1dE1zZy5Db25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdENvbmZpZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoY29uZmlnOiBpbnB1dE1zZy5Db25maWcpIHtcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5wb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgY29sb3JzXHJcbiAgICBpZiAoY29uZmlnLmNvbG9ycykge1xyXG4gICAgICBPYmplY3Qua2V5cyhjb25maWcuY29sb3JzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnNba2V5XSA9IGNvbmZpZy5jb2xvcnNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IG1zZ1xyXG4gICAgaWYgKCFjb25maWcubXNnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNvbmZpZy5tc2cpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5tc2dba2V5XSA9IGNvbmZpZy5tc2dba2V5XTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHV0aWxpdHkgc2VydmljZSBzdG9yZXMgaW5wdXQgZWxlbWVudCBwYXJhbXNcclxuICogZm9yIGNvbW11bmljYXRpb24gYmV0d2VlbiBuZ3hJbnB1dCBkaXJlY3RpdmUsXHJcbiAqIG5neC1tc2cgY29tcG9uZW50IGFuZCBuZ3hMYWJlbCBkaXJlY3RpdmUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdG9yYWdlQnlJZDoge1xyXG4gICAgW2lkOiBzdHJpbmddOiBpbnB1dE1zZy5JbnB1dFBhcmFtc1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgdGhpcyBzdG9yYWdlIGlzIHByb3ZpZGVkLCBiZWNhdXNlXHJcbiAgICogdXNlciBtaWdodCBzZXQgaWQgb3IgbmFtZSBhdHRyaWJ1dGUgdG9cclxuICAgKiB0aGUgaW5wdXQgZWxlbWVudCBvciBldmVuIGJvdGggb2YgdGhlbS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JhZ2VCeU5hbWU6IHtcclxuICAgIFtpZDogc3RyaW5nXTogaW5wdXRNc2cuSW5wdXRQYXJhbXNcclxuICB9ID0ge307XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBpbnB1dE1zZy5JbnB1dFBhcmFtcyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQnlJZFtrZXldIHx8IHRoaXMuc3RvcmFnZUJ5TmFtZVtrZXldO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW1vdmVGcm9tU3BlY2lmaWNTdG9yYWdlKCdzdG9yYWdlQnlJZCcsIGtleSk7XHJcbiAgICB0aGlzLnJlbW92ZUZyb21TcGVjaWZpY1N0b3JhZ2UoJ3N0b3JhZ2VCeU5hbWUnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChpbnB1dDogaW5wdXRNc2cuSW5wdXRQYXJhbXMsIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlQnlJZFtpZF0gPSBpbnB1dDtcclxuICAgIH1cclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZUJ5TmFtZVtuYW1lXSA9IGlucHV0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRnJvbVNwZWNpZmljU3RvcmFnZShzdG9yYWdlOiAnc3RvcmFnZUJ5SWQnIHwgJ3N0b3JhZ2VCeU5hbWUnLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzW3N0b3JhZ2VdW2tleV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHRoaXNbc3RvcmFnZV1ba2V5XTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCIvKipcclxuICogVGhpcyB0ZW1wb3Jhcnkgc3Vycm9nYXRlIHJlcGxhY2VzXHJcbiAqIG9yaWdpbmFsIHJ4anMgZnJvbUV2ZW50IGZ1bmN0aW9uXHJcbiAqIHRvIGhhbmRsZSByeGpzIHY1IHRvIHY2IG1pZ3JhdGlvbiBwcm9ibGVtLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZyb21FdmVudE1vY2sgPSAoZXZlbnRUYXJnZXQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogKCkgPT4gdm9pZCk6IHsgdW5zdWJzY3JpYmU6ICgpID0+IHZvaWQ7IH0gPT4ge1xyXG5cclxuICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxufTtcclxuIiwiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIE5nTW9kZWwsIE5nRm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbi8vIHJ4anMgdjUvdjYgY29tcGF0aWJsZVxyXG5pbXBvcnQgeyBmcm9tRXZlbnRNb2NrIH0gZnJvbSAnLi9mcm9tLWV2ZW50LW1vY2snO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG4vLyB0eXBlc1xyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBBbiBhYnN0cmFjdCBjbGFzcyB0byBiZSBkZXJpdmVkIGJ5XHJcbiAqIGEgY29uY3JldGUgaW5wdXQgZGlyZWN0aXZlIGNsYXNzLlxyXG4gKiBWYWxpZGF0ZXMgYW4gaW5wdXQgZWxlbWVudCBhbmQgZW1pdHNcclxuICogdGhlIHZhbGlkYXRpb24gc3RhdHVzIHRvIHRoZSBsaXN0ZW5lcnNcclxuICogKE1zZ0NvbXBvbmVudCwgTGFiZWxEaXJlY3RpdmUpXHJcbiAqIHRocm91Z2ggSW5wdXRTdG9yYWdlU2VydmljZS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdElucHV0IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBpZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBsYWJlbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXRJbnB1dDogJyc7XHJcbiAgQElucHV0KCkgcHVibGljIG1vZGVsOiBOZ01vZGVsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcHVibGljIHJlcXVpcmVkOiAnJyB8IGJvb2xlYW47XHJcblxyXG4gIHByb3RlY3RlZCBpbnB1dFBhcmFtczogaW5wdXRNc2cuSW5wdXRQYXJhbXM7XHJcbiAgLyoqXHJcbiAgICogQSBkaWN0aW9uYXJ5IHdpdGggY2FsbGJhY2tzIHRvIGdldCBjdXJyZW50IHZhbGlkYXRpb24gcGFyYW1zLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB2YWxpZGF0b3JPcHRpb25zOiB7IFtuYW1lOiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbUZuIH07XHJcblxyXG4gIHByaXZhdGUgZWxlbTogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGZvcm06IE5nRm9ybTtcclxuICBwcml2YXRlIGlucHV0S2V5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBpc01hdGVyaWFsOiBib29sZWFuO1xyXG4gIC8qKlxyXG4gICAqIENvbnRhaW5zIHRydWUgaWYgdGhlIHByZXZvaXVzIGlucHV0IHN0YXRlIHdhcyB2YWxpZC5cclxuICAgKi9cclxuICBwcml2YXRlIHByZXZWYWxpZDogYm9vbGVhbjtcclxuICBwcml2YXRlIHN0YXR1c1N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmFsaWRhdGlvbiBwYXJhbXMgb2YgdGhlIGlucHV0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSB2YWxpZGF0b3JQYXJhbXM6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW107XHJcbiAgcHJpdmF0ZSB2YWxpZGF0b3I6IGlucHV0TXNnLklucHV0VmFsaWRhdG9yO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRWYWxpZGF0b3JGYWN0b3J5OiBpbnB1dE1zZy5JbnB1dFZhbGlkYXRvckZhY3RvcnlcclxuICApIHsgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcDogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VhYmxlUHJvcHMgPSB7XHJcbiAgICAgIHBsYWNlaG9sZGVyOiB0cnVlLFxyXG4gICAgICBsYWJlbDogdHJ1ZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZm9yRWFjaCgobmFtZSkgPT4ge1xyXG4gICAgICBpZiAoIWNoYW5nZWFibGVQcm9wc1tuYW1lXSB8fFxyXG4gICAgICAgICF0aGlzLnZhbGlkYXRvck9wdGlvbnNbbmFtZV0gfHxcclxuICAgICAgICBjaGFuZ2VzW25hbWVdLmlzRmlyc3RDaGFuZ2UoKVxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChuYW1lID09PSAncGxhY2Vob2xkZXInIHx8IG5hbWUgPT09ICdsYWJlbCcpIHtcclxuICAgICAgICB0aGlzLmlucHV0UGFyYW1zLmxhYmVsID0gY2hhbmdlc1tuYW1lXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy5wYXJhbUNoYW5nZS5uZXh0KCdsYWJlbCcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRWYWxpZGF0aW9uUGFyYW1zKCk7XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMucGFyYW1DaGFuZ2UubmV4dChuYW1lIGFzIGlucHV0TXNnLlZhbGlkYXRvck5hbWUpO1xyXG4gICAgICB0aGlzLmNyZWF0ZVZhbGlkYXRvcigpO1xyXG4gICAgICB0aGlzLm1vZGVsLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0YXR1c09mZigpO1xyXG4gICAgdGhpcy5pbnB1dFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSh0aGlzLmlucHV0S2V5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLmVsZW0gPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMuaXNNYXRlcmlhbCA9IHRoaXMubWF0SW5wdXQgPT09ICcnO1xyXG4gICAgdGhpcy5pbnB1dEtleSA9IHRoaXMuaWQgfHwgdGhpcy5uYW1lO1xyXG5cclxuICAgIHRoaXMuY2hlY2tSZXF1aXJlZFBhcmFtcygpO1xyXG5cclxuICAgIHRoaXMuc2V0TWF0Rm9ybUZpZWxkQ2xhc3MoKTtcclxuXHJcbiAgICB0aGlzLmluaXRJbnB1dFBhcmFtcygpO1xyXG4gICAgdGhpcy5zZXRWYWxpZGF0aW9uUGFyYW1zKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVZhbGlkYXRvcigpO1xyXG4gICAgdGhpcy5pbnB1dFN0b3JhZ2VTZXJ2aWNlLnNldCh0aGlzLmlucHV0UGFyYW1zLCB0aGlzLmlkLCB0aGlzLm5hbWUpO1xyXG5cclxuICAgIC8vIFdhaXQgdGlsbCBOZ0Zvcm0gd2lsbCBiZSBpbml0aWFsaXplZFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9ybSA9IHRoaXMubW9kZWwuZm9ybURpcmVjdGl2ZSBhcyBOZ0Zvcm07XHJcbiAgICAgIGlmICghdGhpcy5mb3JtKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBuZ3hJbnB1dCBkaXJlY3RpdmU6IHRoZSBlbGVtZW50IHdpdGggbmFtZT1cIiR7dGhpcy5uYW1lfVwiIGhhdmUgdG8gYmUgaW5zaWRlIGEgPGZvcm0+IGVsZW1lbnRgKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXR1c09uKCk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBhbnkgfSB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGNvbnRyb2wpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhc0Jvb2xhZW5QYXJhbShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzW25hbWVdID09PSAnJyB8fCB0aGlzW25hbWVdID09PSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGhhc051bWJlclBhcmFtKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc05hTih0aGlzW25hbWVdKSAmJiBpc0Zpbml0ZSh0aGlzW25hbWVdKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2hlY2tSZXF1aXJlZFBhcmFtcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5uYW1lKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4SW5wdXQgZGlyZWN0aXZlOiBjYW5cXCd0IGZpbmQgbmFtZSBhdHRyaWJ1dGUgb24gdGhlIGVsZW1lbnRgKTtcclxuICAgIH1cclxuICAgIGlmICghKHRoaXMubW9kZWwgaW5zdGFuY2VvZiBOZ01vZGVsKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neElucHV0IGRpcmVjdGl2ZTogTmdNb2RlbCBpbnN0YW5jZSBoYXZlIHRvIGJlIHByb3ZpZGVkIHRvIFttb2RlbF0gcGFyYW0gb2YgdGhlIGVsZW1lbnRgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlVmFsaWRhdG9yKCk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IHZhbGlkYXRvcnM6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0gPSB7fTtcclxuICAgIHRoaXMudmFsaWRhdG9yUGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xyXG4gICAgICB2YWxpZGF0b3JzW3BhcmFtLm5hbWVdID0gcGFyYW07XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnZhbGlkYXRvciA9IHRoaXMuaW5wdXRWYWxpZGF0b3JGYWN0b3J5LmNyZWF0ZSh2YWxpZGF0b3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdElucHV0UGFyYW1zKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuaW5wdXRQYXJhbXMgPSB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnBsYWNlaG9sZGVyIHx8IHRoaXMubGFiZWwsXHJcbiAgICAgIG1hdGVyaWFsOiB0aGlzLmlzTWF0ZXJpYWwsXHJcbiAgICAgIHBhcmFtQ2hhbmdlOiBuZXcgU3ViamVjdCgpLFxyXG4gICAgICBzdGF0dXM6IG5ldyBCZWhhdmlvclN1YmplY3QoJ3ByaXN0aW5lJyBhcyBpbnB1dE1zZy5JbnB1dFN0YXR1cyksXHJcbiAgICAgIHZhbGlkOiBuZXcgQmVoYXZpb3JTdWJqZWN0KHRydWUpLFxyXG4gICAgICB2YWxpZGF0aW9uUGFyYW1zOiB1bmRlZmluZWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzICduZ3gtbXNnX19tYXQtZm9ybS1maWVsZCdcclxuICAgKiBpZiBtYXRJbnB1dCBkaXJlY3RpdmUgd2FzIHNldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc2V0TWF0Rm9ybUZpZWxkQ2xhc3MoKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzTWF0ZXJpYWwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW5wdXQgPSB0aGlzLmVsZW1SZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgbGV0IHBhcmVudDogSFRNTEVsZW1lbnQgPSBpbnB1dC5wYXJlbnRFbGVtZW50O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgICBpZiAocGFyZW50LnRhZ05hbWUgPT09ICdNQVQtRk9STS1GSUVMRCcpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgaWYgKGkgPT09IDkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25neElucHV0IGRpcmVjdGl2ZTogQ2FuXFwndCBmaW5kIHBhcmVudCA8bWF0LWZvcm0tZmllbGQ+IGVsZW0nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ25neC1tc2dfX21hdC1mb3JtLWZpZWxkJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGN1cnJlbnQgdmFsaWRhdGlvbiBwYXJhbXMgb24gaW5pdCBvciBvbiBjaGFuZ2VzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRWYWxpZGF0aW9uUGFyYW1zKCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcyA9IHt9O1xyXG4gICAgdGhpcy52YWxpZGF0b3JQYXJhbXMgPSBbXTtcclxuXHJcbiAgICBpZiAodGhpcy5oYXNCb29sYWVuUGFyYW0oJ3JlcXVpcmVkJykpIHtcclxuICAgICAgY29uc3QgcmVxdWlyZWRQYXJhbTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gPSB7XHJcbiAgICAgICAgbmFtZTogJ3JlcXVpcmVkJyxcclxuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIHNldDogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXMucmVxdWlyZWQgPSByZXF1aXJlZFBhcmFtO1xyXG4gICAgICB0aGlzLnZhbGlkYXRvclBhcmFtcy5wdXNoKHJlcXVpcmVkUGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIE9iamVjdC5rZXlzKHRoaXMudmFsaWRhdG9yT3B0aW9ucykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgY29uc3QgcGFyYW06IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtID0gdGhpcy52YWxpZGF0b3JPcHRpb25zW25hbWVdKCk7XHJcbiAgICAgIGlmIChwYXJhbS5zZXQpIHtcclxuICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXNbbmFtZV0gPSBwYXJhbTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvclBhcmFtcy5wdXNoKHBhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wcyBnZW5lcmF0aW5nIHRoZSBpbnB1dCBzdGF0dXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXR1c09mZigpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWIpID0+IHtcclxuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBnZW5lcmF0aW5nIHRoZSBpbnB1dCBzdGF0dXNcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXR1c09uKCk6IHZvaWQge1xyXG5cclxuICAgIC8vIEVtaXRzIGFuIGVycm9yIHN0YXR1cyBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZC5cclxuICAgIGNvbnN0IGVtaXRFcnJvclN0YXR1cyA9ICgpOiB2b2lkID0+IHtcclxuICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiB0aGlzLnZhbGlkYXRvclBhcmFtcykge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsLmhhc0Vycm9yKHBhcmFtLm5hbWUpKSB7XHJcbiAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnZhbGlkLm5leHQoZmFsc2UpO1xyXG4gICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy5zdGF0dXMubmV4dChwYXJhbS5uYW1lKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZW1pdEVycm9yU3RhdHVzT25Ub3VjaGVkID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tb2RlbC50b3VjaGVkIHx8IHRoaXMuZm9ybS5zdWJtaXR0ZWQpIHtcclxuICAgICAgICBlbWl0RXJyb3JTdGF0dXMoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBlbWl0VmFsaWRBbmRQcmlzdGluZVN0YXR1cyA9IChzdGF0dXM6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgIGNhc2UgJ0lOVkFMSUQnOlxyXG4gICAgICAgICAgdGhpcy5wcmV2VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1ZBTElEJzpcclxuICAgICAgICAgIGlmICghdGhpcy5wcmV2VmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy52YWxpZC5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCd2YWxpZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5wcmV2VmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnUFJJU1RJTkUnOlxyXG4gICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy52YWxpZC5uZXh0KHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy5zdGF0dXMubmV4dCgncHJpc3RpbmUnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYmx1clN1YiA9IGZyb21FdmVudE1vY2sodGhpcy5lbGVtLCAnYmx1cicsIGVtaXRFcnJvclN0YXR1c09uVG91Y2hlZCk7XHJcbiAgICB0aGlzLnN0YXR1c1N1YnNjcmlwdGlvbnMucHVzaChibHVyU3ViIGFzIFN1YnNjcmlwdGlvbik7XHJcblxyXG4gICAgY29uc3QgY29udHJvbFZhbHVlU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLm1vZGVsLnZhbHVlQ2hhbmdlc1xyXG4gICAgICAuc3Vic2NyaWJlKGVtaXRFcnJvclN0YXR1c09uVG91Y2hlZCk7XHJcbiAgICB0aGlzLnN0YXR1c1N1YnNjcmlwdGlvbnMucHVzaChjb250cm9sVmFsdWVTdWIpO1xyXG5cclxuICAgIGNvbnN0IGZvcm1TdWJtaXRTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuZm9ybS5uZ1N1Ym1pdFxyXG4gICAgICAuc3Vic2NyaWJlKGVtaXRFcnJvclN0YXR1cyk7XHJcbiAgICB0aGlzLnN0YXR1c1N1YnNjcmlwdGlvbnMucHVzaChmb3JtU3VibWl0U3ViKTtcclxuXHJcbiAgICBjb25zdCBjb250cm9sU3RhdHVzU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLm1vZGVsLnN0YXR1c0NoYW5nZXNcclxuICAgICAgLnN1YnNjcmliZShlbWl0VmFsaWRBbmRQcmlzdGluZVN0YXR1cyk7XHJcbiAgICB0aGlzLnN0YXR1c1N1YnNjcmlwdGlvbnMucHVzaChjb250cm9sU3RhdHVzU3ViKTtcclxuXHJcbiAgICAvLyBBZGRzL3JlbW92ZXMgJ25neC1pbnB1dF9pbnZhbGlkJyBjbGFzcyB0byB0aGUgaW5wdXRcclxuICAgIGNvbnN0IHRvZ2dsZUNsYXNzT25WYWxpZENoYW5nZSA9ICh2YWxpZDogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAodmFsaWQpIHtcclxuICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbmd4LWlucHV0X2ludmFsaWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCgnbmd4LWlucHV0X2ludmFsaWQnKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHZhbGlkU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0UGFyYW1zLnZhbGlkXHJcbiAgICAgIC5zdWJzY3JpYmUodG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlKTtcclxuICAgIHRoaXMuc3RhdHVzU3Vic2NyaXB0aW9ucy5wdXNoKHZhbGlkU3ViKTtcclxuXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnB1dFZhbGlkYXRvciBpbXBsZW1lbnRzIGlucHV0TXNnLklucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIGF2YWlsYWJsZSB2YWxpZGF0b3JzIGZvciBzcGVjaWZpYyBpbnB1dCB0eXBlXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGF2YWlsYWJsZVZhbGlkYXRvcnM6IHsgW25hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvckZuPGFueT4gfTtcclxuICAvKipcclxuICAgKiBUaGUgc2VxdWVuY2Ugb2YgdmFsaWRhdG9yIG5hbWVzIHRvIHZhbGlkYXRlIGFuIGlucHV0IGVsZW1lbnQgd2l0aC5cclxuICAgKiBWYWxpZGF0b3JzIGFyZSBhcHBsaWVkIG9uZSBieSBvbmUuXHJcbiAgICogQGV4YW1wbGUgWydyZXF1aXJlZCcsICdtaW5sZW5naHQnLCAnbWF4bGVuZ3RoJywgJ3BhdHRlcm4nXVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB2YWxpZGF0b3JTZXF1ZW5jZTogc3RyaW5nW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmFsaWRhdG9ycyBhcHBsaWVkIHRvIHRoZSBzcGVjaWZpYyBpbnB1dCBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjdXJyZW50VmFsaWRhdG9yczogaW5wdXRNc2cuVmFsaWRhdG9yQ29uZmlnPGFueT5bXTtcclxuXHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBhbnkgfSB8IG51bGwge1xyXG5cclxuICAgIGxldCByZXN1bHQ6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCA9IG51bGw7XHJcbiAgICBmb3IgKGNvbnN0IHZhbGlkYXRvciBvZiB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzKSB7XHJcbiAgICAgIHJlc3VsdCA9IHZhbGlkYXRvci5mbihjb250cm9sLnZhbHVlLCB2YWxpZGF0b3IudmFsdWUpO1xyXG4gICAgICAvLyBicmVhayBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJvdGVjdGVkIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseTogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IHZvaWQge1xyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0VmFsaWRhdG9yIGNsYXNzOiB0aGlzLmF2YWlsYWJsZVZhbGlkYXRvcnMgaGF2ZSB0byBiZSBpbml0aWFsaXplZCBpbiB0aGUgZGVyaXZlZCBjbGFzcycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsaWRhdG9yU2VxdWVuY2UpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRWYWxpZGF0b3IgY2xhc3M6IHRoaXMudmFsaWRhdG9yU2VxdWVuY2UgaGF2ZSB0byBiZSBpbml0aWFsaXplZCBpbiB0aGUgZGVyaXZlZCBjbGFzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9ycy5yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzID0gW107XHJcbiAgICBjb25zdCBwYXJhbVNlcXVlbmNlID0gdGhpcy5nZXRWYWxpZGF0b3JQYXJhbVNlcXVlbmNlKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICAgIHBhcmFtU2VxdWVuY2UuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbmZpZzogaW5wdXRNc2cuVmFsaWRhdG9yQ29uZmlnPGFueT4gPSB7XHJcbiAgICAgICAgbmFtZTogcGFyYW0ubmFtZSxcclxuICAgICAgICB2YWx1ZTogcGFyYW0udmFsdWUsXHJcbiAgICAgICAgc2V0OiBwYXJhbS5zZXQsXHJcbiAgICAgICAgZm46IHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9yc1twYXJhbS5uYW1lXVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzLnB1c2goY29uZmlnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgc2VxdWVuY2Ugb2YgY29uZmlncyBvZiB2YWxpZGF0b3JzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRWYWxpZGF0b3JQYXJhbVNlcXVlbmNlPFQ+KHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbVtdIHtcclxuXHJcbiAgICBjb25zdCBjb25maWc6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW10gPSBbXTtcclxuICAgIHRoaXMudmFsaWRhdG9yU2VxdWVuY2UuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgaWYgKHZhbGlkYXRvcnNUb0FwcGx5W25hbWVdKSB7XHJcbiAgICAgICAgY29uZmlnLnB1c2godmFsaWRhdG9yc1RvQXBwbHlbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0aW9uIGZ1bmN0aW9uIHRvIGJlIHVzZWQgd2l0aCBhbiBhbnkgdHlwZSBvZiBhbiBpbnB1dCBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXF1aXJlZCh2YWx1ZTogc3RyaW5nKTogeyByZXF1aXJlZDogdHJ1ZSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eSh2YWx1ZSkgPyB7IHJlcXVpcmVkOiB0cnVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yIGV4dGVuZHMgSW5wdXRWYWxpZGF0b3Ige1xyXG5cclxuICBwcm90ZWN0ZWQgYXZhaWxhYmxlVmFsaWRhdG9ycyA9IHtcclxuICAgIGVtYWlsOiB0aGlzLmVtYWlsXHJcbiAgfTtcclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yU2VxdWVuY2UgPSBbJ3JlcXVpcmVkJywgJ2VtYWlsJ107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0Q3VycmVudFZhbGlkYXRvcnModmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbWFpbCh2YWx1ZTogc3RyaW5nKTogeyBlbWFpbDogc3RyaW5nIH0gfCBudWxsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdlIHNob3VsZCBza2lwIHRoZSB2YWxpZGF0aW9uIGZvciBlbXB0eSB2YWx1ZXMuXHJcbiAgICAgKiBDb25zaWRlciB0aGUgY2FzZSB3aGVuIGEgY2xpZW50IHNldHMgYW4gb3B0aW9uYWxcclxuICAgICAqIGVtYWlsIGlucHV0IHRoYXQgc2hvdWxkIGJlIHZhbGlkYXRlZFxyXG4gICAgICogb25seSBpZiBhIHVzZXIgaW5wdXRzIHNvbWUgdGV4dC5cclxuICAgICAqL1xyXG4gICAgaWYgKHN1cGVyLmVtcHR5KHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBlbWFpbDogbnVsbCB9O1xyXG4gICAgfVxyXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NjE1NS92YWxpZGF0ZS1lbWFpbC1hZGRyZXNzLWluLWphdmFzY3JpcHRcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuICAgIGNvbnN0IHJlZ0V4cCA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG4gICAgY29uc3QgaXNWYWxpZDogYm9vbGVhbiA9IHJlZ0V4cC50ZXN0KHZhbHVlKTtcclxuXHJcbiAgICByZXR1cm4gaXNWYWxpZCA/IG51bGwgOiB7IGVtYWlsOiB2YWx1ZSB9O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgRW1haWxWYWxpZGF0b3IgfSBmcm9tICcuL2VtYWlsLXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yRmFjdG9yeSBpbXBsZW1lbnRzIGlucHV0TXNnLklucHV0VmFsaWRhdG9yRmFjdG9yeSB7XHJcblxyXG4gIHB1YmxpYyBjcmVhdGUodmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IEVtYWlsVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgRW1haWxWYWxpZGF0b3IodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBYnN0cmFjdElucHV0IH0gZnJvbSAnLi4vbW9kZWxzL2Fic3RyYWN0LWlucHV0JztcclxuaW1wb3J0IHsgRW1haWxWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi9lbWFpbC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0RW1haWxdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgdXNlRXhpc3Rpbmc6IElucHV0RW1haWxEaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgRW1haWxWYWxpZGF0b3JGYWN0b3J5XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRFbWFpbERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQge1xyXG5cclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICAgIGVtYWlsOiAoKSA9PiB7XHJcbiAgICAgIC8vIFRoZSBlbWFpbCB2YWxpZGF0b3IgaXMgYWx3YXlzIHNldCBieSBkZWZhdWx0XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ2VtYWlsJyxcclxuICAgICAgICBzZXQ6IHRydWVcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogRW1haWxWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IElucHV0VmFsaWRhdG9yIH0gZnJvbSAnLi4vbW9kZWxzL2lucHV0LXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXJWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIHByb3RlY3RlZCBhdmFpbGFibGVWYWxpZGF0b3JzID0ge1xyXG4gICAgaW50ZWdlcjogdGhpcy5pbnRlZ2VyLmJpbmQodGhpcyksXHJcbiAgICBtYXg6IHRoaXMubWF4LmJpbmQodGhpcyksXHJcbiAgICBtaW46IHRoaXMubWluLmJpbmQodGhpcylcclxuICB9O1xyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JTZXF1ZW5jZSA9IFsncmVxdWlyZWQnLCAnaW50ZWdlcicsICdtaW4nLCAnbWF4J107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9XHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0Q3VycmVudFZhbGlkYXRvcnModmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbnRlZ2VyKHZhbHVlOiBudW1iZXIpOiB7IGludGVnZXI6IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgaW50ZWdlcjogJ05vdCBhIG51bWJlcicgfTtcclxuICAgIH1cclxuICAgIGNvbnN0IGludGVnZXI6IGJvb2xlYW4gPSBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XHJcbiAgICByZXR1cm4gaW50ZWdlciA/IG51bGwgOiB7IGludGVnZXI6IHZhbHVlIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1heCh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IHsgbWF4OiBhbnkgfSB8IG51bGwge1xyXG5cclxuICAgIGlmICghdGhpcy5udW1iZXIodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB7IG1heDogJ05vdCBhIG51bWJlcicgfTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA+IG1heCkge1xyXG4gICAgICBjb25zdCBlcnJvciA9IHtcclxuICAgICAgICBtYXg6IHZhbHVlID09PSAwID8gJzAnIDogdmFsdWVcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1pbih2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlcik6IHsgbWluOiBhbnkgfSB8IG51bGwge1xyXG5cclxuICAgIGlmICghdGhpcy5udW1iZXIodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB7IG1pbjogJ05vdCBhIG51bWJlcicgfTtcclxuICAgIH1cclxuICAgIGlmICh2YWx1ZSA8IG1pbikge1xyXG4gICAgICBjb25zdCBlcnJvciA9IHtcclxuICAgICAgICBtaW46IHZhbHVlID09PSAwID8gJzAnIDogdmFsdWVcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG51bWJlcihhcmc6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KGFyZykpICYmIGlzRmluaXRlKGFyZyk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL251bWJlci12YWxpZGF0b3InO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5IGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3JGYWN0b3J5IHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZSh2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogTnVtYmVyVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgTnVtYmVyVmFsaWRhdG9yKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEFic3RyYWN0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvYWJzdHJhY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTnVtYmVyVmFsaWRhdG9yRmFjdG9yeSB9IGZyb20gJy4vbnVtYmVyLXZhbGlkYXRvci1mYWN0b3J5LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hJbnB1dE51bWJlcl1bdHlwZT1cIm51bWJlclwiXScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBJbnB1dE51bWJlckRpcmVjdGl2ZSxcclxuICAgICAgbXVsdGk6IHRydWVcclxuICAgIH0sXHJcbiAgICBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXROdW1iZXJEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdElucHV0IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIGludGVnZXI6ICcnIHwgYm9vbGVhbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWF4OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIG1pbjogc3RyaW5nIHwgbnVtYmVyO1xyXG5cclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICAgIGludGVnZXI6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnaW50ZWdlcicsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNCb29sYWVuUGFyYW0oJ2ludGVnZXInKVxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1heDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtYXgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21heCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5tYXhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtaW46ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnbWluJyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc051bWJlclBhcmFtKCdtaW4nKSxcclxuICAgICAgICB2YWx1ZTogK3RoaXMubWluXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByb3RlY3RlZCBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvckZhY3Rvcnk6IE51bWJlclZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyAndGV4dCcgbGlrZSBpbnB1dCBlbGVtZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5vdGUsICdtaW5sZW5ndGgnIGFuZCAnbWF4bGVuZ3RoJyB2YWxpZGF0b3JzXHJcbiAgICogYXJlIGFscmVhZHkgc3VwcG9ydGVkIGJ5IEFuZ3VsYXIgTmdGb3JtLCBidXRcclxuICAgKiB3ZSBzaG91bGQgZW1wbGVtZW50IHRoZW0gdG8gc3RvcCB0aGUgdmFsaWRhdGlvblxyXG4gICAqIHByb2Nlc3Mgd2hlbiB0aGUgZmlyc3QgdmFsaWRhdG9yIGZhaWxzLlxyXG4gICAqIFNlZTogSW5wdXRWYWxpZGF0b3IudmFsaWRhdGUoKSBpbXBsZW1lbnRhdGlvbi5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYXZhaWxhYmxlVmFsaWRhdG9ycyA9IHtcclxuICAgIG1heGxlbmd0aDogdGhpcy5tYXhsZW5ndGgsXHJcbiAgICBtaW5sZW5ndGg6IHRoaXMubWlubGVuZ3RoLFxyXG4gICAgcGF0dGVybjogdGhpcy5wYXR0ZXJuXHJcbiAgfTtcclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yU2VxdWVuY2UgPSBbJ3JlcXVpcmVkJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHN1cGVyLnNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4bGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1heDogbnVtYmVyKTogeyBtYXhsZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcbiAgICBpZiAoc3VwZXIuZW1wdHkodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IG1heCA/IHsgbWF4bGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWlubGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1pbjogbnVtYmVyKTogeyBtaW5sZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7IG1pbmxlbmd0aDogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IG1pbiA/IHsgbWlubGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGF0dGVybih2YWx1ZTogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHsgcGF0dGVybjogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgcGF0dGVybjogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ0V4cC50ZXN0KHZhbHVlKSA/IG51bGwgOiB7IHBhdHRlcm46IHZhbHVlIH07XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUZXh0VmFsaWRhdG9yIH0gZnJvbSAnLi90ZXh0LXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFRleHRWYWxpZGF0b3JGYWN0b3J5IGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3JGYWN0b3J5IHtcclxuXHJcbiAgcHVibGljIGNyZWF0ZSh2YWxpZGF0b3JzVG9BcHBseTogeyBba2V5OiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogVGV4dFZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gbmV3IFRleHRWYWxpZGF0b3IodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFic3RyYWN0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvYWJzdHJhY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGV4dFZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL3RleHQtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0VGV4dF0sIHRleHRhcmVhW25neElucHV0VGV4dF0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIFRleHRWYWxpZGF0b3JGYWN0b3J5XHJcbiAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0VGV4dERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1heGxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5sZW5ndGg6IHN0cmluZyB8IG51bWJlcjtcclxuICBASW5wdXQoKSBwdWJsaWMgcGF0dGVybjogUmVnRXhwO1xyXG5cclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICAgIG1heGxlbmd0aDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtYXhsZW5ndGgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21heGxlbmd0aCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5tYXhsZW5ndGhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtaW5sZW5ndGg6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnbWlubGVuZ3RoJyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc051bWJlclBhcmFtKCdtaW5sZW5ndGgnKSxcclxuICAgICAgICB2YWx1ZTogK3RoaXMubWlubGVuZ3RoXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgcGF0dGVybjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdwYXR0ZXJuJyxcclxuICAgICAgICBzZXQ6IHRoaXMucGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCxcclxuICAgICAgICB2YWx1ZTogdGhpcy5wYXR0ZXJuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByb3RlY3RlZCBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvckZhY3Rvcnk6IFRleHRWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xyXG4gICAgdGhpcy5tYXhMZW5ndGhPZmYoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25Jbml0KCk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRNYXhMZW5ndGhTdGF0dXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5tb2RlbC52YWx1ZS5sZW5ndGggPT09ICt0aGlzLm1heGxlbmd0aCkge1xyXG4gICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCdtYXhsZW5ndGgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdlbmVyYXRpbmcgJ21heGxlbmd0aCcgc3RhdHVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhPZmYoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5tYXhMZW5ndGhTdWIpIHtcclxuICAgICAgdGhpcy5tYXhMZW5ndGhTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBnZW5lcmF0aW5nICdtYXhsZW5ndGgnIHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbWF4TGVuZ3RoT24oKTogdm9pZCB7XHJcbiAgICBpZiAoc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21heGxlbmd0aCcpICYmICF0aGlzLm1heExlbmd0aFN1Yikge1xyXG4gICAgICB0aGlzLm1heExlbmd0aFN1YiA9IHRoaXMubW9kZWwudmFsdWVDaGFuZ2VzXHJcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLmVtaXRNYXhMZW5ndGhTdGF0dXMuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMvcmVtb3ZlcyAnbmd4LWlucHV0X2ludmFsaWQnIGNzcyBjbGFzc1xyXG4gKiB3aGVuIGlucHV0IHN0YXR1cyBjaGFuZ2VzXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tuZ3hMYWJlbF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYWJlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqXHJcbiAgICogaW5wdXQgZWxlbWVudCBpZCBvciBuYW1lXHJcbiAgICovXHJcbiAgQElucHV0KCkgcHVibGljIGZvcjogc3RyaW5nO1xyXG5cclxuICBwcml2YXRlIGVsZW06IEhUTUxMYWJlbEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBoaWdobGlnaHRDb2xvcjogc3RyaW5nO1xyXG4gIHByaXZhdGUgdmFsaWQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IElucHV0TXNnQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnZhbGlkICYmIHRoaXMudmFsaWQudW5zdWJzY3JpYmUpIHtcclxuICAgICAgdGhpcy52YWxpZC51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZWxlbSA9IHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5oaWdobGlnaHRDb2xvciA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoKS5jb2xvcnMuZXJyb3I7XHJcblxyXG4gICAgaWYgKCF0aGlzLmZvcikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25neExhYmVsIGRpcmVjdGl2ZTogXFwnZm9yXFwnIGF0dHJpYnV0ZSB3aXRoIGlucHV0IGlkIG9yIG5hbWUgaXMgcmVxdWlyZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRBbmltYXRpb24oKTtcclxuXHJcbiAgICAvLyBXYWl0IHRpbGwgdGhlIGlucHV0IGVsZW1lbnQgd2lsbCBiZSBpbml0aWFsaXplZC5cclxuICAgIC8vIFdlIHNob3VsZCB3YWl0IGluIGNhc2UgdGhlIGxhYmVsIGVsZW1lbnQgd2FzXHJcbiAgICAvLyBpbnNlcnRlZCBiZWZvcmUgdGhlIGlucHV0LlxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGlucHV0UGFyYW1zID0gdGhpcy5pbnB1dFN0b3JhZ2VTZXJ2aWNlLmdldCh0aGlzLmZvcik7XHJcbiAgICAgIGlmICghaW5wdXRQYXJhbXMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neExhYmVsIGRpcmVjdGl2ZTogY2FuXFwndCBmaW5kIHRoZSBpbnB1dCBlbGVtZW50IHdpdGggaWQgb3IgbmFtZTogJHt0aGlzLmZvcn1gKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy52YWxpZCA9IGlucHV0UGFyYW1zLnZhbGlkO1xyXG4gICAgICB0aGlzLnZhbGlkLnN1YnNjcmliZSgodmFsaWQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNsYXNzT25WYWxpZENoYW5nZSh2YWxpZCk7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRPblZhbGlkQ2hhbmdlKHZhbGlkKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZ2hsaWdodE9uVmFsaWRDaGFuZ2UodmFsaWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh2YWxpZCkge1xyXG4gICAgICB0aGlzLmVsZW0uc3R5bGUuY29sb3IgPSAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbS5zdHlsZS5jb2xvciA9IHRoaXMuaGlnaGxpZ2h0Q29sb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEFuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbS5zdHlsZS50cmFuc2l0aW9uID0gJ2NvbG9yIDI1MG1zIGVhc2UtaW4nO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0b2dnbGVDbGFzc09uVmFsaWRDaGFuZ2UodmFsaWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh2YWxpZCkge1xyXG4gICAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LnJlbW92ZSgnbmd4LWlucHV0X2ludmFsaWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRNc2dDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcblxyXG4vKipcclxuICogRGlzcGxheXMgYSBtZXNzYWdlIGZvciBhbiBpbnB1dCBlbGVtZW50XHJcbiAqIGRlcGVuZGluZyBvbiBpdGBzIHZhbGlkYXRpb24gc3RhdHVzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtbXNnJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZ3gtbXNnX19jb250YWluZXJcIiBcclxuICBbbmdDbGFzc109XCJnZXRDbGFzc2VzKClcIlxyXG4gIFtuZ1N0eWxlXT1cImdldFN0eWxlcygpXCJcclxuICA+XHJcblxyXG4gIDxzcGFuICpuZ0lmPVwiY3VycmVudE1zZ1wiIFtAbXNnQW5pbWF0aW9uXT5cclxuICAgIHt7Y3VycmVudE1zZ319XHJcbiAgPC9zcGFuPlxyXG5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5uZ3gtbXNnX19tYXQtZm9ybS1maWVsZHttYXJnaW4tYm90dG9tOjE2cHg7d2lkdGg6MTAwJX0ubmd4LW1zZ19fY29udGFpbmVye2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEycHg7bWluLWhlaWdodDoyMHB4O21hcmdpbi10b3A6M3B4fS5uZ3gtbXNnX21hdGVyaWFse21hcmdpbi10b3A6LTMzcHh9Lm5neC1tc2dfcG9zX2JvdHRvbS1sZWZ0e3RleHQtYWxpZ246bGVmdH0ubmd4LW1zZ19wb3NfYm90dG9tLXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9YF0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdtc2dBbmltYXRpb24nLCBbXHJcbiAgICAgIHN0YXRlKCdhY3RpdmUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1zZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBBbiBpbnB1dCBpZCBvciBuYW1lIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBmb3I6IHN0cmluZztcclxuICAvKipcclxuICAgKiBPcHRpb25hbCBwYXJhbXMgd2l0aCBjdXN0b20gbWVzc2FnZXNcclxuICAgKiB0byBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgb25lc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBlbWFpbDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIGludGVnZXI6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXhsZW5ndGg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW46IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5sZW5ndGg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgcG9zaXRpb246IGlucHV0TXNnLlBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcblxyXG4gIC8vIEN1cnJlbnRseSBzaG93biBtZXNzYWdlXHJcbiAgcHVibGljIGN1cnJlbnRNc2c6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBjdXJyZW50U3RhdHVzOiBpbnB1dE1zZy5JbnB1dFN0YXR1cztcclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZztcclxuICBwcml2YXRlIGlucHV0UGFyYW1zOiBpbnB1dE1zZy5JbnB1dFBhcmFtcztcclxuICAvKipcclxuICAgKiBBbGwgYXZhaWxhYmxlIG1lc3NhZ2VzIGNvcnJlc3BvbmRlZFxyXG4gICAqIHRvIHZhbGlkYXRpb24gcGFyYW1zIG9mIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWVzc2FnZXM6IGlucHV0TXNnLlJlc3VsdE1zZyA9IHt9O1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IElucHV0TXNnQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2xhc3NlcygpOiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH0ge1xyXG5cclxuICAgIGNvbnN0IHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgPSB0aGlzLnBvc2l0aW9uIHx8IHRoaXMuY29uZmlnU2VydmljZS5nZXQoKS5wb3NpdGlvbjtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICduZ3gtbXNnX3Bvc19ib3R0b20tbGVmdCc6IHBvc2l0aW9uID09PSAnYm90dG9tLWxlZnQnLFxyXG4gICAgICAnbmd4LW1zZ19wb3NfYm90dG9tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdib3R0b20tcmlnaHQnLFxyXG4gICAgICAnbmd4LW1zZ19jb2xvcl90b29sdGlwJzogdGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJyxcclxuICAgICAgJ25neC1tc2dfbWF0ZXJpYWwnOiB0aGlzLmlucHV0UGFyYW1zLm1hdGVyaWFsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0eWxlcygpOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcblxyXG4gICAgbGV0IGNvbG9yOiBzdHJpbmc7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICBjb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnMubWF4bGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29sb3IgPSB0aGlzLmRlZmF1bHRDb25maWcuY29sb3JzLmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgY29sb3I6IGNvbG9yIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcDogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VhYmxlUHJvcHMgPSB7XHJcbiAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICBpbnRlZ2VyOiB0cnVlLFxyXG4gICAgICBtYXg6IHRydWUsXHJcbiAgICAgIG1heGxlbmd0aDogdHJ1ZSxcclxuICAgICAgbWluOiB0cnVlLFxyXG4gICAgICBtaW5sZW5ndGg6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBpZiAoIWNoYW5nZWFibGVQcm9wc1tuYW1lXSB8fCBjaGFuZ2VzW25hbWVdLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UobmFtZSBhcyBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTtcclxuXHJcbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50TXNnIGlmIGl0IGhhcyBiZWVuIGNoYW5nZWRcclxuICAgICAgLy8gYW5kIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09IG5hbWUgJiYgbmFtZSAhPT0gJ21heGxlbmd0aCcpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW25hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0Q29uZmlnID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5mb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZ3hNc2cgY29tcG9uZW50OiBcXCdmb3JcXCcgcGFyYW1ldGVyIHdpdGggdGhlIGlucHV0IGlkIG9yIG5hbWUgbXVzdCBiZSBwcm92aWRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0UGFyYW1zID0gdGhpcy5zdG9yYWdlU2VydmljZS5nZXQodGhpcy5mb3IpO1xyXG4gICAgaWYgKCF0aGlzLmlucHV0UGFyYW1zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4TXNnIGNvbXBvbmVudDogY2FuXFwndCBmaW5kIHRoZSBpbnB1dCBlbGVtZW50IHdpdGggaWQgb3IgbmFtZTogJHt0aGlzLmZvcn1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgZGVmYXVsdCBvciBjdXN0b20gbWVzc2FnZXMgZm9yIGdpdmVuIHZhbGlkYXRpb24gcGFyYW1zXHJcbiAgICB0aGlzLnNldEFsbE1lc3NhZ2VzKCk7XHJcblxyXG4gICAgLy8gTGlzdGVuIHRvIHRoZSBpbnB1dCBzdGF0dXNcclxuICAgIGNvbnN0IHN0YXR1c1N1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dFBhcmFtcy5zdGF0dXNcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9uU3RhdHVzQ2hhbmdlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3RhdHVzU3ViKTtcclxuXHJcbiAgICAvLyBMaXN0ZW4gdG8gdGhlIGlucHV0IHBhcmFtcyBjaGFuZ2VcclxuICAgIGNvbnN0IGlucHV0UGFyYW1zQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0UGFyYW1zLnBhcmFtQ2hhbmdlXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5vbklucHV0UGFyYW1zQ2hhbmdlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goaW5wdXRQYXJhbXNDaGFuZ2VTdWIpO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlcyBtZXNzYWdlcyB3aGVuIGlucHV0IHBhcmFtcyBjaGFuZ2VcclxuICBwcml2YXRlIG9uSW5wdXRQYXJhbXNDaGFuZ2UoY2hhbmdlZFByb3BOYW1lOiAnbGFiZWwnIHwgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk6IHZvaWQge1xyXG5cclxuICAgIGlmIChjaGFuZ2VkUHJvcE5hbWUgPT09ICdsYWJlbCcpIHtcclxuICAgICAgdGhpcy5zZXRBbGxNZXNzYWdlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKGNoYW5nZWRQcm9wTmFtZSBhcyBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgY3VycmVudCBtc2cgaWYgdGhlIGlucHV0IGlzIGludmFsaWRcclxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdwcmlzdGluZScgfHxcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdHVzID09PSAndmFsaWQnIHx8XHJcbiAgICAgIHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ21heGxlbmd0aCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1t0aGlzLmN1cnJlbnRTdGF0dXNdO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlcyBjdXJyZW50U3RhdHVzIGFuZCBzaG93cy9oaWRlcyBjdXJyZW50TXNnXHJcbiAgcHJpdmF0ZSBvblN0YXR1c0NoYW5nZShzdGF0dXM6IGlucHV0TXNnLklucHV0U3RhdHVzKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gc3RhdHVzO1xyXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgY2FzZSAncHJpc3RpbmUnOlxyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9ICcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2YWxpZCc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gJyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1tzdGF0dXNdO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmN1cnJlbnRNc2cgPSAnJzsgfSwgMjAwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1tzdGF0dXNdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRBbGxNZXNzYWdlcygpOiB2b2lkIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcykuZm9yRWFjaCgobmFtZTogaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSkgPT4ge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UobmFtZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFNldHMgbWVzc2FnZSB0ZXh0IGZvciBhIGdpdmVuIHZhbGlkYXRpb24gcGFyYW1ldGVyLlxyXG4gIC8vIElmIGFwcHJvcHJpYXRlIG1lc3NhZ2UgZXhwcmVzc2lvbiBpcyBub3QgcHJvdmlkZWRcclxuICAvLyB0aHJvZ2ggQElucHV0KCkgYmluZGluZyAtIHRoZSBkZWZhdWx0IG9uZSBpcyB1c2VkIGluc3RlYWQuXHJcbiAgcHJpdmF0ZSBzZXRNZXNzYWdlKG5hbWU6IGlucHV0TXNnLlZhbGlkYXRvck5hbWUpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGVscGVyIHR5cGUgZ3VhcmRcclxuICAgIGNvbnN0IGlzRm4gPSAoYXJnOiBzdHJpbmcgfCBGdW5jdGlvbik6IGFyZyBpcyBpbnB1dE1zZy5Nc2dGbiA9PiB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBnZXQgc3BlY2lmaWMgb3IgZGVmYXVsdCBtc2dFeHByZXNzaW9uXHJcbiAgICBsZXQgbXNnRXhwcmVzc2lvbjogaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICBpZiAodHlwZW9mIHRoaXNbbmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG1zZ0V4cHJlc3Npb24gPSB0aGlzW25hbWVdIGFzIGlucHV0TXNnLk1zZ0ZuIHwgc3RyaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbXNnRXhwcmVzc2lvbiA9IHRoaXMuZGVmYXVsdENvbmZpZy5tc2dbbmFtZV0gYXMgaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGEgbWVzc2FnZSBnZW5lcmF0ZWQgYnkgTXNnRm4oKSBvciBhcyBhIHNpbWxlIHN0cmluZ1xyXG4gICAgaWYgKGlzRm4obXNnRXhwcmVzc2lvbikpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlc1tuYW1lXSA9IG1zZ0V4cHJlc3Npb24odGhpcy5pbnB1dFBhcmFtcy5sYWJlbCwgdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zW25hbWVdLnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZXNbbmFtZV0gPSBtc2dFeHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2lucHV0LW1zZy1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBJbnB1dEVtYWlsRGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJbnB1dE51bWJlckRpcmVjdGl2ZSB9IGZyb20gJy4vaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBJbnB1dFRleHREaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LXRleHQvaW5wdXQtdGV4dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBMYWJlbERpcmVjdGl2ZSB9IGZyb20gJy4vbGFiZWwvbGFiZWwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTXNnQ29tcG9uZW50IH0gZnJvbSAnLi9tc2cvbXNnLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIElucHV0RW1haWxEaXJlY3RpdmUsXHJcbiAgICBJbnB1dE51bWJlckRpcmVjdGl2ZSxcclxuICAgIElucHV0VGV4dERpcmVjdGl2ZSxcclxuICAgIExhYmVsRGlyZWN0aXZlLFxyXG4gICAgTXNnQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIElucHV0TXNnQ29uZmlnU2VydmljZSxcclxuICAgIElucHV0U3RvcmFnZVNlcnZpY2VcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIElucHV0RW1haWxEaXJlY3RpdmUsXHJcbiAgICBJbnB1dE51bWJlckRpcmVjdGl2ZSxcclxuICAgIElucHV0VGV4dERpcmVjdGl2ZSxcclxuICAgIExhYmVsRGlyZWN0aXZlLFxyXG4gICAgTXNnQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0TXNnTW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIk5nTW9kZWwiLCJTdWJqZWN0IiwiQmVoYXZpb3JTdWJqZWN0IiwidHNsaWJfMS5fX3ZhbHVlcyIsIklucHV0IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJEaXJlY3RpdmUiLCJOR19WQUxJREFUT1JTIiwiRWxlbWVudFJlZiIsIkNvbXBvbmVudCIsIlZpZXdFbmNhcHN1bGF0aW9uIiwidHJpZ2dlciIsInN0YXRlIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwiYW5pbWF0ZSIsIk5nTW9kdWxlIiwiQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztpQ0FVMkM7Z0JBQ3ZDLE1BQU0sRUFBRTtvQkFDTixLQUFLLEVBQUUsU0FBUztvQkFDaEIsU0FBUyxFQUFFLE1BQU07aUJBQ2xCO2dCQUNELFFBQVEsRUFBRSxhQUFhO2dCQUN2QixHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLFVBQUMsS0FBYSxJQUFLLE9BQUEsV0FBUyxLQUFPLEdBQUE7b0JBQzFDLE9BQU8sRUFBRSxpQ0FBaUM7b0JBQzFDLEdBQUcsRUFBRSxVQUFDLEtBQWEsRUFBRSxPQUFlLElBQUssT0FBQSxxQkFBbUIsS0FBSyxZQUFPLE9BQVMsR0FBQTtvQkFDakYsR0FBRyxFQUFFLFVBQUMsS0FBYSxFQUFFLE9BQWUsSUFBSyxPQUFBLHFCQUFtQixLQUFLLFlBQU8sT0FBUyxHQUFBO29CQUNqRixTQUFTLEVBQUUsVUFBQyxLQUFhLEVBQUUsT0FBZSxJQUFLLE9BQUEsYUFBVyxPQUFPLDZCQUEwQixHQUFBO29CQUMzRixTQUFTLEVBQUUsVUFBQyxLQUFhLEVBQUUsT0FBZSxJQUFLLE9BQUEsY0FBWSxPQUFPLCtCQUE0QixHQUFBO29CQUM5RixPQUFPLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxhQUFXLEtB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