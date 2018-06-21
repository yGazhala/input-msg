/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputMsgConfigService } from './input-msg-config.service';
import { InputStorageService } from './input-storage.service';
import { InputEmailDirective } from './input-email/input-email.directive';
import { InputNumberDirective } from './input-number/input-number.directive';
import { InputTextDirective } from './input-text/input-text.directive';
import { LabelDirective } from './label/label.directive';
import { MsgComponent } from './msg/msg.component';
var InputMsgModule = /** @class */ (function () {
    function InputMsgModule() {
    }
    InputMsgModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserAnimationsModule,
                        CommonModule,
                        FormsModule
                    ],
                    declarations: [
                        InputEmailDirective,
                        InputNumberDirective,
                        InputTextDirective,
                        LabelDirective,
                        MsgComponent
                    ],
                    providers: [
                        InputMsgConfigService,
                        InputStorageService
                    ],
                    exports: [
                        InputEmailDirective,
                        InputNumberDirective,
                        InputTextDirective,
                        LabelDirective,
                        MsgComponent
                    ]
                },] },
    ];
    return InputMsgModule;
}());
export { InputMsgModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbXNnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnB1dC1tc2cvIiwic291cmNlcyI6WyJsaWIvaW5wdXQtbXNnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7O2dCQUdsRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsWUFBWTt3QkFDWixXQUFXO3FCQUNaO29CQUNELFlBQVksRUFBRTt3QkFDWixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLFlBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULHFCQUFxQjt3QkFDckIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsbUJBQW1CO3dCQUNuQixvQkFBb0I7d0JBQ3BCLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxZQUFZO3FCQUNiO2lCQUNGOzt5QkF2Q0Q7O1NBeUNhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRNc2dDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgSW5wdXRFbWFpbERpcmVjdGl2ZSB9IGZyb20gJy4vaW5wdXQtZW1haWwvaW5wdXQtZW1haWwuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSW5wdXROdW1iZXJEaXJlY3RpdmUgfSBmcm9tICcuL2lucHV0LW51bWJlci9pbnB1dC1udW1iZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgSW5wdXRUZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9pbnB1dC10ZXh0L2lucHV0LXRleHQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTGFiZWxEaXJlY3RpdmUgfSBmcm9tICcuL2xhYmVsL2xhYmVsLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1zZ0NvbXBvbmVudCB9IGZyb20gJy4vbXNnL21zZy5jb21wb25lbnQnO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBJbnB1dEVtYWlsRGlyZWN0aXZlLFxyXG4gICAgSW5wdXROdW1iZXJEaXJlY3RpdmUsXHJcbiAgICBJbnB1dFRleHREaXJlY3RpdmUsXHJcbiAgICBMYWJlbERpcmVjdGl2ZSxcclxuICAgIE1zZ0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2UsXHJcbiAgICBJbnB1dFN0b3JhZ2VTZXJ2aWNlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBJbnB1dEVtYWlsRGlyZWN0aXZlLFxyXG4gICAgSW5wdXROdW1iZXJEaXJlY3RpdmUsXHJcbiAgICBJbnB1dFRleHREaXJlY3RpdmUsXHJcbiAgICBMYWJlbERpcmVjdGl2ZSxcclxuICAgIE1zZ0NvbXBvbmVudFxyXG4gIF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1zZ01vZHVsZSB7IH1cclxuIl19