import { inputMsg } from './types';
/**
 * This utility service stores input element params
 * for communication between ngxInput directive,
 * ngx-msg component and ngxLabel directive.
 */
export declare class InputStorageService {
    private storageById;
    /**
     * Note, this storage is provided, because
     * user might set id or name attribute to
     * the input element or even both of them.
     */
    private storageByName;
    get(key: string): inputMsg.InputParams;
    remove(key: string): void;
    set(input: inputMsg.InputParams, id?: string, name?: string): void;
    private removeFromSpecificStorage(storage, key);
}
