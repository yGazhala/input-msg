/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
export declare const fromEventMock: (eventTarget: HTMLElement, eventName: string, handler: () => void) => {
    unsubscribe: () => void;
};
