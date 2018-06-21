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
export class MsgComponent {
    /**
     * @param {?} configService
     * @param {?} storageService
     */
    constructor(configService, storageService) {
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
    getClasses() {
        const /** @type {?} */ position = this.position || this.configService.get().position;
        return {
            'ngx-msg_pos_bottom-left': position === 'bottom-left',
            'ngx-msg_pos_bottom-right': position === 'bottom-right',
            'ngx-msg_color_tooltip': this.currentStatus === 'maxlength',
            'ngx-msg_material': this.inputParams.material
        };
    }
    /**
     * @return {?}
     */
    getStyles() {
        let /** @type {?} */ color;
        if (this.currentStatus === 'maxlength') {
            color = this.defaultConfig.colors.maxlength;
        }
        else {
            color = this.defaultConfig.colors.error;
        }
        return { color: color };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const /** @type {?} */ changeableProps = {
            email: true,
            integer: true,
            max: true,
            maxlength: true,
            min: true,
            minlength: true,
            position: true,
            required: true
        };
        Object.keys(changes).forEach(name => {
            if (!changeableProps[name] || changes[name].isFirstChange()) {
                return;
            }
            this.setMessage(/** @type {?} */ (name));
            // update currentMsg if it has been changed
            // and the input is invalid
            if (this.currentStatus === name && name !== 'maxlength') {
                this.currentMsg = this.messages[name];
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.defaultConfig = this.configService.get();
        if (!this.for) {
            throw new Error('ngxMsg component: \'for\' parameter with the input id or name must be provided.');
        }
        this.inputParams = this.storageService.get(this.for);
        if (!this.inputParams) {
            throw new Error(`ngxMsg component: can\'t find the input element with id or name: ${this.for}`);
        }
        // Set default or custom messages for given validation params
        this.setAllMessages();
        // Listen to the input status
        const /** @type {?} */ statusSub = this.inputParams.status
            .subscribe(this.onStatusChange.bind(this));
        this.subscriptions.push(statusSub);
        // Listen to the input params change
        const /** @type {?} */ inputParamsChangeSub = this.inputParams.paramChange
            .subscribe(this.onInputParamsChange.bind(this));
        this.subscriptions.push(inputParamsChangeSub);
    }
    /**
     * @param {?} changedPropName
     * @return {?}
     */
    onInputParamsChange(changedPropName) {
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
    }
    /**
     * @param {?} status
     * @return {?}
     */
    onStatusChange(status) {
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
                setTimeout(() => { this.currentMsg = ''; }, 2000);
                break;
            default:
                this.currentMsg = this.messages[status];
        }
    }
    /**
     * @return {?}
     */
    setAllMessages() {
        Object.keys(this.inputParams.validationParams).forEach((name) => {
            this.setMessage(name);
        });
    }
    /**
     * @param {?} name
     * @return {?}
     */
    setMessage(name) {
        if (!this.inputParams.validationParams[name]) {
            return;
        }
        // helper type guard
        const /** @type {?} */ isFn = (arg) => {
            return typeof arg === 'function';
        };
        // get specific or default msgExpression
        let /** @type {?} */ msgExpression;
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
    }
}
MsgComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-msg',
                template: `<div class="ngx-msg__container" 
  [ngClass]="getClasses()"
  [ngStyle]="getStyles()"
  >

  <span *ngIf="currentMsg" [@msgAnimation]>
    {{currentMsg}}
  </span>

</div>
`,
                styles: [`.ngx-msg__mat-form-field{margin-bottom:16px;width:100%}.ngx-msg__container{display:block;font-size:12px;min-height:20px;margin-top:3px}.ngx-msg_material{margin-top:-33px}.ngx-msg_pos_bottom-left{text-align:left}.ngx-msg_pos_bottom-right{text-align:right}`],
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
MsgComponent.ctorParameters = () => [
    { type: InputMsgConfigService },
    { type: InputStorageService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvbXNnL21zZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE4QyxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoSCxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSWpGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7OztBQXNDL0QsTUFBTTs7Ozs7SUFpQ0osWUFDVSxlQUNBO1FBREEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsbUJBQWMsR0FBZCxjQUFjOzs7Ozt3QkFMZSxFQUFFOzZCQUNELEVBQUU7S0FLckM7Ozs7SUFFRSxVQUFVO1FBRWYsdUJBQU0sUUFBUSxHQUFtQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ3BHLE1BQU0sQ0FBQztZQUNMLHlCQUF5QixFQUFFLFFBQVEsS0FBSyxhQUFhO1lBQ3JELDBCQUEwQixFQUFFLFFBQVEsS0FBSyxjQUFjO1lBQ3ZELHVCQUF1QixFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVztZQUMzRCxrQkFBa0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVE7U0FDOUMsQ0FBQzs7Ozs7SUFHRyxTQUFTO1FBRWQscUJBQUksS0FBYSxDQUFDO1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFN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RTt3QkFDdEIsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdEMsVUFBVSxDQUFDLFdBQVcsRUFBRTs0QkFDdEIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzRCQUNyQixPQUFPLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNoRCxDQUFDO3dCQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7NEJBQ3RCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDckIsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDaEQsQ0FBQztxQkFDSCxDQUFDO2lCQUNIO2FBQ0Y7Ozs7WUF0Q1EscUJBQXFCO1lBQ3JCLG1CQUFtQjs7O2tCQTJDekIsS0FBSztvQkFLTCxLQUFLO3NCQUNMLEtBQUs7a0JBQ0wsS0FBSzt3QkFDTCxLQUFLO2tCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL2lucHV0LW1zZy1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIGEgbWVzc2FnZSBmb3IgYW4gaW5wdXQgZWxlbWVudFxyXG4gKiBkZXBlbmRpbmcgb24gaXRgcyB2YWxpZGF0aW9uIHN0YXR1cy5cclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LW1zZycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmd4LW1zZ19fY29udGFpbmVyXCIgXHJcbiAgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NlcygpXCJcclxuICBbbmdTdHlsZV09XCJnZXRTdHlsZXMoKVwiXHJcbiAgPlxyXG5cclxuICA8c3BhbiAqbmdJZj1cImN1cnJlbnRNc2dcIiBbQG1zZ0FuaW1hdGlvbl0+XHJcbiAgICB7e2N1cnJlbnRNc2d9fVxyXG4gIDwvc3Bhbj5cclxuXHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2Aubmd4LW1zZ19fbWF0LWZvcm0tZmllbGR7bWFyZ2luLWJvdHRvbToxNnB4O3dpZHRoOjEwMCV9Lm5neC1tc2dfX2NvbnRhaW5lcntkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxMnB4O21pbi1oZWlnaHQ6MjBweDttYXJnaW4tdG9wOjNweH0ubmd4LW1zZ19tYXRlcmlhbHttYXJnaW4tdG9wOi0zM3B4fS5uZ3gtbXNnX3Bvc19ib3R0b20tbGVmdHt0ZXh0LWFsaWduOmxlZnR9Lm5neC1tc2dfcG9zX2JvdHRvbS1yaWdodHt0ZXh0LWFsaWduOnJpZ2h0fWBdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignbXNnQW5pbWF0aW9uJywgW1xyXG4gICAgICBzdGF0ZSgnYWN0aXZlJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xyXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLWluJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xyXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSB9KSxcclxuICAgICAgICBhbmltYXRlKCcyNTBtcyBlYXNlLWluJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICBdKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNc2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gaW5wdXQgaWQgb3IgbmFtZSBhdHRyaWJ1dGVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9yOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogT3B0aW9uYWwgcGFyYW1zIHdpdGggY3VzdG9tIG1lc3NhZ2VzXHJcbiAgICogdG8gb3ZlcndyaXRlIHRoZSBkZWZhdWx0IG9uZXNcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZW1haWw6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBpbnRlZ2VyOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWF4OiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWF4bGVuZ3RoOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWluOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgbWlubGVuZ3RoOiBzdHJpbmcgfCBpbnB1dE1zZy5Nc2dGbjtcclxuICBASW5wdXQoKSBwdWJsaWMgcGF0dGVybjogc3RyaW5nIHwgaW5wdXRNc2cuTXNnRm47XHJcbiAgQElucHV0KCkgcHVibGljIHBvc2l0aW9uOiBpbnB1dE1zZy5Qb3NpdGlvbjtcclxuICBASW5wdXQoKSBwdWJsaWMgcmVxdWlyZWQ6IHN0cmluZyB8IGlucHV0TXNnLk1zZ0ZuO1xyXG5cclxuICAvLyBDdXJyZW50bHkgc2hvd24gbWVzc2FnZVxyXG4gIHB1YmxpYyBjdXJyZW50TXNnOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgY3VycmVudFN0YXR1czogaW5wdXRNc2cuSW5wdXRTdGF0dXM7XHJcbiAgcHJpdmF0ZSBkZWZhdWx0Q29uZmlnOiBpbnB1dE1zZy5Db25maWc7XHJcbiAgcHJpdmF0ZSBpbnB1dFBhcmFtczogaW5wdXRNc2cuSW5wdXRQYXJhbXM7XHJcbiAgLyoqXHJcbiAgICogQWxsIGF2YWlsYWJsZSBtZXNzYWdlcyBjb3JyZXNwb25kZWRcclxuICAgKiB0byB2YWxpZGF0aW9uIHBhcmFtcyBvZiB0aGUgaW5wdXRcclxuICAgKi9cclxuICBwcml2YXRlIG1lc3NhZ2VzOiBpbnB1dE1zZy5SZXN1bHRNc2cgPSB7fTtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb25maWdTZXJ2aWNlOiBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIGdldENsYXNzZXMoKTogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9IHtcclxuXHJcbiAgICBjb25zdCBwb3NpdGlvbjogJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnID0gdGhpcy5wb3NpdGlvbiB8fCB0aGlzLmNvbmZpZ1NlcnZpY2UuZ2V0KCkucG9zaXRpb247XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAnbmd4LW1zZ19wb3NfYm90dG9tLWxlZnQnOiBwb3NpdGlvbiA9PT0gJ2JvdHRvbS1sZWZ0JyxcclxuICAgICAgJ25neC1tc2dfcG9zX2JvdHRvbS1yaWdodCc6IHBvc2l0aW9uID09PSAnYm90dG9tLXJpZ2h0JyxcclxuICAgICAgJ25neC1tc2dfY29sb3JfdG9vbHRpcCc6IHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ21heGxlbmd0aCcsXHJcbiAgICAgICduZ3gtbXNnX21hdGVyaWFsJzogdGhpcy5pbnB1dFBhcmFtcy5tYXRlcmlhbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdHlsZXMoKTogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0ge1xyXG5cclxuICAgIGxldCBjb2xvcjogc3RyaW5nO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ21heGxlbmd0aCcpIHtcclxuICAgICAgY29sb3IgPSB0aGlzLmRlZmF1bHRDb25maWcuY29sb3JzLm1heGxlbmd0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbG9yID0gdGhpcy5kZWZhdWx0Q29uZmlnLmNvbG9ycy5lcnJvcjtcclxuICAgIH1cclxuICAgIHJldHVybiB7IGNvbG9yOiBjb2xvciB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3A6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgY2hhbmdlYWJsZVByb3BzID0ge1xyXG4gICAgICBlbWFpbDogdHJ1ZSxcclxuICAgICAgaW50ZWdlcjogdHJ1ZSxcclxuICAgICAgbWF4OiB0cnVlLFxyXG4gICAgICBtYXhsZW5ndGg6IHRydWUsXHJcbiAgICAgIG1pbjogdHJ1ZSxcclxuICAgICAgbWlubGVuZ3RoOiB0cnVlLFxyXG4gICAgICBwb3NpdGlvbjogdHJ1ZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmtleXMoY2hhbmdlcykuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgaWYgKCFjaGFuZ2VhYmxlUHJvcHNbbmFtZV0gfHwgY2hhbmdlc1tuYW1lXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKG5hbWUgYXMgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk7XHJcblxyXG4gICAgICAvLyB1cGRhdGUgY3VycmVudE1zZyBpZiBpdCBoYXMgYmVlbiBjaGFuZ2VkXHJcbiAgICAgIC8vIGFuZCB0aGUgaW5wdXQgaXMgaW52YWxpZFxyXG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RhdHVzID09PSBuYW1lICYmIG5hbWUgIT09ICdtYXhsZW5ndGgnKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TXNnID0gdGhpcy5tZXNzYWdlc1tuYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHRoaXMuY29uZmlnU2VydmljZS5nZXQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmd4TXNnIGNvbXBvbmVudDogXFwnZm9yXFwnIHBhcmFtZXRlciB3aXRoIHRoZSBpbnB1dCBpZCBvciBuYW1lIG11c3QgYmUgcHJvdmlkZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnB1dFBhcmFtcyA9IHRoaXMuc3RvcmFnZVNlcnZpY2UuZ2V0KHRoaXMuZm9yKTtcclxuICAgIGlmICghdGhpcy5pbnB1dFBhcmFtcykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYG5neE1zZyBjb21wb25lbnQ6IGNhblxcJ3QgZmluZCB0aGUgaW5wdXQgZWxlbWVudCB3aXRoIGlkIG9yIG5hbWU6ICR7dGhpcy5mb3J9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2V0IGRlZmF1bHQgb3IgY3VzdG9tIG1lc3NhZ2VzIGZvciBnaXZlbiB2YWxpZGF0aW9uIHBhcmFtc1xyXG4gICAgdGhpcy5zZXRBbGxNZXNzYWdlcygpO1xyXG5cclxuICAgIC8vIExpc3RlbiB0byB0aGUgaW5wdXQgc3RhdHVzXHJcbiAgICBjb25zdCBzdGF0dXNTdWI6IFN1YnNjcmlwdGlvbiA9IHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzXHJcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5vblN0YXR1c0NoYW5nZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN0YXR1c1N1Yik7XHJcblxyXG4gICAgLy8gTGlzdGVuIHRvIHRoZSBpbnB1dCBwYXJhbXMgY2hhbmdlXHJcbiAgICBjb25zdCBpbnB1dFBhcmFtc0NoYW5nZVN1YjogU3Vic2NyaXB0aW9uID0gdGhpcy5pbnB1dFBhcmFtcy5wYXJhbUNoYW5nZVxyXG4gICAgICAuc3Vic2NyaWJlKHRoaXMub25JbnB1dFBhcmFtc0NoYW5nZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKGlucHV0UGFyYW1zQ2hhbmdlU3ViKTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZXMgbWVzc2FnZXMgd2hlbiBpbnB1dCBwYXJhbXMgY2hhbmdlXHJcbiAgcHJpdmF0ZSBvbklucHV0UGFyYW1zQ2hhbmdlKGNoYW5nZWRQcm9wTmFtZTogJ2xhYmVsJyB8IGlucHV0TXNnLlZhbGlkYXRvck5hbWUpOiB2b2lkIHtcclxuXHJcbiAgICBpZiAoY2hhbmdlZFByb3BOYW1lID09PSAnbGFiZWwnKSB7XHJcbiAgICAgIHRoaXMuc2V0QWxsTWVzc2FnZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2V0TWVzc2FnZShjaGFuZ2VkUHJvcE5hbWUgYXMgaW5wdXRNc2cuVmFsaWRhdG9yTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIGN1cnJlbnQgbXNnIGlmIHRoZSBpbnB1dCBpcyBpbnZhbGlkXHJcbiAgICBpZiAodGhpcy5jdXJyZW50U3RhdHVzID09PSAncHJpc3RpbmUnIHx8XHJcbiAgICAgIHRoaXMuY3VycmVudFN0YXR1cyA9PT0gJ3ZhbGlkJyB8fFxyXG4gICAgICB0aGlzLmN1cnJlbnRTdGF0dXMgPT09ICdtYXhsZW5ndGgnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuY3VycmVudE1zZyA9IHRoaXMubWVzc2FnZXNbdGhpcy5jdXJyZW50U3RhdHVzXTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZXMgY3VycmVudFN0YXR1cyBhbmQgc2hvd3MvaGlkZXMgY3VycmVudE1zZ1xyXG4gIHByaXZhdGUgb25TdGF0dXNDaGFuZ2Uoc3RhdHVzOiBpbnB1dE1zZy5JbnB1dFN0YXR1cyk6IHZvaWQge1xyXG5cclxuICAgIHRoaXMuY3VycmVudFN0YXR1cyA9IHN0YXR1cztcclxuICAgIHN3aXRjaCAoc3RhdHVzKSB7XHJcbiAgICAgIGNhc2UgJ3ByaXN0aW5lJzpcclxuICAgICAgICB0aGlzLmN1cnJlbnRNc2cgPSAnJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndmFsaWQnOlxyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9ICcnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtYXhsZW5ndGgnOlxyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9IHRoaXMubWVzc2FnZXNbc3RhdHVzXTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5jdXJyZW50TXNnID0gJyc7IH0sIDIwMDApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuY3VycmVudE1zZyA9IHRoaXMubWVzc2FnZXNbc3RhdHVzXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QWxsTWVzc2FnZXMoKTogdm9pZCB7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXMpLmZvckVhY2goKG5hbWU6IGlucHV0TXNnLlZhbGlkYXRvck5hbWUpID0+IHtcclxuICAgICAgdGhpcy5zZXRNZXNzYWdlKG5hbWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBTZXRzIG1lc3NhZ2UgdGV4dCBmb3IgYSBnaXZlbiB2YWxpZGF0aW9uIHBhcmFtZXRlci5cclxuICAvLyBJZiBhcHByb3ByaWF0ZSBtZXNzYWdlIGV4cHJlc3Npb24gaXMgbm90IHByb3ZpZGVkXHJcbiAgLy8gdGhyb2doIEBJbnB1dCgpIGJpbmRpbmcgLSB0aGUgZGVmYXVsdCBvbmUgaXMgdXNlZCBpbnN0ZWFkLlxyXG4gIHByaXZhdGUgc2V0TWVzc2FnZShuYW1lOiBpbnB1dE1zZy5WYWxpZGF0b3JOYW1lKTogdm9pZCB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlucHV0UGFyYW1zLnZhbGlkYXRpb25QYXJhbXNbbmFtZV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGhlbHBlciB0eXBlIGd1YXJkXHJcbiAgICBjb25zdCBpc0ZuID0gKGFyZzogc3RyaW5nIHwgRnVuY3Rpb24pOiBhcmcgaXMgaW5wdXRNc2cuTXNnRm4gPT4ge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcclxuICAgIH07XHJcblxyXG4gICAgLy8gZ2V0IHNwZWNpZmljIG9yIGRlZmF1bHQgbXNnRXhwcmVzc2lvblxyXG4gICAgbGV0IG1zZ0V4cHJlc3Npb246IGlucHV0TXNnLk1zZ0ZuIHwgc3RyaW5nO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzW25hbWVdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBtc2dFeHByZXNzaW9uID0gdGhpc1tuYW1lXSBhcyBpbnB1dE1zZy5Nc2dGbiB8IHN0cmluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1zZ0V4cHJlc3Npb24gPSB0aGlzLmRlZmF1bHRDb25maWcubXNnW25hbWVdIGFzIGlucHV0TXNnLk1zZ0ZuIHwgc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCBhIG1lc3NhZ2UgZ2VuZXJhdGVkIGJ5IE1zZ0ZuKCkgb3IgYXMgYSBzaW1sZSBzdHJpbmdcclxuICAgIGlmIChpc0ZuKG1zZ0V4cHJlc3Npb24pKSB7XHJcbiAgICAgIHRoaXMubWVzc2FnZXNbbmFtZV0gPSBtc2dFeHByZXNzaW9uKHRoaXMuaW5wdXRQYXJhbXMubGFiZWwsIHRoaXMuaW5wdXRQYXJhbXMudmFsaWRhdGlvblBhcmFtc1tuYW1lXS52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1lc3NhZ2VzW25hbWVdID0gbXNnRXhwcmVzc2lvbjtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=