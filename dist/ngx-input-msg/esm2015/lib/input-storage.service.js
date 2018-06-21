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
export class InputStorageService {
    constructor() {
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
    get(key) {
        return this.storageById[key] || this.storageByName[key];
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        this.removeFromSpecificStorage('storageById', key);
        this.removeFromSpecificStorage('storageByName', key);
    }
    /**
     * @param {?} input
     * @param {?=} id
     * @param {?=} name
     * @return {?}
     */
    set(input, id, name) {
        if (id) {
            this.storageById[id] = input;
        }
        if (name) {
            this.storageByName[name] = input;
        }
    }
    /**
     * @param {?} storage
     * @param {?} key
     * @return {?}
     */
    removeFromSpecificStorage(storage, key) {
        if (!this[storage][key]) {
            return;
        }
        delete this[storage][key];
    }
}
InputStorageService.decorators = [
    { type: Injectable },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1zdG9yYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVUzQyxNQUFNOzsyQkFJQSxFQUFFOzs7Ozs7NkJBU0YsRUFBRTs7Ozs7O0lBRUMsR0FBRyxDQUFDLEdBQVc7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBR25ELE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHlCQUF5QixDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7SUFHaEQsR0FBRyxDQUFDLEtBQTJCLEVBQUUsRUFBVyxFQUFFLElBQWE7UUFDaEUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ2xDOzs7Ozs7O0lBSUsseUJBQXlCLENBQUMsT0FBd0MsRUFBRSxHQUFXO1FBQ3JGLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUM7U0FDUjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7O1lBdkM3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgaW5wdXRNc2cgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGlzIHV0aWxpdHkgc2VydmljZSBzdG9yZXMgaW5wdXQgZWxlbWVudCBwYXJhbXNcclxuICogZm9yIGNvbW11bmljYXRpb24gYmV0d2VlbiBuZ3hJbnB1dCBkaXJlY3RpdmUsXHJcbiAqIG5neC1tc2cgY29tcG9uZW50IGFuZCBuZ3hMYWJlbCBkaXJlY3RpdmUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdG9yYWdlQnlJZDoge1xyXG4gICAgW2lkOiBzdHJpbmddOiBpbnB1dE1zZy5JbnB1dFBhcmFtc1xyXG4gIH0gPSB7fTtcclxuXHJcbiAgLyoqXHJcbiAgICogTm90ZSwgdGhpcyBzdG9yYWdlIGlzIHByb3ZpZGVkLCBiZWNhdXNlXHJcbiAgICogdXNlciBtaWdodCBzZXQgaWQgb3IgbmFtZSBhdHRyaWJ1dGUgdG9cclxuICAgKiB0aGUgaW5wdXQgZWxlbWVudCBvciBldmVuIGJvdGggb2YgdGhlbS5cclxuICAgKi9cclxuICBwcml2YXRlIHN0b3JhZ2VCeU5hbWU6IHtcclxuICAgIFtpZDogc3RyaW5nXTogaW5wdXRNc2cuSW5wdXRQYXJhbXNcclxuICB9ID0ge307XHJcblxyXG4gIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBpbnB1dE1zZy5JbnB1dFBhcmFtcyB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQnlJZFtrZXldIHx8IHRoaXMuc3RvcmFnZUJ5TmFtZVtrZXldO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW1vdmVGcm9tU3BlY2lmaWNTdG9yYWdlKCdzdG9yYWdlQnlJZCcsIGtleSk7XHJcbiAgICB0aGlzLnJlbW92ZUZyb21TcGVjaWZpY1N0b3JhZ2UoJ3N0b3JhZ2VCeU5hbWUnLCBrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldChpbnB1dDogaW5wdXRNc2cuSW5wdXRQYXJhbXMsIGlkPzogc3RyaW5nLCBuYW1lPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5zdG9yYWdlQnlJZFtpZF0gPSBpbnB1dDtcclxuICAgIH1cclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZUJ5TmFtZVtuYW1lXSA9IGlucHV0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIHByaXZhdGUgcmVtb3ZlRnJvbVNwZWNpZmljU3RvcmFnZShzdG9yYWdlOiAnc3RvcmFnZUJ5SWQnIHwgJ3N0b3JhZ2VCeU5hbWUnLCBrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzW3N0b3JhZ2VdW2tleV0pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlIHRoaXNbc3RvcmFnZV1ba2V5XTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==