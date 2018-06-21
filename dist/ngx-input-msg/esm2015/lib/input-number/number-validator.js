/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InputValidator } from '../models/input-validator';
export class NumberValidator extends InputValidator {
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
function NumberValidator_tsickle_Closure_declarations() {
    /** @type {?} */
    NumberValidator.prototype.availableValidators;
    /** @type {?} */
    NumberValidator.prototype.validatorSequence;
    /** @type {?} */
    NumberValidator.prototype.validatorsToApply;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvaW5wdXQtbnVtYmVyL251bWJlci12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUkzRCxNQUFNLHNCQUF1QixTQUFRLGNBQWM7Ozs7SUFTakQsWUFDVTtRQUVSLEtBQUssRUFBRSxDQUFDO1FBRkEsc0JBQWlCLEdBQWpCLGlCQUFpQjttQ0FSSztZQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QjtpQ0FDNkIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7UUFNakUsS0FBSyxDQUFDLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDL0M7Ozs7O0lBRU8sT0FBTyxDQUFDLEtBQWE7UUFFM0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLENBQUM7U0FDcEM7UUFDRCx1QkFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7UUFDckQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Ozs7OztJQUdyQyxHQUFHLENBQUMsS0FBYSxFQUFFLEdBQVc7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUM7U0FDaEM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQix1QkFBTSxLQUFLLEdBQUc7Z0JBQ1osR0FBRyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUMvQixDQUFDO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7Ozs7Ozs7SUFHSyxHQUFHLENBQUMsS0FBYSxFQUFFLEdBQVc7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUM7U0FDaEM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQix1QkFBTSxLQUFLLEdBQUc7Z0JBQ1osR0FBRyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUMvQixDQUFDO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7Ozs7OztJQUdLLE1BQU0sQ0FBQyxHQUFRO1FBQ3JCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7O0NBR25EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgcHJvdGVjdGVkIGF2YWlsYWJsZVZhbGlkYXRvcnMgPSB7XHJcbiAgICBpbnRlZ2VyOiB0aGlzLmludGVnZXIuYmluZCh0aGlzKSxcclxuICAgIG1heDogdGhpcy5tYXguYmluZCh0aGlzKSxcclxuICAgIG1pbjogdGhpcy5taW4uYmluZCh0aGlzKVxyXG4gIH07XHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvclNlcXVlbmNlID0gWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ21pbicsICdtYXgnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGludGVnZXIodmFsdWU6IG51bWJlcik6IHsgaW50ZWdlcjogYW55IH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAoIXRoaXMubnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBpbnRlZ2VyOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW50ZWdlcjogYm9vbGVhbiA9IE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxuICAgIHJldHVybiBpbnRlZ2VyID8gbnVsbCA6IHsgaW50ZWdlcjogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4KHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogeyBtYXg6IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWF4OiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1heDogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWluKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyKTogeyBtaW46IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWluOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1pbjogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbnVtYmVyKGFyZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoYXJnKSkgJiYgaXNGaW5pdGUoYXJnKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==