import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';
/**
 * Adds/removes 'ngx-input_invalid' css class
 * when input status changes
 */
export declare class LabelDirective implements OnInit, OnDestroy {
    private configService;
    private elemRef;
    private inputStorageService;
    /**
     * input element id or name
     */
    for: string;
    private elem;
    private highlightColor;
    private valid;
    constructor(configService: InputMsgConfigService, elemRef: ElementRef, inputStorageService: InputStorageService);
    ngOnDestroy(): void;
    ngOnInit(): void;
    private highlightOnValidChange(valid);
    private setAnimation();
    private toggleClassOnValidChange(valid);
}
