/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { NumberValidatorFactory } from './number-validator-factory.service';
export class InputNumberDirective extends AbstractInput {
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
            integer: () => {
                return {
                    name: 'integer',
                    set: super.hasBoolaenParam('integer')
                };
            },
            max: () => {
                return {
                    name: 'max',
                    set: super.hasNumberParam('max'),
                    value: +this.max
                };
            },
            min: () => {
                return {
                    name: 'min',
                    set: super.hasNumberParam('min'),
                    value: +this.min
                };
            }
        };
    }
}
InputNumberDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[ngxInputNumber][type="number"]',
                providers: [
                    {
                        provide: NG_VALIDATORS,
                        useExisting: InputNumberDirective,
                        multi: true
                    },
                    NumberValidatorFactory
                ]
            },] },
];
/** @nocollapse */
InputNumberDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: NumberValidatorFactory }
];
InputNumberDirective.propDecorators = {
    integer: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }]
};
function InputNumberDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InputNumberDirective.prototype.integer;
    /** @type {?} */
    InputNumberDirective.prototype.max;
    /** @type {?} */
    InputNumberDirective.prototype.min;
    /** @type {?} */
    InputNumberDirective.prototype.validatorOptions;
    /** @type {?} */
    InputNumberDirective.prototype.elemRef;
    /** @type {?} */
    InputNumberDirective.prototype.inputStorageService;
    /** @type {?} */
    InputNumberDirective.prototype.validatorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBYTVFLE1BQU0sMkJBQTRCLFNBQVEsYUFBYTs7Ozs7O0lBNkJyRCxZQUNZLE9BQW1CLEVBQ25CLG1CQUF3QyxFQUN4QyxnQkFBd0M7UUFFbEQsS0FBSyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBSjVDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO2dDQTFCdkI7WUFDM0IsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsR0FBRyxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO2lCQUN0QyxDQUFDO2FBQ0g7WUFDRCxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUNSLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxHQUFHLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7b0JBQ2hDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHO2lCQUNqQixDQUFDO2FBQ0g7WUFDRCxHQUFHLEVBQUUsR0FBRyxFQUFFO2dCQUNSLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxHQUFHLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7b0JBQ2hDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHO2lCQUNqQixDQUFDO2FBQ0g7U0FDRjtLQVFBOzs7WUE5Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsYUFBYTt3QkFDdEIsV0FBVyxFQUFFLG9CQUFvQjt3QkFDakMsS0FBSyxFQUFFLElBQUk7cUJBQ1o7b0JBQ0Qsc0JBQXNCO2lCQUN2QjthQUNGOzs7O1lBakJtQixVQUFVO1lBSXJCLG1CQUFtQjtZQUNuQixzQkFBc0I7OztzQkFlNUIsS0FBSztrQkFDTCxLQUFLO2tCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBYnN0cmFjdElucHV0IH0gZnJvbSAnLi4vbW9kZWxzL2Fic3RyYWN0LWlucHV0JztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IE51bWJlclZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL251bWJlci12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXROdW1iZXJdW3R5cGU9XCJudW1iZXJcIl0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXROdW1iZXJEaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgTnVtYmVyVmFsaWRhdG9yRmFjdG9yeVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0TnVtYmVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCB7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBpbnRlZ2VyOiAnJyB8IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcHVibGljIG1heDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW46IHN0cmluZyB8IG51bWJlcjtcclxuXHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvck9wdGlvbnMgPSB7XHJcbiAgICBpbnRlZ2VyOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ2ludGVnZXInLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzQm9vbGFlblBhcmFtKCdpbnRlZ2VyJylcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtYXg6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnbWF4JyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc051bWJlclBhcmFtKCdtYXgnKSxcclxuICAgICAgICB2YWx1ZTogK3RoaXMubWF4XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbWluOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21pbicsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWluJyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1pblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JGYWN0b3J5OiBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==