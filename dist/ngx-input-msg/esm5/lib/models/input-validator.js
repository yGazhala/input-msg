/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            for (var _a = tslib_1.__values(this.currentValidators), _b = _a.next(); !_b.done; _b = _a.next()) {
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
 * @abstract
 */
export { InputValidator };
function InputValidator_tsickle_Closure_declarations() {
    /**
     * All available validators for specific input type
     * @type {?}
     */
    InputValidator.prototype.availableValidators;
    /**
     * The sequence of validator names to validate an input element with.
     * Validators are applied one by one.
     * \@example ['required', 'minlenght', 'maxlength', 'pattern']
     * @type {?}
     */
    InputValidator.prototype.validatorSequence;
    /**
     * The current validators applied to the specific input element
     * @type {?}
     */
    InputValidator.prototype.currentValidators;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUE7OztBQUFBOzs7Ozs7O0lBa0JTLGlDQUFROzs7O2NBQUMsT0FBd0I7UUFFdEMscUJBQUksTUFBTSxHQUE0QyxJQUFJLENBQUM7O1lBQzNELEdBQUcsQ0FBQyxDQUFvQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFBLGdCQUFBO2dCQUF6QyxJQUFNLFNBQVMsV0FBQTtnQkFDbEIsTUFBTSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUV0RCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxDQUFDO2lCQUNQO2FBQ0Y7Ozs7Ozs7OztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7SUFJTiw4QkFBSzs7OztJQUFmLFVBQWdCLEtBQVU7UUFDeEIsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7S0FDdkU7Ozs7O0lBRVMsNkNBQW9COzs7O0lBQTlCLFVBQStCLGlCQUF1RTtRQUF0RyxpQkFzQkM7UUFwQkMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLDRGQUE0RixDQUFDLENBQUM7U0FDL0c7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsMEZBQTBGLENBQUMsQ0FBQztTQUM3RztRQUVELElBQUksQ0FBQyxtQkFBbUIsZUFBWSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLHFCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4RSxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSztZQUN6QixxQkFBTSxNQUFNLEdBQWtDO2dCQUM1QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2dCQUNkLEVBQUUsRUFBRSxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUN6QyxDQUFDO1lBQ0YsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7S0FDSjs7Ozs7OztJQUtPLGtEQUF5Qjs7Ozs7O2NBQUksaUJBQTZEO1FBRWhHLHFCQUFNLE1BQU0sR0FBOEIsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQU1SLGlDQUFROzs7OztjQUFDLEtBQWE7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7O3lCQWxGekQ7SUFxRkMsQ0FBQTs7OztBQWpGRCwwQkFpRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBJbnB1dFZhbGlkYXRvciBpbXBsZW1lbnRzIGlucHV0TXNnLklucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQWxsIGF2YWlsYWJsZSB2YWxpZGF0b3JzIGZvciBzcGVjaWZpYyBpbnB1dCB0eXBlXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGF2YWlsYWJsZVZhbGlkYXRvcnM6IHsgW25hbWU6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvckZuPGFueT4gfTtcclxuICAvKipcclxuICAgKiBUaGUgc2VxdWVuY2Ugb2YgdmFsaWRhdG9yIG5hbWVzIHRvIHZhbGlkYXRlIGFuIGlucHV0IGVsZW1lbnQgd2l0aC5cclxuICAgKiBWYWxpZGF0b3JzIGFyZSBhcHBsaWVkIG9uZSBieSBvbmUuXHJcbiAgICogQGV4YW1wbGUgWydyZXF1aXJlZCcsICdtaW5sZW5naHQnLCAnbWF4bGVuZ3RoJywgJ3BhdHRlcm4nXVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB2YWxpZGF0b3JTZXF1ZW5jZTogc3RyaW5nW107XHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgdmFsaWRhdG9ycyBhcHBsaWVkIHRvIHRoZSBzcGVjaWZpYyBpbnB1dCBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjdXJyZW50VmFsaWRhdG9yczogaW5wdXRNc2cuVmFsaWRhdG9yQ29uZmlnPGFueT5bXTtcclxuXHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBhbnkgfSB8IG51bGwge1xyXG5cclxuICAgIGxldCByZXN1bHQ6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCA9IG51bGw7XHJcbiAgICBmb3IgKGNvbnN0IHZhbGlkYXRvciBvZiB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzKSB7XHJcbiAgICAgIHJlc3VsdCA9IHZhbGlkYXRvci5mbihjb250cm9sLnZhbHVlLCB2YWxpZGF0b3IudmFsdWUpO1xyXG4gICAgICAvLyBicmVhayBpZiB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgICBpZiAocmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJvdGVjdGVkIGVtcHR5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gbnVsbDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseTogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IHZvaWQge1xyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lucHV0VmFsaWRhdG9yIGNsYXNzOiB0aGlzLmF2YWlsYWJsZVZhbGlkYXRvcnMgaGF2ZSB0byBiZSBpbml0aWFsaXplZCBpbiB0aGUgZGVyaXZlZCBjbGFzcycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsaWRhdG9yU2VxdWVuY2UpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRWYWxpZGF0b3IgY2xhc3M6IHRoaXMudmFsaWRhdG9yU2VxdWVuY2UgaGF2ZSB0byBiZSBpbml0aWFsaXplZCBpbiB0aGUgZGVyaXZlZCBjbGFzcycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9ycy5yZXF1aXJlZCA9IHRoaXMucmVxdWlyZWQuYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzID0gW107XHJcbiAgICBjb25zdCBwYXJhbVNlcXVlbmNlID0gdGhpcy5nZXRWYWxpZGF0b3JQYXJhbVNlcXVlbmNlKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICAgIHBhcmFtU2VxdWVuY2UuZm9yRWFjaChwYXJhbSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbmZpZzogaW5wdXRNc2cuVmFsaWRhdG9yQ29uZmlnPGFueT4gPSB7XHJcbiAgICAgICAgbmFtZTogcGFyYW0ubmFtZSxcclxuICAgICAgICB2YWx1ZTogcGFyYW0udmFsdWUsXHJcbiAgICAgICAgc2V0OiBwYXJhbS5zZXQsXHJcbiAgICAgICAgZm46IHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9yc1twYXJhbS5uYW1lXVxyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLmN1cnJlbnRWYWxpZGF0b3JzLnB1c2goY29uZmlnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgc2VxdWVuY2Ugb2YgY29uZmlncyBvZiB2YWxpZGF0b3JzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZXRWYWxpZGF0b3JQYXJhbVNlcXVlbmNlPFQ+KHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH0pOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbVtdIHtcclxuXHJcbiAgICBjb25zdCBjb25maWc6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW10gPSBbXTtcclxuICAgIHRoaXMudmFsaWRhdG9yU2VxdWVuY2UuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgaWYgKHZhbGlkYXRvcnNUb0FwcGx5W25hbWVdKSB7XHJcbiAgICAgICAgY29uZmlnLnB1c2godmFsaWRhdG9yc1RvQXBwbHlbbmFtZV0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjb25maWc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWYWxpZGF0aW9uIGZ1bmN0aW9uIHRvIGJlIHVzZWQgd2l0aCBhbiBhbnkgdHlwZSBvZiBhbiBpbnB1dCBlbGVtZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXF1aXJlZCh2YWx1ZTogc3RyaW5nKTogeyByZXF1aXJlZDogdHJ1ZSB9IHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5lbXB0eSh2YWx1ZSkgPyB7IHJlcXVpcmVkOiB0cnVlIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbn1cclxuIl19