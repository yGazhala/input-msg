/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
export class InputValidator {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvaW5wdXQtdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxNQUFNOzs7OztJQWtCRyxRQUFRLENBQUMsT0FBd0I7UUFFdEMscUJBQUksTUFBTSxHQUE0QyxJQUFJLENBQUM7UUFDM0QsR0FBRyxDQUFDLENBQUMsdUJBQU0sU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBRXRELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixLQUFLLENBQUM7YUFDUDtTQUNGO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7O0lBSU4sS0FBSyxDQUFDLEtBQVU7UUFDeEIsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUM7S0FDdkU7Ozs7O0lBRVMsb0JBQW9CLENBQUMsaUJBQXVFO1FBRXBHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyw0RkFBNEYsQ0FBQyxDQUFDO1NBQy9HO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLDBGQUEwRixDQUFDLENBQUM7U0FDN0c7UUFFRCxJQUFJLENBQUMsbUJBQW1CLGVBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUM1Qix1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDeEUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1Qix1QkFBTSxNQUFNLEdBQWtDO2dCQUM1QyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7Z0JBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO2dCQUNkLEVBQUUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUN6QyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQyxDQUFDLENBQUM7S0FDSjs7Ozs7OztJQUtPLHlCQUF5QixDQUFJLGlCQUE2RDtRQUVoRyx1QkFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQU1SLFFBQVEsQ0FBQyxLQUFhO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztDQUd4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIElucHV0VmFsaWRhdG9yIGltcGxlbWVudHMgaW5wdXRNc2cuSW5wdXRWYWxpZGF0b3Ige1xyXG5cclxuICAvKipcclxuICAgKiBBbGwgYXZhaWxhYmxlIHZhbGlkYXRvcnMgZm9yIHNwZWNpZmljIGlucHV0IHR5cGVcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYXZhaWxhYmxlVmFsaWRhdG9yczogeyBbbmFtZTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yRm48YW55PiB9O1xyXG4gIC8qKlxyXG4gICAqIFRoZSBzZXF1ZW5jZSBvZiB2YWxpZGF0b3IgbmFtZXMgdG8gdmFsaWRhdGUgYW4gaW5wdXQgZWxlbWVudCB3aXRoLlxyXG4gICAqIFZhbGlkYXRvcnMgYXJlIGFwcGxpZWQgb25lIGJ5IG9uZS5cclxuICAgKiBAZXhhbXBsZSBbJ3JlcXVpcmVkJywgJ21pbmxlbmdodCcsICdtYXhsZW5ndGgnLCAncGF0dGVybiddXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHZhbGlkYXRvclNlcXVlbmNlOiBzdHJpbmdbXTtcclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCB2YWxpZGF0b3JzIGFwcGxpZWQgdG8gdGhlIHNwZWNpZmljIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGN1cnJlbnRWYWxpZGF0b3JzOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PltdO1xyXG5cclxuXHJcbiAgcHVibGljIHZhbGlkYXRlKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IHsgW3ZhbGlkYXRvck5hbWU6IHN0cmluZ106IGFueSB9IHwgbnVsbCB7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogeyBbdmFsaWRhdG9yTmFtZTogc3RyaW5nXTogYW55IH0gfCBudWxsID0gbnVsbDtcclxuICAgIGZvciAoY29uc3QgdmFsaWRhdG9yIG9mIHRoaXMuY3VycmVudFZhbGlkYXRvcnMpIHtcclxuICAgICAgcmVzdWx0ID0gdmFsaWRhdG9yLmZuKGNvbnRyb2wudmFsdWUsIHZhbGlkYXRvci52YWx1ZSk7XHJcbiAgICAgIC8vIGJyZWFrIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICAgIGlmIChyZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG5cclxuICBwcm90ZWN0ZWQgZW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHNldEN1cnJlbnRWYWxpZGF0b3JzKHZhbGlkYXRvcnNUb0FwcGx5OiB7IFt2YWxpZGF0b3JOYW1lOiBzdHJpbmddOiBpbnB1dE1zZy5WYWxpZGF0b3JQYXJhbSB9KTogdm9pZCB7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmF2YWlsYWJsZVZhbGlkYXRvcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXRWYWxpZGF0b3IgY2xhc3M6IHRoaXMuYXZhaWxhYmxlVmFsaWRhdG9ycyBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWxpZGF0b3JTZXF1ZW5jZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dFZhbGlkYXRvciBjbGFzczogdGhpcy52YWxpZGF0b3JTZXF1ZW5jZSBoYXZlIHRvIGJlIGluaXRpYWxpemVkIGluIHRoZSBkZXJpdmVkIGNsYXNzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzLnJlcXVpcmVkID0gdGhpcy5yZXF1aXJlZC5iaW5kKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMgPSBbXTtcclxuICAgIGNvbnN0IHBhcmFtU2VxdWVuY2UgPSB0aGlzLmdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2UodmFsaWRhdG9yc1RvQXBwbHkpO1xyXG4gICAgcGFyYW1TZXF1ZW5jZS5mb3JFYWNoKHBhcmFtID0+IHtcclxuICAgICAgY29uc3QgY29uZmlnOiBpbnB1dE1zZy5WYWxpZGF0b3JDb25maWc8YW55PiA9IHtcclxuICAgICAgICBuYW1lOiBwYXJhbS5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiBwYXJhbS52YWx1ZSxcclxuICAgICAgICBzZXQ6IHBhcmFtLnNldCxcclxuICAgICAgICBmbjogdGhpcy5hdmFpbGFibGVWYWxpZGF0b3JzW3BhcmFtLm5hbWVdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY3VycmVudFZhbGlkYXRvcnMucHVzaChjb25maWcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBzZXF1ZW5jZSBvZiBjb25maWdzIG9mIHZhbGlkYXRvcnNcclxuICAgKi9cclxuICBwcml2YXRlIGdldFZhbGlkYXRvclBhcmFtU2VxdWVuY2U8VD4odmFsaWRhdG9yc1RvQXBwbHk6IHsgW2tleTogc3RyaW5nXTogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW0gfSk6IGlucHV0TXNnLlZhbGlkYXRvclBhcmFtW10ge1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZzogaW5wdXRNc2cuVmFsaWRhdG9yUGFyYW1bXSA9IFtdO1xyXG4gICAgdGhpcy52YWxpZGF0b3JTZXF1ZW5jZS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBpZiAodmFsaWRhdG9yc1RvQXBwbHlbbmFtZV0pIHtcclxuICAgICAgICBjb25maWcucHVzaCh2YWxpZGF0b3JzVG9BcHBseVtuYW1lXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbmZpZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFZhbGlkYXRpb24gZnVuY3Rpb24gdG8gYmUgdXNlZCB3aXRoIGFuIGFueSB0eXBlIG9mIGFuIGlucHV0IGVsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlcXVpcmVkKHZhbHVlOiBzdHJpbmcpOiB7IHJlcXVpcmVkOiB0cnVlIH0gfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLmVtcHR5KHZhbHVlKSA/IHsgcmVxdWlyZWQ6IHRydWUgfSA6IG51bGw7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=