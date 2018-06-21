/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InputValidator } from '../models/input-validator';
var EmailValidator = /** @class */ (function (_super) {
    tslib_1.__extends(EmailValidator, _super);
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
export { EmailValidator };
function EmailValidator_tsickle_Closure_declarations() {
    /** @type {?} */
    EmailValidator.prototype.availableValidators;
    /** @type {?} */
    EmailValidator.prototype.validatorSequence;
    /** @type {?} */
    EmailValidator.prototype.validatorsToApply;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1lbWFpbC9lbWFpbC12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJM0QsSUFBQTtJQUFvQywwQ0FBYztJQU9oRCx3QkFDVTtRQURWLFlBR0UsaUJBQU8sU0FFUjtRQUpTLHVCQUFpQixHQUFqQixpQkFBaUI7b0NBTks7WUFDOUIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLO1NBQ2xCO2tDQUM2QixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7UUFNakQsaUJBQU0sb0JBQW9CLGFBQUMsaUJBQWlCLENBQUMsQ0FBQzs7S0FDL0M7Ozs7O0lBRU8sOEJBQUs7Ozs7Y0FBQyxLQUFhOzs7Ozs7O1FBUXpCLEVBQUUsQ0FBQyxDQUFDLGlCQUFNLEtBQUssWUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3hCOzs7UUFHRCxxQkFBTSxNQUFNLEdBQUcsd0pBQXdKLENBQUM7UUFDeEsscUJBQU0sT0FBTyxHQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQzs7eUJBbEM3QztFQUlvQyxjQUFjLEVBaUNqRCxDQUFBO0FBakNELDBCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0VmFsaWRhdG9yIH0gZnJvbSAnLi4vbW9kZWxzL2lucHV0LXZhbGlkYXRvcic7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgcHJvdGVjdGVkIGF2YWlsYWJsZVZhbGlkYXRvcnMgPSB7XHJcbiAgICBlbWFpbDogdGhpcy5lbWFpbFxyXG4gIH07XHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvclNlcXVlbmNlID0gWydyZXF1aXJlZCcsICdlbWFpbCddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHN1cGVyLnNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1haWwodmFsdWU6IHN0cmluZyk6IHsgZW1haWw6IHN0cmluZyB9IHwgbnVsbCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXZSBzaG91bGQgc2tpcCB0aGUgdmFsaWRhdGlvbiBmb3IgZW1wdHkgdmFsdWVzLlxyXG4gICAgICogQ29uc2lkZXIgdGhlIGNhc2Ugd2hlbiBhIGNsaWVudCBzZXRzIGFuIG9wdGlvbmFsXHJcbiAgICAgKiBlbWFpbCBpbnB1dCB0aGF0IHNob3VsZCBiZSB2YWxpZGF0ZWRcclxuICAgICAqIG9ubHkgaWYgYSB1c2VyIGlucHV0cyBzb21lIHRleHQuXHJcbiAgICAgKi9cclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgZW1haWw6IG51bGwgfTtcclxuICAgIH1cclxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDYxNTUvdmFsaWRhdGUtZW1haWwtYWRkcmVzcy1pbi1qYXZhc2NyaXB0XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICBjb25zdCByZWdFeHAgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgIGNvbnN0IGlzVmFsaWQ6IGJvb2xlYW4gPSByZWdFeHAudGVzdCh2YWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIGlzVmFsaWQgPyBudWxsIDogeyBlbWFpbDogdmFsdWUgfTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==