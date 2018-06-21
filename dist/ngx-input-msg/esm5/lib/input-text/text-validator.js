/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InputValidator } from '../models/input-validator';
/**
 * Validates 'text' like input element.
 */
var /**
 * Validates 'text' like input element.
 */
TextValidator = /** @class */ (function (_super) {
    tslib_1.__extends(TextValidator, _super);
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
 * Validates 'text' like input element.
 */
export { TextValidator };
function TextValidator_tsickle_Closure_declarations() {
    /**
     * Note, 'minlength' and 'maxlength' validators
     * are already supported by Angular NgForm, but
     * we should emplement them to stop the validation
     * process when the first validator fails.
     * See: InputValidator.validate() implementation.
     * @type {?}
     */
    TextValidator.prototype.availableValidators;
    /** @type {?} */
    TextValidator.prototype.validatorSequence;
    /** @type {?} */
    TextValidator.prototype.validatorsToApply;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5wdXQtbXNnLyIsInNvdXJjZXMiOlsibGliL2lucHV0LXRleHQvdGV4dC12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7QUFPM0Q7OztBQUFBO0lBQW1DLHlDQUFjO0lBZ0IvQyx1QkFDVTtRQURWLFlBR0UsaUJBQU8sU0FFUjtRQUpTLHVCQUFpQixHQUFqQixpQkFBaUI7Ozs7Ozs7O29DQVJLO1lBQzlCLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPO1NBQ3RCO2tDQUM2QixDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQztRQU03RSxpQkFBTSxvQkFBb0IsYUFBQyxpQkFBaUIsQ0FBQyxDQUFDOztLQUMvQzs7Ozs7O0lBRU8saUNBQVM7Ozs7O2NBQUMsS0FBYSxFQUFFLEdBQVc7UUFDMUMsRUFBRSxDQUFDLENBQUMsaUJBQU0sS0FBSyxZQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7SUFHbEQsaUNBQVM7Ozs7O2NBQUMsS0FBYSxFQUFFLEdBQVc7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7OztJQUdsRCwrQkFBTzs7Ozs7Y0FBQyxLQUFhLEVBQUUsTUFBYztRQUMzQyxFQUFFLENBQUMsQ0FBQyxpQkFBTSxLQUFLLFlBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUM3QjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzt3QkFwRDFEO0VBT21DLGNBQWMsRUFnRGhELENBQUE7Ozs7QUFoREQseUJBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyAndGV4dCcgbGlrZSBpbnB1dCBlbGVtZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5vdGUsICdtaW5sZW5ndGgnIGFuZCAnbWF4bGVuZ3RoJyB2YWxpZGF0b3JzXHJcbiAgICogYXJlIGFscmVhZHkgc3VwcG9ydGVkIGJ5IEFuZ3VsYXIgTmdGb3JtLCBidXRcclxuICAgKiB3ZSBzaG91bGQgZW1wbGVtZW50IHRoZW0gdG8gc3RvcCB0aGUgdmFsaWRhdGlvblxyXG4gICAqIHByb2Nlc3Mgd2hlbiB0aGUgZmlyc3QgdmFsaWRhdG9yIGZhaWxzLlxyXG4gICAqIFNlZTogSW5wdXRWYWxpZGF0b3IudmFsaWRhdGUoKSBpbXBsZW1lbnRhdGlvbi5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYXZhaWxhYmxlVmFsaWRhdG9ycyA9IHtcclxuICAgIG1heGxlbmd0aDogdGhpcy5tYXhsZW5ndGgsXHJcbiAgICBtaW5sZW5ndGg6IHRoaXMubWlubGVuZ3RoLFxyXG4gICAgcGF0dGVybjogdGhpcy5wYXR0ZXJuXHJcbiAgfTtcclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yU2VxdWVuY2UgPSBbJ3JlcXVpcmVkJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHN1cGVyLnNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4bGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1heDogbnVtYmVyKTogeyBtYXhsZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcbiAgICBpZiAoc3VwZXIuZW1wdHkodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IG1heCA/IHsgbWF4bGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWlubGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1pbjogbnVtYmVyKTogeyBtaW5sZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7IG1pbmxlbmd0aDogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IG1pbiA/IHsgbWlubGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGF0dGVybih2YWx1ZTogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHsgcGF0dGVybjogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgcGF0dGVybjogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ0V4cC50ZXN0KHZhbHVlKSA/IG51bGwgOiB7IHBhdHRlcm46IHZhbHVlIH07XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=