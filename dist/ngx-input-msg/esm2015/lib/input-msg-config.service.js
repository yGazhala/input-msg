/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * Provides configuration for displaying messages.
 */
export class InputMsgConfigService {
    constructor() {
        this.defaultConfig = {
            colors: {
                error: '#f44336',
                maxlength: 'grey'
            },
            position: 'bottom-left',
            msg: {
                email: (label) => `Wrong ${label}`,
                integer: 'Fractional digits are forbidden',
                max: (label, allowed) => `Maximum allowed ${label} is ${allowed}`,
                min: (label, allowed) => `Minimum allowed ${label} is ${allowed}`,
                maxlength: (label, allowed) => `Maximum ${allowed} chars limit was reached`,
                minlength: (label, allowed) => `At least ${allowed} chars length are required`,
                pattern: (label) => `Invalid ${label}`,
                required: (label) => `${label} is required`
            }
        };
    }
    /**
     * @return {?}
     */
    get() {
        return this.defaultConfig;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set(config) {
        if (config.position) {
            this.defaultConfig.position = config.position;
        }
        // set colors
        if (config.colors) {
            Object.keys(config.colors).forEach((key) => {
                this.defaultConfig.colors[key] = config.colors[key];
            });
        }
        // set msg
        if (!config.msg) {
            return;
        }
        Object.keys(config.msg).forEach((key) => {
            this.defaultConfig.msg[key] = config.msg[key];
        });
    }
}
InputMsgConfigService.decorators = [
    { type: Injectable },
];
function InputMsgConfigService_tsickle_Closure_declarations() {
    /** @type {?} */
    InputMsgConfigService.prototype.defaultConfig;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtbXNnLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWlucHV0LW1zZy8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1tc2ctY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFRM0MsTUFBTTs7NkJBRXFDO1lBQ3ZDLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsU0FBUztnQkFDaEIsU0FBUyxFQUFFLE1BQU07YUFDbEI7WUFDRCxRQUFRLEVBQUUsYUFBYTtZQUN2QixHQUFHLEVBQUU7Z0JBQ0gsS0FBSyxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEtBQUssRUFBRTtnQkFDMUMsT0FBTyxFQUFFLGlDQUFpQztnQkFDMUMsR0FBRyxFQUFFLENBQUMsS0FBYSxFQUFFLE9BQWUsRUFBRSxFQUFFLENBQUMsbUJBQW1CLEtBQUssT0FBTyxPQUFPLEVBQUU7Z0JBQ2pGLEdBQUcsRUFBRSxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixLQUFLLE9BQU8sT0FBTyxFQUFFO2dCQUNqRixTQUFTLEVBQUUsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FBQyxXQUFXLE9BQU8sMEJBQTBCO2dCQUMzRixTQUFTLEVBQUUsQ0FBQyxLQUFhLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FBQyxZQUFZLE9BQU8sNEJBQTRCO2dCQUM5RixPQUFPLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLFdBQVcsS0FBSyxFQUFFO2dCQUM5QyxRQUFRLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxjQUFjO2FBQ3BEO1NBQ0Y7Ozs7O0lBRU0sR0FBRztRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7Ozs7SUFHckIsR0FBRyxDQUFDLE1BQXVCO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDL0M7O1FBR0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckQsQ0FBQyxDQUFDO1NBQ0o7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7U0FDUjtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0MsQ0FBQyxDQUFDOzs7O1lBNUNOLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBpbnB1dE1zZyB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFByb3ZpZGVzIGNvbmZpZ3VyYXRpb24gZm9yIGRpc3BsYXlpbmcgbWVzc2FnZXMuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1zZ0NvbmZpZ1NlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IGlucHV0TXNnLkNvbmZpZyA9IHtcclxuICAgIGNvbG9yczoge1xyXG4gICAgICBlcnJvcjogJyNmNDQzMzYnLFxyXG4gICAgICBtYXhsZW5ndGg6ICdncmV5J1xyXG4gICAgfSxcclxuICAgIHBvc2l0aW9uOiAnYm90dG9tLWxlZnQnLFxyXG4gICAgbXNnOiB7XHJcbiAgICAgIGVtYWlsOiAobGFiZWw6IHN0cmluZykgPT4gYFdyb25nICR7bGFiZWx9YCxcclxuICAgICAgaW50ZWdlcjogJ0ZyYWN0aW9uYWwgZGlnaXRzIGFyZSBmb3JiaWRkZW4nLFxyXG4gICAgICBtYXg6IChsYWJlbDogc3RyaW5nLCBhbGxvd2VkOiBudW1iZXIpID0+IGBNYXhpbXVtIGFsbG93ZWQgJHtsYWJlbH0gaXMgJHthbGxvd2VkfWAsXHJcbiAgICAgIG1pbjogKGxhYmVsOiBzdHJpbmcsIGFsbG93ZWQ6IG51bWJlcikgPT4gYE1pbmltdW0gYWxsb3dlZCAke2xhYmVsfSBpcyAke2FsbG93ZWR9YCxcclxuICAgICAgbWF4bGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgTWF4aW11bSAke2FsbG93ZWR9IGNoYXJzIGxpbWl0IHdhcyByZWFjaGVkYCxcclxuICAgICAgbWlubGVuZ3RoOiAobGFiZWw6IHN0cmluZywgYWxsb3dlZDogbnVtYmVyKSA9PiBgQXQgbGVhc3QgJHthbGxvd2VkfSBjaGFycyBsZW5ndGggYXJlIHJlcXVpcmVkYCxcclxuICAgICAgcGF0dGVybjogKGxhYmVsOiBzdHJpbmcpID0+IGBJbnZhbGlkICR7bGFiZWx9YCxcclxuICAgICAgcmVxdWlyZWQ6IChsYWJlbDogc3RyaW5nKSA9PiBgJHtsYWJlbH0gaXMgcmVxdWlyZWRgXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIGdldCgpOiBpbnB1dE1zZy5Db25maWcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVmYXVsdENvbmZpZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoY29uZmlnOiBpbnB1dE1zZy5Db25maWcpIHtcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5wb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgY29sb3JzXHJcbiAgICBpZiAoY29uZmlnLmNvbG9ycykge1xyXG4gICAgICBPYmplY3Qua2V5cyhjb25maWcuY29sb3JzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5jb2xvcnNba2V5XSA9IGNvbmZpZy5jb2xvcnNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IG1zZ1xyXG4gICAgaWYgKCFjb25maWcubXNnKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKGNvbmZpZy5tc2cpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5tc2dba2V5XSA9IGNvbmZpZy5tc2dba2V5XTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19