/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { AbstractInput } from '../models/abstract-input';
import { InputStorageService } from '../input-storage.service';
import { TextValidatorFactory } from './text-validator-factory.service';
export class InputTextDirective extends AbstractInput {
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
            maxlength: () => {
                return {
                    name: 'maxlength',
                    set: super.hasNumberParam('maxlength'),
                    value: +this.maxlength
                };
            },
            minlength: () => {
                return {
                    name: 'minlength',
                    set: super.hasNumberParam('minlength'),
                    value: +this.minlength
                };
            },
            pattern: () => {
                return {
                    name: 'pattern',
                    set: this.pattern instanceof RegExp,
                    value: this.pattern
                };
            }
        };
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        this.maxLengthOn();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.maxLengthOff();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.maxLengthOn();
    }
    /**
     * @return {?}
     */
    emitMaxLengthStatus() {
        if (this.model.value.length === +this.maxlength) {
            this.inputParams.status.next('maxlength');
        }
    }
    /**
     * Stops generating 'maxlength' status
     * @return {?}
     */
    maxLengthOff() {
        if (this.maxLengthSub) {
            this.maxLengthSub.unsubscribe();
        }
    }
    /**
     * Starts generating 'maxlength' status
     * @return {?}
     */
    maxLengthOn() {
        if (super.hasNumberParam('maxlength') && !this.maxLengthSub) {
            this.maxLengthSub = this.model.valueChanges
                .subscribe(this.emitMaxLengthStatus.bind(this));
        }
    }
}
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
InputTextDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: InputStorageService },
    { type: TextValidatorFactory }
];
InputTextDirective.propDecorators = {
    maxlength: [{ type: Input }],
    minlength: [{ type: Input }],
    pattern: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtdGV4dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5wdXQtbXNnLyIsInNvdXJjZXMiOlsibGliL2lucHV0LXRleHQvaW5wdXQtdGV4dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBOEMsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQWN4RSxNQUFNLHlCQUEwQixTQUFRLGFBQWE7Ozs7OztJQWdDbkQsWUFDWSxPQUFtQixFQUNuQixtQkFBd0MsRUFDeEMsZ0JBQXNDO1FBRWhELEtBQUssQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUo1QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFzQjtnQ0E3QnJCO1lBQzNCLFNBQVMsRUFBRSxHQUFHLEVBQUU7Z0JBQ2QsTUFBTSxDQUFDO29CQUNMLElBQUksRUFBRSxXQUFXO29CQUNqQixHQUFHLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7b0JBQ3RDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTO2lCQUN2QixDQUFDO2FBQ0g7WUFDRCxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQztvQkFDTCxJQUFJLEVBQUUsV0FBVztvQkFDakIsR0FBRyxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO29CQUN0QyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUztpQkFDdkIsQ0FBQzthQUNIO1lBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixNQUFNLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLFlBQVksTUFBTTtvQkFDbkMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO2lCQUNwQixDQUFDO2FBQ0g7U0FDRjtLQVVBOzs7OztJQUVNLFdBQVcsQ0FBQyxPQUF5QztRQUMxRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7SUFHZCxXQUFXO1FBQ2hCLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7O0lBR2YsUUFBUTtRQUNiLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7O0lBR2IsbUJBQW1CO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzQzs7Ozs7O0lBTUssWUFBWTtRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDOzs7Ozs7SUFNSyxXQUFXO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtpQkFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNuRDs7OztZQXpGSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZDQUE2QztnQkFDdkQsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxhQUFhO3dCQUN0QixXQUFXLEVBQUUsa0JBQWtCO3dCQUMvQixLQUFLLEVBQUUsSUFBSTtxQkFDWjtvQkFDRCxvQkFBb0I7aUJBQ3JCO2FBQ0Y7Ozs7WUFuQm1CLFVBQVU7WUFNckIsbUJBQW1CO1lBQ25CLG9CQUFvQjs7O3dCQWdCMUIsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQWJzdHJhY3RJbnB1dCB9IGZyb20gJy4uL21vZGVscy9hYnN0cmFjdC1pbnB1dCc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUZXh0VmFsaWRhdG9yRmFjdG9yeSB9IGZyb20gJy4vdGV4dC12YWxpZGF0b3ItZmFjdG9yeS5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnaW5wdXRbbmd4SW5wdXRUZXh0XSwgdGV4dGFyZWFbbmd4SW5wdXRUZXh0XScsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBJbnB1dFRleHREaXJlY3RpdmUsXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICBdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0RGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RJbnB1dCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgbWF4bGVuZ3RoOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIG1pbmxlbmd0aDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwYXR0ZXJuOiBSZWdFeHA7XHJcblxyXG4gIHByb3RlY3RlZCB2YWxpZGF0b3JPcHRpb25zID0ge1xyXG4gICAgbWF4bGVuZ3RoOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ21heGxlbmd0aCcsXHJcbiAgICAgICAgc2V0OiBzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJyksXHJcbiAgICAgICAgdmFsdWU6ICt0aGlzLm1heGxlbmd0aFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIG1pbmxlbmd0aDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6ICdtaW5sZW5ndGgnLFxyXG4gICAgICAgIHNldDogc3VwZXIuaGFzTnVtYmVyUGFyYW0oJ21pbmxlbmd0aCcpLFxyXG4gICAgICAgIHZhbHVlOiArdGhpcy5taW5sZW5ndGhcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBwYXR0ZXJuOiAoKSA9PiB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogJ3BhdHRlcm4nLFxyXG4gICAgICAgIHNldDogdGhpcy5wYXR0ZXJuIGluc3RhbmNlb2YgUmVnRXhwLFxyXG4gICAgICAgIHZhbHVlOiB0aGlzLnBhdHRlcm5cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBwcml2YXRlIG1heExlbmd0aFN1YjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIGlucHV0U3RvcmFnZVNlcnZpY2U6IElucHV0U3RvcmFnZVNlcnZpY2UsXHJcbiAgICBwcm90ZWN0ZWQgdmFsaWRhdG9yRmFjdG9yeTogVGV4dFZhbGlkYXRvckZhY3RvcnlcclxuICApIHtcclxuICAgIHN1cGVyKGVsZW1SZWYsIGlucHV0U3RvcmFnZVNlcnZpY2UsIHZhbGlkYXRvckZhY3RvcnkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3A6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLm1heExlbmd0aE9mZigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkluaXQoKTtcclxuICAgIHRoaXMubWF4TGVuZ3RoT24oKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1pdE1heExlbmd0aFN0YXR1cygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1vZGVsLnZhbHVlLmxlbmd0aCA9PT0gK3RoaXMubWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuaW5wdXRQYXJhbXMuc3RhdHVzLm5leHQoJ21heGxlbmd0aCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgZ2VuZXJhdGluZyAnbWF4bGVuZ3RoJyBzdGF0dXNcclxuICAgKi9cclxuICBwcml2YXRlIG1heExlbmd0aE9mZigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1heExlbmd0aFN1Yikge1xyXG4gICAgICB0aGlzLm1heExlbmd0aFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGdlbmVyYXRpbmcgJ21heGxlbmd0aCcgc3RhdHVzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBtYXhMZW5ndGhPbigpOiB2b2lkIHtcclxuICAgIGlmIChzdXBlci5oYXNOdW1iZXJQYXJhbSgnbWF4bGVuZ3RoJykgJiYgIXRoaXMubWF4TGVuZ3RoU3ViKSB7XHJcbiAgICAgIHRoaXMubWF4TGVuZ3RoU3ViID0gdGhpcy5tb2RlbC52YWx1ZUNoYW5nZXNcclxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZW1pdE1heExlbmd0aFN0YXR1cy5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==