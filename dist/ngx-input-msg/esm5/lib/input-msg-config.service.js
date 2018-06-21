/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
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
export { InputMsgConfigService };
function InputMsgConfigService_tsickle_Closure_declarations() {
    /** @type {?} */
    InputMsgConfigService.prototype.defaultConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs2QkFVQTtZQUN2QyxNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFNBQVMsRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsR0FBRyxFQUFFO2dCQUNILEtBQUssRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFBLFdBQVMsS0FBTyxFQUFoQixDQUFnQjtnQkFDMUMsT0FBTyxFQUFFLGlDQUFpQztnQkFDMUMsR0FBRyxFQUFFLFVBQUMsS0FBYSxFQUFFLE9BQWUsSUFBSyxPQUFBLHFCQUFtQixLQUFLLFlBQU8sT0FBUyxFQUF4QyxDQUF3QztnQkFDakYsR0FBRyxFQUFFLFVBQUMsS0FBYSxFQUFFLE9BQWUsSUFBSyxPQUFBLHFCQUFtQixLQUFLLFlBQU8sT0FBUyxFQUF4QyxDQUF3QztnQkFDakYsU0FBUyxFQUFFLFVBQUMsS0FBYSxFQUFFLE9BQWUsSUFBSyxPQUFBLGFBQVcsT0FBTyw2QkFBMEIsRUFBNUMsQ0FBNEM7Z0JBQzNGLFNBQVMsRUFBRSxVQUFDLEtBQWEsRUFBRSxPQUFlLElBQUssT0FBQSxjQUFZLE9BQU8sK0JBQTRCLEVBQS9DLENBQStDO2dCQUM5RixPQUFPLEVBQUUsVUFBQyxLQUFhLElBQUssT0FBQSxhQUFXLEtBQU8sRUFBbEIsQ0FBa0I7Z0JBQzlDLFFBQVEsRUFBRSxVQUFDLEtBQWEsSUFBSyxPQUFHLEtBQUssaUJBQWMsRUFBdEIsQ0FBc0I7YUFDcEQ7U0FDRjs7Ozs7SUFFTSxtQ0FBRzs7OztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7Ozs7SUFHckIsbUNBQUc7Ozs7Y0FBQyxNQUF1Qjs7UUFFaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUMvQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFXO2dCQUM3QyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JELENBQUMsQ0FBQztTQUNKOztRQUdELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1I7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFXO1lBQzFDLEtBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDOzs7Z0JBNUNOLFVBQVU7O2dDQVBYOztTQVFhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGlucHV0TXNnIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogUHJvdmlkZXMgY29uZmlndXJhdGlvbiBmb3IgZGlzcGxheWluZyBtZXNzYWdlcy5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElucHV0TXNnQ29uZmlnU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogaW5wdXRNc2cuQ29uZmlnID0ge1xyXG4gICAgY29sb3JzOiB7XHJcbiAgICAgIGVycm9yOiAnI2Y0NDMzNicsXHJcbiAgICAgIG1heGxlbmd0aDogJ2dyZXknXHJcbiAgICB9LFxyXG4gICAgcG9zaXRpb246ICdib3R0b20tbGVmdCcsXHJcbiAgICBtc2c6IHtcclxuICAgICAgZW1haWw6IChsYWJlbDogc3RyaW5nKSA9PiBgV3JvbmcgJHtsYWJlbH1gLFxyXG4gICAgICBpbnRlZ2VyOiAnRnJhY3Rpb25hbCBkaWdpdHMgYXJlIGZvcmJpZGRlbicsXHJcbiAgICAgIG1heDogKGxhYmVsOiBzdHJpbmcsIGFsbG93ZWQ6IG51bWJlcikgPT4gYE1heGltdW0gYWxsb3dlZCAke2xhYmVsfSBpcyAke2FsbG93ZWR9YCxcclxuICAgICAgbWluOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgTWluaW11bSBhbGxvd2VkICR7bGFiZWx9IGlzICR7YWxsb3dlZH1gLFxyXG4gICAgICBtYXhsZW5ndGg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBNYXhpbXVtICR7YWxsb3dlZH0gY2hhcnMgbGltaXQgd2FzIHJlYWNoZWRgLFxyXG4gICAgICBtaW5sZW5ndGg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBBdCBsZWFzdCAke2FsbG93ZWR9IGNoYXJzIGxlbmd0aCBhcmUgcmVxdWlyZWRgLFxyXG4gICAgICBwYXR0ZXJuOiAobGFiZWw6IHN0cmluZykgPT4gYEludmFsaWQgJHtsYWJlbH1gLFxyXG4gICAgICByZXF1aXJlZDogKGxhYmVsOiBzdHJpbmcpID0+IGAke2xhYmVsfSBpcyByZXF1aXJlZGBcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwdWJsaWMgZ2V0KCk6IGlucHV0TXNnLkNvbmZpZyB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0Q29uZmlnO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChjb25maWc6IGlucHV0TXNnLkNvbmZpZykge1xyXG5cclxuICAgIGlmIChjb25maWcucG9zaXRpb24pIHtcclxuICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnLnBvc2l0aW9uID0gY29uZmlnLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldCBjb2xvcnNcclxuICAgIGlmIChjb25maWcuY29sb3JzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGNvbmZpZy5jb2xvcnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnLmNvbG9yc1trZXldID0gY29uZmlnLmNvbG9yc1trZXldO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgbXNnXHJcbiAgICBpZiAoIWNvbmZpZy5tc2cpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoY29uZmlnLm1zZykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnLm1zZ1trZXldID0gY29uZmlnLm1zZ1trZXldO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=