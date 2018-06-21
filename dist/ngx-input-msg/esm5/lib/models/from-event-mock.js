/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
export var /** @type {?} */ fromEventMock = function (eventTarget, eventName, handler) {
    eventTarget.addEventListener(eventName, handler);
    return {
        unsubscribe: function () {
            eventTarget.removeEventListener(eventName, handler);
        }
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbS1ldmVudC1tb2NrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9tb2RlbHMvZnJvbS1ldmVudC1tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE1BQU0sQ0FBQyxxQkFBTSxhQUFhLEdBQUcsVUFBQyxXQUF3QixFQUFFLFNBQWlCLEVBQUUsT0FBbUI7SUFFNUYsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUM7UUFDTCxXQUFXLEVBQUU7WUFDWCxXQUFXLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0tBQ0YsQ0FBQztDQUVILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogVGhpcyB0ZW1wb3Jhcnkgc3Vycm9nYXRlIHJlcGxhY2VzXHJcbiAqIG9yaWdpbmFsIHJ4anMgZnJvbUV2ZW50IGZ1bmN0aW9uXHJcbiAqIHRvIGhhbmRsZSByeGpzIHY1IHRvIHY2IG1pZ3JhdGlvbiBwcm9ibGVtLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZyb21FdmVudE1vY2sgPSAoZXZlbnRUYXJnZXQ6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgaGFuZGxlcjogKCkgPT4gdm9pZCk6IHsgdW5zdWJzY3JpYmU6ICgpID0+IHZvaWQ7IH0gPT4ge1xyXG5cclxuICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7XHJcbiAgICAgIGV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxufTtcclxuIl19