/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { NumberValidatorFactory } from './number-validator-factory.service';
var InputNumberDirective = /** @class */ (function (_super) {
    tslib_1.__extends(InputNumberDirective, _super);
    function InputNumberDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            integer: function () {
                return {
                    name: 'integer',
                    set: _super.prototype.hasBoolaenParam.call(_this, 'integer')
                };
            },
            max: function () {
                return {
                    name: 'max',
                    set: _super.prototype.hasNumberParam.call(_this, 'max'),
                    value: +_this.max
                };
            },
            min: function () {
                return {
                    name: 'min',
                    set: _super.prototype.hasNumberParam.call(_this, 'min'),
                    value: +_this.min
                };
            }
        };
        return _this;
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
    InputNumberDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: NumberValidatorFactory }
    ]; };
    InputNumberDirective.propDecorators = {
        integer: [{ type: Input }],
        max: [{ type: Input }],
        min: [{ type: Input }]
    };
    return InputNumberDirective;
}(AbstractInput));
export { InputNumberDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbnVtYmVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvaW5wdXQtbnVtYmVyL2lucHV0LW51bWJlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7SUFhbEMsZ0RBQWE7SUE2QnJELDhCQUNZLE9BQW1CLEVBQ25CLG1CQUF3QyxFQUN4QyxnQkFBd0M7UUFIcEQsWUFLRSxrQkFBTSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsU0FDdEQ7UUFMVyxhQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtpQ0ExQnZCO1lBQzNCLE9BQU8sRUFBRTtnQkFDUCxNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsR0FBRyxFQUFFLGlCQUFNLGVBQWUsYUFBQyxTQUFTLENBQUM7aUJBQ3RDLENBQUM7YUFDSDtZQUNELEdBQUcsRUFBRTtnQkFDSCxNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsR0FBRyxFQUFFLGlCQUFNLGNBQWMsYUFBQyxLQUFLLENBQUM7b0JBQ2hDLEtBQUssRUFBRSxDQUFDLEtBQUksQ0FBQyxHQUFHO2lCQUNqQixDQUFDO2FBQ0g7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLEdBQUcsRUFBRSxpQkFBTSxjQUFjLGFBQUMsS0FBSyxDQUFDO29CQUNoQyxLQUFLLEVBQUUsQ0FBQyxLQUFJLENBQUMsR0FBRztpQkFDakIsQ0FBQzthQUNIO1NBQ0Y7O0tBUUE7O2dCQTlDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztvQkFDaEQsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixXQUFXLEVBQUUsb0JBQW9COzRCQUNqQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCxzQkFBc0I7cUJBQ3ZCO2lCQUNGOzs7O2dCQWpCbUIsVUFBVTtnQkFJckIsbUJBQW1CO2dCQUNuQixzQkFBc0I7OzswQkFlNUIsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7OytCQXRCUjtFQWtCMEMsYUFBYTtTQUExQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBBYnN0cmFjdElucHV0IH0gZnJvbSAnLi4vbW9kZWxzL2Fic3RyYWN0LWlucHV0JztcclxuaW1wb3J0IHsgSW5wdXRTdG9yYWdlU2VydmljZSB9IGZyb20gJy4uL2lucHV0LXN0b3JhZ2Uuc2VydmljZSc7XHJcbmltcG9ydCB7IE51bWJlclZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL251bWJlci12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXROdW1iZXJdW3R5cGU9XCJudW1iZXJcIl0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXROdW1iZXJEaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgTnVtYmVyVmFsaWRhdG9yRmFjdG9yeVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIElucHV0TnVtYmVyRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCB7XHJcblxyXG4gIEBJbnB1dCgpIHB1YmxpYyBpbnRlZ2VyOiAnJyB8IGJvb2xlYW47XHJcbiAgQElucHV0KCkgcHVibGljIG1heDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW46IHN0cmluZyB8IG51bWJlcjtcclxuXHJcbiAgcHJvdGVjdGVkIHZhbGlkYXRvck9wdGlvbnMgPSB7XHJcbiAgICBpbnRlZ2VyOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ2ludGVnZXInLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzQm9vbGFlblBhcmFtKCdpbnRlZ2VyJylcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtYXg6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnbWF4JyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc051bWJlclBhcmFtKCdtYXgnKSxcclxuICAgICAgICB2YWx1ZTogK3RoaXMubWF4XHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgbWluOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21pbicsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWluJyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1pblxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIGVsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRTdG9yYWdlU2VydmljZTogSW5wdXRTdG9yYWdlU2VydmljZSxcclxuICAgIHByb3RlY3RlZCB2YWxpZGF0b3JGYWN0b3J5OiBOdW1iZXJWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==