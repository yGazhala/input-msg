/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';
/**
 * Adds/removes 'ngx-input_invalid' css class
 * when input status changes
 */
var LabelDirective = /** @class */ (function () {
    function LabelDirective(configService, elemRef, inputStorageService) {
        this.configService = configService;
        this.elemRef = elemRef;
        this.inputStorageService = inputStorageService;
    }
    /**
     * @return {?}
     */
    LabelDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.valid && this.valid.unsubscribe) {
            this.valid.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    LabelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.elem = this.elemRef.nativeElement;
        this.highlightColor = this.configService.get().colors.error;
        if (!this.for) {
            throw new Error('ngxLabel directive: \'for\' attribute with input id or name is required.');
        }
        this.setAnimation();
        // Wait till the input element will be initialized.
        // We should wait in case the label element was
        // inserted before the input.
        setTimeout(function () {
            var /** @type {?} */ inputParams = _this.inputStorageService.get(_this.for);
            if (!inputParams) {
                throw new Error("ngxLabel directive: can't find the input element with id or name: " + _this.for);
            }
            _this.valid = inputParams.valid;
            _this.valid.subscribe(function (valid) {
                _this.toggleClassOnValidChange(valid);
                _this.highlightOnValidChange(valid);
            });
        }, 0);
    };
    /**
     * @param {?} valid
     * @return {?}
     */
    LabelDirective.prototype.highlightOnValidChange = /**
     * @param {?} valid
     * @return {?}
     */
    function (valid) {
        if (valid) {
            this.elem.style.color = '';
        }
        else {
            this.elem.style.color = this.highlightColor;
        }
    };
    /**
     * @return {?}
     */
    LabelDirective.prototype.setAnimation = /**
     * @return {?}
     */
    function () {
        this.elem.style.transition = 'color 250ms ease-in';
    };
    /**
     * @param {?} valid
     * @return {?}
     */
    LabelDirective.prototype.toggleClassOnValidChange = /**
     * @param {?} valid
     * @return {?}
     */
    function (valid) {
        if (valid) {
            this.elem.classList.remove('ngx-input_invalid');
        }
        else {
            this.elem.classList.add('ngx-input_invalid');
        }
    };
    LabelDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngxLabel]'
                },] },
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: InputMsgConfigService },
        { type: ElementRef },
        { type: InputStorageService }
    ]; };
    LabelDirective.propDecorators = {
        for: [{ type: Input }]
    };
    return LabelDirective;
}());
export { LabelDirective };
function LabelDirective_tsickle_Closure_declarations() {
    /**
     * input element id or name
     * @type {?}
     */
    LabelDirective.prototype.for;
    /** @type {?} */
    LabelDirective.prototype.elem;
    /** @type {?} */
    LabelDirective.prototype.highlightColor;
    /** @type {?} */
    LabelDirective.prototype.valid;
    /** @type {?} */
    LabelDirective.prototype.configService;
    /** @type {?} */
    LabelDirective.prototype.elemRef;
    /** @type {?} */
    LabelDirective.prototype.inputStorageService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9sYWJlbC9sYWJlbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7OztJQXNCN0Qsd0JBQ1UsZUFDQSxTQUNBO1FBRkEsa0JBQWEsR0FBYixhQUFhO1FBQ2IsWUFBTyxHQUFQLE9BQU87UUFDUCx3QkFBbUIsR0FBbkIsbUJBQW1CO0tBQ3hCOzs7O0lBRUUsb0NBQVc7Ozs7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMxQjs7Ozs7SUFHSSxpQ0FBUTs7Ozs7UUFFYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRTVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDBFQUEwRSxDQUFDLENBQUM7U0FDN0Y7UUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7UUFLcEIsVUFBVSxDQUFDO1lBQ1QscUJBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RUFBc0UsS0FBSSxDQUFDLEdBQUssQ0FBQyxDQUFDO2FBQ25HO1lBRUQsS0FBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBYztnQkFDbEMsS0FBSSxDQUFDLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1NBRUosRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR0EsK0NBQXNCOzs7O2NBQUMsS0FBYztRQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUM1QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDN0M7Ozs7O0lBR0sscUNBQVk7Ozs7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDOzs7Ozs7SUFHN0MsaURBQXdCOzs7O2NBQUMsS0FBYztRQUM3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDakQ7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzlDOzs7Z0JBeEVKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBWFEscUJBQXFCO2dCQUpnQixVQUFVO2dCQUsvQyxtQkFBbUI7OztzQkFnQnpCLEtBQUs7O3lCQXJCUjs7U0FnQmEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IElucHV0TXNnQ29uZmlnU2VydmljZSB9IGZyb20gJy4uL2lucHV0LW1zZy1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IElucHV0U3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQWRkcy9yZW1vdmVzICduZ3gtaW5wdXRfaW52YWxpZCcgY3NzIGNsYXNzXHJcbiAqIHdoZW4gaW5wdXQgc3RhdHVzIGNoYW5nZXNcclxuICovXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW25neExhYmVsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIExhYmVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKipcclxuICAgKiBpbnB1dCBlbGVtZW50IGlkIG9yIG5hbWVcclxuICAgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgZm9yOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgZWxlbTogSFRNTExhYmVsRWxlbWVudDtcclxuICBwcml2YXRlIGhpZ2hsaWdodENvbG9yOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSB2YWxpZDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29uZmlnU2VydmljZTogSW5wdXRNc2dDb25maWdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0b3JhZ2VTZXJ2aWNlOiBJbnB1dFN0b3JhZ2VTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudmFsaWQgJiYgdGhpcy52YWxpZC51bnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLnZhbGlkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgdGhpcy5lbGVtID0gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmhpZ2hsaWdodENvbG9yID0gdGhpcy5jb25maWdTZXJ2aWNlLmdldCgpLmNvbG9ycy5lcnJvcjtcclxuXHJcbiAgICBpZiAoIXRoaXMuZm9yKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignbmd4TGFiZWwgZGlyZWN0aXZlOiBcXCdmb3JcXCcgYXR0cmlidXRlIHdpdGggaW5wdXQgaWQgb3IgbmFtZSBpcyByZXF1aXJlZC4nKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNldEFuaW1hdGlvbigpO1xyXG5cclxuICAgIC8vIFdhaXQgdGlsbCB0aGUgaW5wdXQgZWxlbWVudCB3aWxsIGJlIGluaXRpYWxpemVkLlxyXG4gICAgLy8gV2Ugc2hvdWxkIHdhaXQgaW4gY2FzZSB0aGUgbGFiZWwgZWxlbWVudCB3YXNcclxuICAgIC8vIGluc2VydGVkIGJlZm9yZSB0aGUgaW5wdXQuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgaW5wdXRQYXJhbXMgPSB0aGlzLmlucHV0U3RvcmFnZVNlcnZpY2UuZ2V0KHRoaXMuZm9yKTtcclxuICAgICAgaWYgKCFpbnB1dFBhcmFtcykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgbmd4TGFiZWwgZGlyZWN0aXZlOiBjYW5cXCd0IGZpbmQgdGhlIGlucHV0IGVsZW1lbnQgd2l0aCBpZCBvciBuYW1lOiAke3RoaXMuZm9yfWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnZhbGlkID0gaW5wdXRQYXJhbXMudmFsaWQ7XHJcbiAgICAgIHRoaXMudmFsaWQuc3Vic2NyaWJlKCh2YWxpZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3NPblZhbGlkQ2hhbmdlKHZhbGlkKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodE9uVmFsaWRDaGFuZ2UodmFsaWQpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGlnaGxpZ2h0T25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5zdHlsZS5jb2xvciA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLnN0eWxlLmNvbG9yID0gdGhpcy5oaWdobGlnaHRDb2xvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0QW5pbWF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtLnN0eWxlLnRyYW5zaXRpb24gPSAnY29sb3IgMjUwbXMgZWFzZS1pbic7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZUNsYXNzT25WYWxpZENoYW5nZSh2YWxpZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKHZhbGlkKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QucmVtb3ZlKCduZ3gtaW5wdXRfaW52YWxpZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ25neC1pbnB1dF9pbnZhbGlkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=