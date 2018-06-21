/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
export const /** @type {?} */ fromEventMock = (eventTarget, eventName, handler) => {
    eventTarget.addEventListener(eventName, handler);
    return {
        unsubscribe: () => {
            eventTarget.removeEventListener(eventName, handler);
        }
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbS1ldmVudC1tb2NrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvZnJvbS1ldmVudC1tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE1BQU0sQ0FBQyx1QkFBTSxhQUFhLEdBQUcsQ0FBQyxXQUF3QixFQUFFLFNBQWlCLEVBQUUsT0FBbUIsRUFBZ0MsRUFBRTtJQUU5SCxXQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBQztRQUNMLFdBQVcsRUFBRSxHQUFHLEVBQUU7WUFDaEIsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNyRDtLQUNGLENBQUM7Q0FFSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFRoaXMgdGVtcG9yYXJ5IHN1cnJvZ2F0ZSByZXBsYWNlc1xyXG4gKiBvcmlnaW5hbCByeGpzIGZyb21FdmVudCBmdW5jdGlvblxyXG4gKiB0byBoYW5kbGUgcnhqcyB2NSB0byB2NiBtaWdyYXRpb24gcHJvYmxlbS5cclxuICovXHJcbmV4cG9ydCBjb25zdCBmcm9tRXZlbnRNb2NrID0gKGV2ZW50VGFyZ2V0OiBIVE1MRWxlbWVudCwgZXZlbnROYW1lOiBzdHJpbmcsIGhhbmRsZXI6ICgpID0+IHZvaWQpOiB7IHVuc3Vic2NyaWJlOiAoKSA9PiB2b2lkOyB9ID0+IHtcclxuXHJcbiAgZXZlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1bnN1YnNjcmliZTogKCkgPT4ge1xyXG4gICAgICBldmVudFRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbn07XHJcbiJdfQ==