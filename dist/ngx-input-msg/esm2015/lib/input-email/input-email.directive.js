/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { EmailValidatorFactory } from './email-validator-factory.service';
import { InputStorageService } from '../input-storage.service';
export class InputEmailDirective extends AbstractInput {
    /**
     * @param {?} elemRef
     * @param {?} inputStorageService
     * @param {?} validatorFactory
     */
    constructor(elemRef, inputStorageService, validatorFactory) {
        super(elemRef, inputStorageService, validatorFactory);
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
        this.validatorFactory = validatorFactory;
        this.validatorOptions = {
            email: () => {
                // The email validator is always set by default
                return {
                    name: 'email',
                    set: true
                };
            }
        };
    }
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
InputEmailDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: EmailValidatorFactory }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZW1haWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1lbWFpbC9pbnB1dC1lbWFpbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFhL0QsTUFBTSwwQkFBMkIsU0FBUSxhQUFhOzs7Ozs7SUFZcEQsWUFDWSxPQUFtQixFQUNuQixtQkFBd0MsRUFDeEMsZ0JBQXVDO1FBRWpELEtBQUssQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUo1QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF1QjtnQ0FidEI7WUFDM0IsS0FBSyxFQUFFLEdBQUcsRUFBRTs7Z0JBRVYsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxPQUFPO29CQUNiLEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7YUFDSDtTQUNGO0tBUUE7OztZQTdCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsbUJBQW1CO3dCQUNoQyxLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxxQkFBcUI7aUJBQ3RCO2FBQ0Y7Ozs7WUFqQm1CLFVBQVU7WUFLckIsbUJBQW1CO1lBRG5CLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IEVtYWlsVmFsaWRhdG9yRmFjdG9yeSB9IGZyb20gJy4vZW1haWwtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdpbnB1dFtuZ3hJbnB1dEVtYWlsXScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBJbnB1dEVtYWlsRGlyZWN0aXZlLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIEVtYWlsVmFsaWRhdG9yRmFjdG9yeVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0RW1haWxEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdElucHV0IHtcclxuXHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvck9wdGlvbnMgPSB7XHJcbiAgICBlbWFpbDogKCkgPT4ge1xyXG4gICAgICAvLyBUaGUgZW1haWwgdmFsaWRhdG9yIGlzIGFsd2F5cyBzZXQgYnkgZGVmYXVsdFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdlbWFpbCcsXHJcbiAgICAgICAgc2V0OiB0cnVlXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByb3RlY3RlZCBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvckZhY3Rvcnk6IEVtYWlsVmFsaWRhdG9yRmFjdG9yeVxyXG4gICkge1xyXG4gICAgc3VwZXIoZWxlbVJlZiwgaW5wdXRTdG9yYWdlU2VydmljZSwgdmFsaWRhdG9yRmFjdG9yeSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=