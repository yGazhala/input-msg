import { OnInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';
import { inputMsg } from '../types';
/**
 * Displays a message for an input element
 * depending on it`s validation status.
 */
export declare class MsgComponent implements OnInit, OnChanges, OnDestroy {
    private configService;
    private storageService;
    /**
     * An input id or name attribute
     */
    for: string;
    /**
     * Optional params with custom messages
     * to overwrite the default ones
     */
    email: string | inputMsg.MsgFn;
    integer: string | inputMsg.MsgFn;
    max: string | inputMsg.MsgFn;
    maxlength: string | inputMsg.MsgFn;
    min: string | inputMsg.MsgFn;
    minlength: string | inputMsg.MsgFn;
    pattern: string | inputMsg.MsgFn;
    position: inputMsg.Position;
    required: string | inputMsg.MsgFn;
    currentMsg: string;
    private currentStatus;
    private defaultConfig;
    private inputParams;
    /**
     * All available messages corresponded
     * to validation params of the input
     */
    private messages;
    private subscriptions;
    constructor(configService: InputMsgConfigService, storageService: InputStorageService);
    getClasses(): {
        [name: string]: boolean;
    };
    getStyles(): {
        [name: string]: string;
    };
    ngOnChanges(changes: {
        [prop: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    private onInputParamsChange(changedPropName);
    private onStatusChange(status);
    private setAllMessages();
    private setMessage(name);
}
