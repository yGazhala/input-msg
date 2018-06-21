/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InputValidator } from '../models/input-validator';
var NumberValidator = /** @class */ (function (_super) {
    tslib_1.__extends(NumberValidator, _super);
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
export { NumberValidator };
function NumberValidator_tsickle_Closure_declarations() {
    /** @type {?} */
    NumberValidator.prototype.availableValidators;
    /** @type {?} */
    NumberValidator.prototype.validatorSequence;
    /** @type {?} */
    NumberValidator.prototype.validatorsToApply;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvaW5wdXQtbnVtYmVyL251bWJlci12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFJM0QsSUFBQTtJQUFxQywyQ0FBYztJQVNqRCx5QkFDVTtRQURWLFlBR0UsaUJBQU8sU0FFUjtRQUpTLHVCQUFpQixHQUFqQixpQkFBaUI7b0NBUks7WUFDOUIsT0FBTyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQztZQUNoQyxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDO1lBQ3hCLEdBQUcsRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUM7U0FDekI7a0NBQzZCLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO1FBTWpFLGlCQUFNLG9CQUFvQixhQUFDLGlCQUFpQixDQUFDLENBQUM7O0tBQy9DOzs7OztJQUVPLGlDQUFPOzs7O2NBQUMsS0FBYTtRQUUzQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsQ0FBQztTQUNwQztRQUNELHFCQUFNLE9BQU8sR0FBWSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQztRQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7O0lBR3JDLDZCQUFHOzs7OztjQUFDLEtBQWEsRUFBRSxHQUFXO1FBRXBDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxDQUFDO1NBQ2hDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEIscUJBQU0sS0FBSyxHQUFHO2dCQUNaLEdBQUcsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUs7YUFDL0IsQ0FBQztZQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNiOzs7Ozs7O0lBR0ssNkJBQUc7Ozs7O2NBQUMsS0FBYSxFQUFFLEdBQVc7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLENBQUM7U0FDaEM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixxQkFBTSxLQUFLLEdBQUc7Z0JBQ1osR0FBRyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUMvQixDQUFDO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNkO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ2I7Ozs7OztJQUdLLGdDQUFNOzs7O2NBQUMsR0FBUTtRQUNyQixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzswQkE5RHBEO0VBTXFDLGNBQWMsRUEyRGxELENBQUE7QUEzREQsMkJBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRWYWxpZGF0b3IgfSBmcm9tICcuLi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE51bWJlclZhbGlkYXRvciBleHRlbmRzIElucHV0VmFsaWRhdG9yIHtcclxuXHJcbiAgcHJvdGVjdGVkIGF2YWlsYWJsZVZhbGlkYXRvcnMgPSB7XHJcbiAgICBpbnRlZ2VyOiB0aGlzLmludGVnZXIuYmluZCh0aGlzKSxcclxuICAgIG1heDogdGhpcy5tYXguYmluZCh0aGlzKSxcclxuICAgIG1pbjogdGhpcy5taW4uYmluZCh0aGlzKVxyXG4gIH07XHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvclNlcXVlbmNlID0gWydyZXF1aXJlZCcsICdpbnRlZ2VyJywgJ21pbicsICdtYXgnXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcnNUb0FwcGx5OiB7IFtrZXk6IHN0cmluZ106IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtIH1cclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBzdXBlci5zZXRDdXJyZW50VmFsaWRhdG9ycyh2YWxpZGF0b3JzVG9BcHBseSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGludGVnZXIodmFsdWU6IG51bWJlcik6IHsgaW50ZWdlcjogYW55IH0gfCBudWxsIHtcclxuXHJcbiAgICBpZiAoIXRoaXMubnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICByZXR1cm4geyBpbnRlZ2VyOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW50ZWdlcjogYm9vbGVhbiA9IE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcclxuICAgIHJldHVybiBpbnRlZ2VyID8gbnVsbCA6IHsgaW50ZWdlcjogdmFsdWUgfTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWF4KHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogeyBtYXg6IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWF4OiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1heDogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWluKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyKTogeyBtaW46IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLm51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHsgbWluOiAnTm90IGEgbnVtYmVyJyB9O1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlIDwgbWluKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0ge1xyXG4gICAgICAgIG1pbjogdmFsdWUgPT09IDAgPyAnMCcgOiB2YWx1ZVxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gZXJyb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbnVtYmVyKGFyZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoYXJnKSkgJiYgaXNGaW5pdGUoYXJnKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==