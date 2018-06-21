/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { TextValidatorFactory } from './text-validator-factory.service';
var InputTextDirective = /** @class */ (function (_super) {
    tslib_1.__extends(InputTextDirective, _super);
    function InputTextDirective(elemRef, inputStorageService, validatorFactory) {
        var _this = _super.call(this, elemRef, inputStorageService, validatorFactory) || this;
        _this.elemRef = elemRef;
        _this.inputStorageService = inputStorageService;
        _this.validatorFactory = validatorFactory;
        _this.validatorOptions = {
            maxlength: function () {
                return {
                    name: 'maxlength',
                    set: _super.prototype.hasNumberParam.call(_this, 'maxlength'),
                    value: +_this.maxlength
                };
            },
            minlength: function () {
                return {
                    name: 'minlength',
                    set: _super.prototype.hasNumberParam.call(_this, 'minlength'),
                    value: +_this.minlength
                };
            },
            pattern: function () {
                return {
                    name: 'pattern',
                    set: _this.pattern instanceof RegExp,
                    value: _this.pattern
                };
            }
        };
        return _this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    InputTextDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        this.maxLengthOn();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.maxLengthOff();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.maxLengthOn();
    };
    /**
     * @return {?}
     */
    InputTextDirective.prototype.emitMaxLengthStatus = /**
     * @return {?}
     */
    function () {
        if (this.model.value.length === +this.maxlength) {
            this.inputParams.status.next('maxlength');
        }
    };
    /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    InputTextDirective.prototype.maxLengthOff = /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    function () {
        if (this.maxLengthSub) {
            this.maxLengthSub.unsubscribe();
        }
    };
    /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    InputTextDirective.prototype.maxLengthOn = /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    function () {
        if (_super.prototype.hasNumberParam.call(this, 'maxlength') && !this.maxLengthSub) {
            this.maxLengthSub = this.model.valueChanges
                .subscribe(this.emitMaxLengthStatus.bind(this));
        }
    };
    InputTextDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[ngxInputText], textarea[ngxInputText]',
                    providers: [
                        {
                            provide: NG_VALIDATORS,
                            useExisting: InputTextDirective,
                            multi: true
                        },
                        TextValidatorFactory
                    ]
                },] },
    ];
    /** @nocollapse */
    InputTextDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: InputStorageService },
        { type: TextValidatorFactory }
    ]; };
    InputTextDirective.propDecorators = {
        maxlength: [{ type: Input }],
        minlength: [{ type: Input }],
        pattern: [{ type: Input }]
    };
    return InputTextDirective;
}(AbstractInput));
export { InputTextDirective };
function InputTextDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    InputTextDirective.prototype.maxlength;
    /** @type {?} */
    InputTextDirective.prototype.minlength;
    /** @type {?} */
    InputTextDirective.prototype.pattern;
    /** @type {?} */
    InputTextDirective.prototype.validatorOptions;
    /** @type {?} */
    InputTextDirective.prototype.maxLengthSub;
    /** @type {?} */
    InputTextDirective.prototype.elemRef;
    /** @type {?} */
    InputTextDirective.prototype.inputStorageService;
    /** @type {?} */
    InputTextDirective.prototype.validatorFactory;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5wdXQtbXNnLyIsInNvdXJjZXMiOlsibGliL2lucHV0LXRleHQvaW5wdXQtdGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQThDLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUkvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0lBY2hDLDhDQUFhO0lBZ0NuRCw0QkFDWSxPQUFtQixFQUNuQixtQkFBd0MsRUFDeEMsZ0JBQXNDO1FBSGxELFlBS0Usa0JBQU0sT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLFNBQ3REO1FBTFcsYUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQix5QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0I7aUNBN0JyQjtZQUMzQixTQUFTLEVBQUU7Z0JBQ1QsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxXQUFXO29CQUNqQixHQUFHLEVBQUUsaUJBQU0sY0FBYyxhQUFDLFdBQVcsQ0FBQztvQkFDdEMsS0FBSyxFQUFFLENBQUMsS0FBSSxDQUFDLFNBQVM7aUJBQ3ZCLENBQUM7YUFDSDtZQUNELFNBQVMsRUFBRTtnQkFDVCxNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLEdBQUcsRUFBRSxpQkFBTSxjQUFjLGFBQUMsV0FBVyxDQUFDO29CQUN0QyxLQUFLLEVBQUUsQ0FBQyxLQUFJLENBQUMsU0FBUztpQkFDdkIsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsU0FBUztvQkFDZixHQUFHLEVBQUUsS0FBSSxDQUFDLE9BQU8sWUFBWSxNQUFNO29CQUNuQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE9BQU87aUJBQ3BCLENBQUM7YUFDSDtTQUNGOztLQVVBOzs7OztJQUVNLHdDQUFXOzs7O2NBQUMsT0FBeUM7UUFDMUQsaUJBQU0sV0FBVyxZQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFHZCx3Q0FBVzs7OztRQUNoQixpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7O0lBR2YscUNBQVE7Ozs7UUFDYixpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR2IsZ0RBQW1COzs7O1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzQzs7Ozs7O0lBTUsseUNBQVk7Ozs7O1FBQ2xCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7Ozs7OztJQU1LLHdDQUFXOzs7OztRQUNqQixFQUFFLENBQUMsQ0FBQyxpQkFBTSxjQUFjLFlBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtpQkFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRDs7O2dCQXpGSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDZDQUE2QztvQkFDdkQsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixXQUFXLEVBQUUsa0JBQWtCOzRCQUMvQixLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCxvQkFBb0I7cUJBQ3JCO2lCQUNGOzs7O2dCQW5CbUIsVUFBVTtnQkFNckIsbUJBQW1CO2dCQUNuQixvQkFBb0I7Ozs0QkFnQjFCLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzs2QkF6QlI7RUFxQndDLGFBQWE7U0FBeEMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEFic3RyYWN0SW5wdXQgfSBmcm9tICcuLi9tb2RlbHMvYWJzdHJhY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vaW5wdXQtc3RvcmFnZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGV4dFZhbGlkYXRvckZhY3RvcnkgfSBmcm9tICcuL3RleHQtdmFsaWRhdG9yLWZhY3Rvcnkuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W25neElucHV0VGV4dF0sIHRleHRhcmVhW25neElucHV0VGV4dF0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgICB1c2VFeGlzdGluZzogSW5wdXRUZXh0RGlyZWN0aXZlLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIFRleHRWYWxpZGF0b3JGYWN0b3J5XHJcbiAgXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIElucHV0VGV4dERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0SW5wdXQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcHVibGljIG1heGxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBtaW5sZW5ndGg6IHN0cmluZyB8IG51bWJlcjtcclxuICBASW5wdXQoKSBwdWJsaWMgcGF0dGVybjogUmVnRXhwO1xyXG5cclxuICBwcm90ZWN0ZWQgdmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICAgIG1heGxlbmd0aDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtYXhsZW5ndGgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21heGxlbmd0aCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5tYXhsZW5ndGhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBtaW5sZW5ndGg6ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lOiAnbWlubGVuZ3RoJyxcclxuICAgICAgICBzZXQ6IHN1cGVyLmhhc051bWJlclBhcmFtKCdtaW5sZW5ndGgnKSxcclxuICAgICAgICB2YWx1ZTogK3RoaXMubWlubGVuZ3RoXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgcGF0dGVybjogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdwYXR0ZXJuJyxcclxuICAgICAgICBzZXQ6IHRoaXMucGF0dGVybiBpbnN0YW5jZW9mIFJlZ0V4cCxcclxuICAgICAgICB2YWx1ZTogdGhpcy5wYXR0ZXJuXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhTdWI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcm90ZWN0ZWQgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByb3RlY3RlZCBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlLFxyXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRvckZhY3Rvcnk6IFRleHRWYWxpZGF0b3JGYWN0b3J5XHJcbiAgKSB7XHJcbiAgICBzdXBlcihlbGVtUmVmLCBpbnB1dFN0b3JhZ2VTZXJ2aWNlLCB2YWxpZGF0b3JGYWN0b3J5KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wOiBzdHJpbmddOiBTaW1wbGVDaGFuZ2UgfSk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkNoYW5nZXMoY2hhbmdlcyk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9uKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xyXG4gICAgdGhpcy5tYXhMZW5ndGhPZmYoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25Jbml0KCk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGVtaXRNYXhMZW5ndGhTdGF0dXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5tb2RlbC52YWx1ZS5sZW5ndGggPT09ICt0aGlzLm1heGxlbmd0aCkge1xyXG4gICAgICB0aGlzLmlucHV0UGFyYW1zLnN0YXR1cy5uZXh0KCdtYXhsZW5ndGgnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGdlbmVyYXRpbmcgJ21heGxlbmd0aCcgc3RhdHVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhPZmYoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5tYXhMZW5ndGhTdWIpIHtcclxuICAgICAgdGhpcy5tYXhMZW5ndGhTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0cyBnZW5lcmF0aW5nICdtYXhsZW5ndGgnIHN0YXR1c1xyXG4gICAqL1xyXG4gIHByaXZhdGUgbWF4TGVuZ3RoT24oKTogdm9pZCB7XHJcbiAgICBpZiAoc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21heGxlbmd0aCcpICYmICF0aGlzLm1heExlbmd0aFN1Yikge1xyXG4gICAgICB0aGlzLm1heExlbmd0aFN1YiA9IHRoaXMubW9kZWwudmFsdWVDaGFuZ2VzXHJcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLmVtaXRNYXhMZW5ndGhTdGF0dXMuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=