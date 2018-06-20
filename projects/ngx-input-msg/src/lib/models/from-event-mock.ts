/**
 * This temporary surrogate replaces
 * original rxjs fromEvent function
 * to handle rxjs v5 to v6 migration problem.
 */
export const fromEventMock = (eventTarget: HTMLElement, eventName: string, handler: () => void): { unsubscribe: () => void; } => {

  eventTarget.addEventListener(eventName, handler);
  return {
    unsubscribe: () => {
      eventTarget.removeEventListener(eventName, handler);
    }
  };

};
