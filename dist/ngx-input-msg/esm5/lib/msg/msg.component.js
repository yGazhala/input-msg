/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';
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
export { MsgComponent };
function MsgComponent_tsickle_Closure_declarations() {
    /**
     * An input id or name attribute
     * @type {?}
     */
    MsgComponent.prototype.for;
    /**
     * Optional params with custom messages
     * to overwrite the default ones
     * @type {?}
     */
    MsgComponent.prototype.email;
    /** @type {?} */
    MsgComponent.prototype.integer;
    /** @type {?} */
    MsgComponent.prototype.max;
    /** @type {?} */
    MsgComponent.prototype.maxlength;
    /** @type {?} */
    MsgComponent.prototype.min;
    /** @type {?} */
    MsgComponent.prototype.minlength;
    /** @type {?} */
    MsgComponent.prototype.pattern;
    /** @type {?} */
    MsgComponent.prototype.position;
    /** @type {?} */
    MsgComponent.prototype.required;
    /** @type {?} */
    MsgComponent.prototype.currentMsg;
    /** @type {?} */
    MsgComponent.prototype.currentStatus;
    /** @type {?} */
    MsgComponent.prototype.defaultConfig;
    /** @type {?} */
    MsgComponent.prototype.inputParams;
    /**
     * All available messages corresponded
     * to validation params of the input
     * @type {?}
     */
    MsgComponent.prototype.messages;
    /** @type {?} */
    MsgComponent.prototype.subscriptions;
    /** @type {?} */
    MsgComponent.prototype.configService;
    /** @type {?} */
    MsgComponent.prototype.storageService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvbXNnL21zZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE4QyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSWpGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7SUF1RTdELHNCQUNVLGVBQ0E7UUFEQSxrQkFBYSxHQUFiLGFBQWE7UUFDYixtQkFBYyxHQUFkLGNBQWM7Ozs7O3dCQUxlLEVBQUU7NkJBQ0QsRUFBRTtLQUtyQzs7OztJQUVFLGlDQUFVOzs7O1FBRWYscUJBQU0sUUFBUSxHQUFtQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3BHLE1BQU0sQ0FBQztZQUNMLHlCQUF5QixFQUFFLFFBQVEsS0FBSyxhQUFhO1lBQ3JELDBCQUEwQixFQUFFLFFBQVEsS0FBSyxjQUFjO1lBQ3ZELHVCQUF1QixFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVztZQUMzRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7U0FDOUMsQ0FBQzs7Ozs7SUFHRyxnQ0FBUzs7OztRQUVkLHFCQUFJLEtBQWEsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFD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SyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLFdBQVcsRUFBRTtnQ0FDdEIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO2dDQUNyQixPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNoRCxDQUFDOzRCQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0NBQ3RCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckIsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDaEQsQ0FBQzt5QkFDSCxDQUFDO3FCQUNIO2lCQUNGOzs7O2dCQXRDUSxxQkFBcUI7Z0JBQ3JCLG1CQUFtQjs7O3NCQTJDekIsS0FBSzt3QkFLTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzs7dUJBOURSOztTQTRDYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRNc2dDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4uL3R5cGVzJztcclxuXHJcblxyXG4vKipcclxuICogRGlzcGxheXMgYSBtZXNzYWdlIGZvciBhbiBpbnB1dCBlbGVtZW50XHJcbiAqIGRlcGVuZGluZyBvbiBpdGBzIHZhbGlkYXRpb24gc3RhdHVzLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZ3gtbXNnJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJuZ3gtbXNnX19jb250YWluZXJcIiBcclxuICBbbmdDbGFzc109XCJnZXRDbGFzc2VzKClcIlxyXG4gIFtuZ1N0eWxlXT1cImdldFN0eWxlcygpXCJcclxuICA+XHJcblxyXG4gIDxzcGFuICpuZ0lmPVwiY3VycmVudE1zZ1wiIFtAbXNnQW5pbWF0aW9uXT5cclxuICAgIHt7Y3VycmVudE1zZ319XHJcbiAgPC9zcGFuPlxyXG5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5uZ3gtbXNnX19tYXQtZm9ybS1maWVsZHttYXJnaW4tYm90dG9tOjE2cHg7d2lkdGg6MTAwJX0ubmd4LW1zZ19fY29udGFpbmVye2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEycHg7bWluLWhlaWdodDoyMHB4O21hcmdpbi10b3A6M3B4fS5uZ3gtbXNnX21hdGVyaWFse21hcmdpbi10b3A6LTMzcHh9Lm5neC1tc2dfcG9zX2JvdHRvbS1sZWZ0e3RleHQtYWxpZ246bGVmdH0ubmd4LW1zZ19wb3NfYm90dG9tLXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9YF0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdtc2dBbmltYXRpb24nLCBbXHJcbiAgICAgIHN0YXRlKCdhY3RpdmUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCcqID0+IHZvaWQnLCBbXHJcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxIH0pLFxyXG4gICAgICAgIGFuaW1hdGUoJzI1MG1zIGVhc2UtaW4nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgIF0pXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1zZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBBbiBpbnB1dCBpZCBvciBuYW1lIGF0dHJpYnV0ZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBmb3I6IHN0cmluZztcclxuICAvKipcclxuICAgKiBPcHRpb25hbCBwYXJhbXMgd2l0aCBjdXN0b20gbWVzc2FnZXNcclxuICAgKiB0byBvdmVyd3JpdGUgdGhlIGRlZmF1bHQgb25lc1xyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBlbWFpbDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIGludGVnZXI6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtYXhsZW5ndGg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW46IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5sZW5ndGg6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgcG9zaXRpb246IGlucHV0TXNnLlBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyByZXF1aXJlZDogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcblxyXG4gIC8vIEN1cnJlbnRseSBzaG93biBtZXNzYWdlXHJcbiAgcHVibGljIGN1cnJlbnRNc2c6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBjdXJyZW50U3RhdHVzOiBpbnB1dE1zZy5JbnB1dFN0YXR1cztcclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZztcclxuICBwcml2YXRlIGlucHV0UGFyYW1zOiBpbnB1dE1zZy5JbnB1dFBhcmFtcztcclxuICAvKipcclxuICAgKiBBbGwgYXZhaWxhYmxlIG1lc3NhZ2VzIGNvcnJlc3BvbmRlZFxyXG4gICAqIHRvIHZhbGlkYXRpb24gcGFyYW1zIG9mIHRoZSBpbnB1dFxyXG4gICAqL1xyXG4gIHByaXZhdGUgbWVzc2FnZXM6IGlucHV0TXNnLlJlc3VsdE1zZyA9IHt9O1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNvbmZpZ1NlcnZpY2U6IElucHV0TXNnQ29uZmlnU2VydmljZSxcclxuICAgIHByaXZhdGUgc3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2VcclxuICApIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2xhc3NlcygpOiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH0ge1xyXG5cclxuICAgIGNvbnN0IHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCcgPSB0aGlzLnBvc2l0aW9uIHx8IHRoaXMuY29uZmlnU2VydmljZS5nZXQoKS5wb3NpdGlvbjtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICduZ3gtbXNnX3Bvc19ib3R0b20tbGVmdCc6IHBvc2l0aW9uID09PSAnYm90dG9tLWxlZnQnLFxyXG4gICAgICAnbmd4LW1zZ19wb3NfYm90dG9tLXJpZ2h0JzogcG9zaXRpb24gPT09ICdib3R0b20tcmlnaHQnLFxyXG4gICAgICAnbmd4LW1zZ19jb2xvcl90b29sdGlwJzogdGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJyxcclxuICAgICAgJ25neC1tc2dfbWF0ZXJpYWwnOiB0aGlzLmlucHV0UGFyYW1zLm1hdGVyaWFsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFN0eWxlcygpOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSB7XHJcblxyXG4gICAgbGV0IGNvbG9yOiBzdHJpbmc7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdHVzID09PSAnbWF4bGVuZ3RoJykge1xyXG4gICAgICBjb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnMubWF4bGVuZ3RoO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29sb3IgPSB0aGlzLmRlZmF1bHRDb25maWcuY29sb3JzLmVycm9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgY29sb3I6IGNvbG9yIH07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogeyBbcHJvcDogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCBjaGFuZ2VhYmxlUHJvcHMgPSB7XHJcbiAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICBpbnRlZ2VyOiB0cnVlLFxyXG4gICAgICBtYXg6IHRydWUsXHJcbiAgICAgIG1heGxlbmd0aDogdHJ1ZSxcclxuICAgICAgbWluOiB0cnVlLFxyXG4gICAgICBtaW5sZW5ndGg6IHRydWUsXHJcbiAgICAgIHBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhjaGFuZ2VzKS5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICBpZiAoIWNoYW5nZWFibGVQcm9wc1tuYW1lXSB8fCBjaGFuZ2VzW25hbWVdLmlzRmlyc3RDaGFuZ2UoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UobmFtZSBhcyBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTtcclxuXHJcbiAgICAgIC8vIHVwZGF0ZSBjdXJyZW50TXNnIGlmIGl0IGhhcyBiZWVuIGNoYW5nZWRcclxuICAgICAgLy8gYW5kIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09IG5hbWUgJiYgbmFtZSAhPT0gJ21heGxlbmd0aCcpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSB0aGlzLm1lc3NhZ2VzW25hbWVdO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YiA9PiBzdWIudW5zdWJzY3JpYmUoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0Q29uZmlnID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpO1xyXG5cclxuICAgIGlmICghdGhpcy5mb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCduZ3hNc2cgY29tcG9uZW50OiBcXCdmb3JcXCcgcGFyYW1ldGVyIHdpdGggdGhlIGlucHV0IGlkIG9yIG5hbWUgbXVzdCBiZSBwcm92aWRlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlucHV0UGFyYW1zID0gdGhpcy5zdG9yYWdlU2VydmljZS5nZXQodGhpcy5mb3IpO1xyXG4gICAgaWYgKCF0aGlzLmlucHV0UGFyYW1zKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4TXNnIGNvbXBvbmVudDogY2FuXFwndCBmaW5kIHRoZSBpbnB1dCBlbGVtZW50IHdpdGggaWQgb3IgbmFtZTogJHt0aGlzLmZvcn1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgZGVmYXVsdCBvciBjdXN0b20gbWVzc2FnZXMgZm9yIGdpdmVuIHZhbGlkYXRpb24gcGFyYW1zXHJcbiAgICB0aGlzLnNldEFsbE1lc3NhZ2VzKCk7XHJcblxyXG4gICAgLy8gTGlzdGVuIHRvIHRoZSBpbnB1dCBzdGF0dXNcclxuICAgIGNvbnN0IHN0YXR1c1N1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dFBhcmFtcy5zdGF0dXNcclxuICAgICAgLnN1YnNjcmliZSh0aGlzLm9uU3RhdHVzQ2hhbmdlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3RhdHVzU3ViKTtcclxuXHJcbiAgICAvLyBMaXN0ZW4gdG8gdGhlIGlucHV0IHBhcmFtcyBjaGFuZ2VcclxuICAgIGNvbnN0IGlucHV0UGFyYW1zQ2hhbmdlU3ViOiBTdWJzY3JpcHRpb24gPSB0aGlzLmlucHV0UGFyYW1zLnBhcmFtQ2hhbmdlXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5vbklucHV0UGFyYW1zQ2hhbmdlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goaW5wdXRQYXJhbXNDaGFuZ2VTdWIpO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlcyBtZXNzYWdlcyB3aGVuIGlucHV0IHBhcmFtcyBjaGFuZ2VcclxuICBwcml2YXRlIG9uSW5wdXRQYXJhbXNDaGFuZ2UoY2hhbmdlZFByb3BOYW1lOiAnbGFiZWwnIHwgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk6IHZvaWQge1xyXG5cclxuICAgIGlmIChjaGFuZ2VkUHJvcE5hbWUgPT09ICdsYWJlbCcpIHtcclxuICAgICAgdGhpcy5zZXRBbGxNZXNzYWdlcygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKGNoYW5nZWRQcm9wTmFtZSBhcyBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgY3VycmVudCBtc2cgaWYgdGhlIGlucHV0IGlzIGludmFsaWRcclxuICAgIGlmICh0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdwcmlzdGluZScgfHxcclxuICAgICAgdGhpcy5jdXJyZW50U3RhdHVzID09PSAndmFsaWQnIHx8XHJcbiAgICAgIHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ21heGxlbmd0aCcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1t0aGlzLmN1cnJlbnRTdGF0dXNdO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlcyBjdXJyZW50U3RhdHVzIGFuZCBzaG93cy9oaWRlcyBjdXJyZW50TXNnXHJcbiAgcHJpdmF0ZSBvblN0YXR1c0NoYW5nZShzdGF0dXM6IGlucHV0TXNnLklucHV0U3RhdHVzKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50U3RhdHVzID0gc3RhdHVzO1xyXG4gICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgY2FzZSAncHJpc3RpbmUnOlxyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9ICcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2YWxpZCc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gJyc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1tzdGF0dXNdO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0aGlzLmN1cnJlbnRNc2cgPSAnJzsgfSwgMjAwMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1tzdGF0dXNdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRBbGxNZXNzYWdlcygpOiB2b2lkIHtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtcykuZm9yRWFjaCgobmFtZTogaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSkgPT4ge1xyXG4gICAgICB0aGlzLnNldE1lc3NhZ2UobmFtZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIFNldHMgbWVzc2FnZSB0ZXh0IGZvciBhIGdpdmVuIHZhbGlkYXRpb24gcGFyYW1ldGVyLlxyXG4gIC8vIElmIGFwcHJvcHJpYXRlIG1lc3NhZ2UgZXhwcmVzc2lvbiBpcyBub3QgcHJvdmlkZWRcclxuICAvLyB0aHJvZ2ggQElucHV0KCkgYmluZGluZyAtIHRoZSBkZWZhdWx0IG9uZSBpcyB1c2VkIGluc3RlYWQuXHJcbiAgcHJpdmF0ZSBzZXRNZXNzYWdlKG5hbWU6IGlucHV0TXNnLlZhbGlkYXRvck5hbWUpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGVscGVyIHR5cGUgZ3VhcmRcclxuICAgIGNvbnN0IGlzRm4gPSAoYXJnOiBzdHJpbmcgfCBGdW5jdGlvbik6IGFyZyBpcyBpbnB1dE1zZy5Nc2dGbiA9PiB7XHJcbiAgICAgIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBnZXQgc3BlY2lmaWMgb3IgZGVmYXVsdCBtc2dFeHByZXNzaW9uXHJcbiAgICBsZXQgbXNnRXhwcmVzc2lvbjogaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICBpZiAodHlwZW9mIHRoaXNbbmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIG1zZ0V4cHJlc3Npb24gPSB0aGlzW25hbWVdIGFzIGlucHV0TXNnLk1zZ0ZuIHwgc3RyaW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbXNnRXhwcmVzc2lvbiA9IHRoaXMuZGVmYXVsdENvbmZpZy5tc2dbbmFtZV0gYXMgaW5wdXRNc2cuTXNnRm4gfCBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGEgbWVzc2FnZSBnZW5lcmF0ZWQgYnkgTXNnRm4oKSBvciBhcyBhIHNpbWxlIHN0cmluZ1xyXG4gICAgaWYgKGlzRm4obXNnRXhwcmVzc2lvbikpIHtcclxuICAgICAgdGhpcy5tZXNzYWdlc1tuYW1lXSA9IG1zZ0V4cHJlc3Npb24odGhpcy5pbnB1dFBhcmFtcy5sYWJlbCwgdGhpcy5pbnB1dFBhcmFtcy52YWxpZGF0aW9uUGFyYW1zW25hbWVdLnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZXNbbmFtZV0gPSBtc2dFeHByZXNzaW9uO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==