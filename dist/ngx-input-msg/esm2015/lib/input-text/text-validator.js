/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InputValidator } from '../models/input-validator';
/**
 * Validates 'text' like input element.
 */
export class TextValidator extends InputValidator {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5wdXQtbXNnLyIsInNvdXJjZXMiOlsibGliL2lucHV0LXRleHQvdGV4dC12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQU8zRCxNQUFNLG9CQUFxQixTQUFRLGNBQWM7Ozs7SUFnQi9DLFlBQ1U7UUFFUixLQUFLLEVBQUUsQ0FBQztRQUZBLHNCQUFpQixHQUFqQixpQkFBaUI7Ozs7Ozs7O21DQVJLO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCO2lDQUM2QixDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQztRQU03RSxLQUFLLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQUMvQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQWEsRUFBRSxHQUFXO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7OztJQUdsRCxTQUFTLENBQUMsS0FBYSxFQUFFLEdBQVc7UUFFMUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDYjtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQztTQUMvQjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Ozs7OztJQUdsRCxPQUFPLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDM0MsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O0NBR3pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlcyAndGV4dCcgbGlrZSBpbnB1dCBlbGVtZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRWYWxpZGF0b3IgZXh0ZW5kcyBJbnB1dFZhbGlkYXRvciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIE5vdGUsICdtaW5sZW5ndGgnIGFuZCAnbWF4bGVuZ3RoJyB2YWxpZGF0b3JzXHJcbiAgICogYXJlIGFscmVhZHkgc3VwcG9ydGVkIGJ5IEFuZ3VsYXIgTmdGb3JtLCBidXRcclxuICAgKiB3ZSBzaG91bGQgZW1wbGVtZW50IHRoZW0gdG8gc3RvcCB0aGUgdmFsaWRhdGlvblxyXG4gICAqIHByb2Nlc3Mgd2hlbiB0aGUgZmlyc3QgdmFsaWRhdG9yIGZhaWxzLlxyXG4gICAqIFNlZTogSW5wdXRWYWxpZGF0b3IudmFsaWRhdGUoKSBpbXBsZW1lbnRhdGlvbi5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYXZhaWxhYmxlVmFsaWRhdG9ycyA9IHtcclxuICAgIG1heGxlbmd0aDogdGhpcy5tYXhsZW5ndGgsXHJcbiAgICBtaW5sZW5ndGg6IHRoaXMubWlubGVuZ3RoLFxyXG4gICAgcGF0dGVybjogdGhpcy5wYXR0ZXJuXHJcbiAgfTtcclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yU2VxdWVuY2UgPSBbJ3JlcXVpcmVkJywgJ21pbmxlbmd0aCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHN1cGVyLnNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4bGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1heDogbnVtYmVyKTogeyBtYXhsZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcbiAgICBpZiAoc3VwZXIuZW1wdHkodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IG1heCA/IHsgbWF4bGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWlubGVuZ3RoKHZhbHVlOiBzdHJpbmcsIG1pbjogbnVtYmVyKTogeyBtaW5sZW5ndGg6IHN0cmluZyB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUgPT09ICcnKSB7XHJcbiAgICAgIHJldHVybiB7IG1pbmxlbmd0aDogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA8IG1pbiA/IHsgbWlubGVuZ3RoOiB2YWx1ZSB9IDogbnVsbDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcGF0dGVybih2YWx1ZTogc3RyaW5nLCByZWdFeHA6IFJlZ0V4cCk6IHsgcGF0dGVybjogc3RyaW5nIH0gfCBudWxsIHtcclxuICAgIGlmIChzdXBlci5lbXB0eSh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgcGF0dGVybjogJ2VtcHR5JyB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlZ0V4cC50ZXN0KHZhbHVlKSA/IG51bGwgOiB7IHBhdHRlcm46IHZhbHVlIH07XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=