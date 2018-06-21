/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { EmailValidatorFactory } from './email-validator-factory.service';
import { InputStorageService } from '../input-storage.service';
var InputEmailDirective = /** @class */ (function (_super) {
    tslib_1.__extends(InputEmailDirective, _super);
    function InputEmailDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            email: function () {
                // The email validator is always set by default
                return {
                    name: 'email',
                    set: true
                };
            }
        };
        return _this;
    }
    InputEmailDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngxInputEmail]',
                    providers: [
                        {
                            provide: NG_VALIDATORS,
                            useExisting: InputEmailDirective,
                            multi: true
                        },
                        EmailValidatorFactory
                    ]
                },] },
    ];
    /** @nocollapse */
    InputEmailDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: EmailValidatorFactory }
    ]; };
    return InputEmailDirective;
}(AbstractInput));
export { InputEmailDirective };
function InputEmailDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InputEmailDirective.prototype.validatorOptions;
    /** @type {?} */
    InputEmailDirective.prototype.elemRef;
    /** @type {?} */
    InputEmailDirective.prototype.inputStorageService;
    /** @type {?} */
    InputEmailDirective.prototype.validatorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZW1haWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQWF0QiwrQ0FBYTtJQVlwRCw2QkFDWSxPQUFtQixFQUNuQixtQkFBd0MsRUFDeEMsZ0JBQXVDO1FBSG5ELFlBS0Usa0JBQU0sT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLFNBQ3REO1FBTFcsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQix5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBdUI7aUNBYnRCO1lBQzNCLEtBQUssRUFBRTs7Z0JBRUwsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7YUFDSDtTQUNGOztLQVFBOztnQkE3QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsYUFBYTs0QkFDdEIsV0FBVyxFQUFFLG1CQUFtQjs0QkFDaEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0QscUJBQXFCO3FCQUN0QjtpQkFDRjs7OztnQkFqQm1CLFVBQVU7Z0JBS3JCLG1CQUFtQjtnQkFEbkIscUJBQXFCOzs4QkFKOUI7RUFrQnlDLGFBQWE7U0FBekMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBYnN0cmFjdElucHV0IH0gZnJvbSAnLi4vbW9kZWxzL2Fic3RyYWN0LWlucHV0JztcclxuaW1wb3J0IHsgRW1haWxWYWxpZGF0b3JGYWN0b3J5IH0gZnJvbSAnLi9lbWFpbC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0RW1haWxdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgICAgdXNlRXhpc3Rpbmc6IElucHV0RW1haWxEaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgRW1haWxWYWxpZGF0b3JGYWN0b3J5XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW5wdXRFbWFpbERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQge1xyXG5cclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICAgIGVtYWlsOiAoKSA9PiB7XHJcbiAgICAgIC8vIFRoZSBlbWFpbCB2YWxpZGF0b3IgaXMgYWx3YXlzIHNldCBieSBkZWZhdWx0XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ2VtYWlsJyxcclxuICAgICAgICBzZXQ6IHRydWVcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogRW1haWxWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==