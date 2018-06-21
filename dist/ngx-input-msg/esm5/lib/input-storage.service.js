/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * This utility service stores input element params
 * for communication between ngxInput directive,
 * ngx-msg component and ngxLabel directive.
 */
var InputStorageService = /** @class */ (function () {
    function InputStorageService() {
        this.storageById = {};
        /**
         * Note, this storage is provided, because
         * user might set id or name attribute to
         * the input element or even both of them.
         */
        this.storageByName = {};
    }
    /**
     * @param {?} key
     * @return {?}
     */
    InputStorageService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.storageById[key] || this.storageByName[key];
    };
    /**
     * @param {?} key
     * @return {?}
     */
    InputStorageService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.removeFromSpecificStorage('storageById', key);
        this.removeFromSpecificStorage('storageByName', key);
    };
    /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    InputStorageService.prototype.set = /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    function (input, id, name) {
        if (id) {
            this.storageById[id] = input;
        }
        if (name) {
            this.storageByName[name] = input;
        }
    };
    /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    InputStorageService.prototype.removeFromSpecificStorage = /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    function (storage, key) {
        if (!this[storage][key]) {
            return;
        }
        delete this[storage][key];
    };
    InputStorageService.decorators = [
        { type: Injectable },
    ];
    return InputStorageService;
}());
export { InputStorageService };
function InputStorageService_tsickle_Closure_declarations() {
    /** @type {?} */
    InputStorageService.prototype.storageById;
    /**
     * Note, this storage is provided, because
     * user might set id or name attribute to
     * the input element or even both of them.
     * @type {?}
     */
    InputStorageService.prototype.storageByName;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OzJCQWNyQyxFQUFFOzs7Ozs7NkJBU0YsRUFBRTs7Ozs7O0lBRUMsaUNBQUc7Ozs7Y0FBQyxHQUFXO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztJQUduRCxvQ0FBTTs7OztjQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMseUJBQXlCLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7OztJQUdoRCxpQ0FBRzs7Ozs7O2NBQUMsS0FBMkIsRUFBRSxFQUFXLEVBQUUsSUFBYTtRQUNoRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDOUI7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDbEM7Ozs7Ozs7SUFJSyx1REFBeUI7Ozs7O2NBQUMsT0FBd0MsRUFBRSxHQUFXO1FBQ3JGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Z0JBdkM3QixVQUFVOzs4QkFUWDs7U0FVYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgdXRpbGl0eSBzZXJ2aWNlIHN0b3JlcyBpbnB1dCBlbGVtZW50IHBhcmFtc1xyXG4gKiBmb3IgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIG5neElucHV0IGRpcmVjdGl2ZSxcclxuICogbmd4LW1zZyBjb21wb25lbnQgYW5kIG5neExhYmVsIGRpcmVjdGl2ZS5cclxuICovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIElucHV0U3RvcmFnZVNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIHN0b3JhZ2VCeUlkOiB7XHJcbiAgICBbaWQ6IHN0cmluZ106IGlucHV0TXNnLklucHV0UGFyYW1zXHJcbiAgfSA9IHt9O1xyXG5cclxuICAvKipcclxuICAgKiBOb3RlLCB0aGlzIHN0b3JhZ2UgaXMgcHJvdmlkZWQsIGJlY2F1c2VcclxuICAgKiB1c2VyIG1pZ2h0IHNldCBpZCBvciBuYW1lIGF0dHJpYnV0ZSB0b1xyXG4gICAqIHRoZSBpbnB1dCBlbGVtZW50IG9yIGV2ZW4gYm90aCBvZiB0aGVtLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RvcmFnZUJ5TmFtZToge1xyXG4gICAgW2lkOiBzdHJpbmddOiBpbnB1dE1zZy5JbnB1dFBhcmFtc1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IGlucHV0TXNnLklucHV0UGFyYW1zIHtcclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCeUlkW2tleV0gfHwgdGhpcy5zdG9yYWdlQnlOYW1lW2tleV07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlbW92ZUZyb21TcGVjaWZpY1N0b3JhZ2UoJ3N0b3JhZ2VCeUlkJywga2V5KTtcclxuICAgIHRoaXMucmVtb3ZlRnJvbVNwZWNpZmljU3RvcmFnZSgnc3RvcmFnZUJ5TmFtZScsIGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0KGlucHV0OiBpbnB1dE1zZy5JbnB1dFBhcmFtcywgaWQ/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0aGlzLnN0b3JhZ2VCeUlkW2lkXSA9IGlucHV0O1xyXG4gICAgfVxyXG4gICAgaWYgKG5hbWUpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlQnlOYW1lW25hbWVdID0gaW5wdXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVGcm9tU3BlY2lmaWNTdG9yYWdlKHN0b3JhZ2U6ICdzdG9yYWdlQnlJZCcgfCAnc3RvcmFnZUJ5TmFtZScsIGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXNbc3RvcmFnZV1ba2V5XSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBkZWxldGUgdGhpc1tzdG9yYWdlXVtrZXldO1xyXG4gIH1cclxuXHJcbn1cclxuIl19