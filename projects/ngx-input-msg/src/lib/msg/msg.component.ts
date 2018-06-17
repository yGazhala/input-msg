import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChange, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from 'rxjs';

import { InputMsgConfigService } from '../input-msg-config.service';
import { InputStorageService } from '../input-storage.service';

import { inputMsg } from '../types';


/**
 * Displays a message for an input element
 * depending on it`s validation status.
 */
@Component({
  selector: 'ngx-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('msgAnimation', [
      state('active', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('250ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MsgComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * An input id or name attribute
   */
  @Input() public for: string;
  /**
   * Optional params with custom messages
   * to overwrite the default ones
   */
  @Input() public email: string | inputMsg.MsgFn;
  @Input() public integer: string | inputMsg.MsgFn;
  @Input() public max: string | inputMsg.MsgFn;
  @Input() public maxlength: string | inputMsg.MsgFn;
  @Input() public min: string | inputMsg.MsgFn;
  @Input() public minlength: string | inputMsg.MsgFn;
  @Input() public pattern: string | inputMsg.MsgFn;
  @Input() public position: inputMsg.Position;
  @Input() public required: string | inputMsg.MsgFn;

  // Currently shown message
  public currentMsg: string;

  private currentStatus: inputMsg.InputStatus;
  private defaultConfig: inputMsg.Config;
  private inputParams: inputMsg.InputParams;
  /**
   * All available messages corresponded
   * to validation params of the input
   */
  private messages: inputMsg.ResultMsg = {};
  private subscriptions: Subscription[] = [];

  constructor(
    private configService: InputMsgConfigService,
    private storageService: InputStorageService
  ) { }

  public getClasses(): { [name: string]: boolean } {

    const position: 'bottom-left' | 'bottom-right' = this.position || this.configService.get().position;
    return {
      'ngx-msg_pos_bottom-left': position === 'bottom-left',
      'ngx-msg_pos_bottom-right': position === 'bottom-right',
      'ngx-msg_color_tooltip': this.currentStatus === 'maxlength',
      'ngx-msg_material': this.inputParams.material
    };
  }

  public getStyles(): { [name: string]: string } {

    let color: string;
    if (this.currentStatus === 'maxlength') {
      color = this.defaultConfig.colors.maxlength;
    } else {
      color = this.defaultConfig.colors.error;
    }
    return { color: color };
  }

  public ngOnChanges(changes: { [prop: string]: SimpleChange }): void {

    const changeableProps = {
      email: true,
      integer: true,
      max: true,
      maxlength: true,
      min: true,
      minlength: true,
      position: true,
      required: true
    };

    Object.keys(changes).forEach(name => {
      if (!changeableProps[name] || changes[name].isFirstChange()) {
        return;
      }
      this.setMessage(name as inputMsg.ValidatorName);

      // update currentMsg if it has been changed
      // and the input is invalid
      if (this.currentStatus === name && name !== 'maxlength') {
        this.currentMsg = this.messages[name];
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public ngOnInit(): void {

    this.defaultConfig = this.configService.get();

    if (!this.for) {
      throw new Error('ngxMsg component: \'for\' parameter with the input id or name must be provided.');
    }

    this.inputParams = this.storageService.get(this.for);
    if (!this.inputParams) {
      throw new Error(`ngxMsg component: can\'t find the input element with id or name: ${this.for}`);
    }

    // Set default or custom messages for given validation params
    this.setAllMessages();

    // Listen to the input status
    const statusSub: Subscription = this.inputParams.status
      .subscribe(this.onStatusChange.bind(this));
    this.subscriptions.push(statusSub);

    // Listen to the input params change
    const inputParamsChangeSub: Subscription = this.inputParams.paramChange
      .subscribe(this.onInputParamsChange.bind(this));
    this.subscriptions.push(inputParamsChangeSub);
  }

  // Updates messages when input params change
  private onInputParamsChange(changedPropName: 'label' | inputMsg.ValidatorName): void {

    if (changedPropName === 'label') {
      this.setAllMessages();
    } else {
      this.setMessage(changedPropName as inputMsg.ValidatorName);
    }

    // update current msg if the input is invalid
    if (this.currentStatus === 'pristine' ||
      this.currentStatus === 'valid' ||
      this.currentStatus === 'maxlength') {
      return;
    }
    this.currentMsg = this.messages[this.currentStatus];
  }

  // Updates currentStatus and shows/hides currentMsg
  private onStatusChange(status: inputMsg.InputStatus): void {

    this.currentStatus = status;
    switch (status) {
      case 'pristine':
        this.currentMsg = '';
        break;
      case 'valid':
        this.currentMsg = '';
        break;
      case 'maxlength':
        this.currentMsg = this.messages[status];
        setTimeout(() => { this.currentMsg = ''; }, 2000);
        break;
      default:
        this.currentMsg = this.messages[status];
    }
  }

  private setAllMessages(): void {
    Object.keys(this.inputParams.validationParams).forEach((name: inputMsg.ValidatorName) => {
      this.setMessage(name);
    });
  }

  // Sets message text for a given validation parameter.
  // If appropriate message expression is not provided
  // throgh @Input() binding - the default one is used instead.
  private setMessage(name: inputMsg.ValidatorName): void {

    if (!this.inputParams.validationParams[name]) {
      return;
    }

    // helper type guard
    const isFn = (arg: string | Function): arg is inputMsg.MsgFn => {
      return typeof arg === 'function';
    };

    // get specific or default msgExpression
    let msgExpression: inputMsg.MsgFn | string;
    if (typeof this[name] !== 'undefined') {
      msgExpression = this[name] as inputMsg.MsgFn | string;
    } else {
      msgExpression = this.defaultConfig.msg[name] as inputMsg.MsgFn | string;
    }

    // Set a message generated by MsgFn() or as a simle string
    if (isFn(msgExpression)) {
      this.messages[name] = msgExpression(this.inputParams.label, this.inputParams.validationParams[name].value);
    } else {
      this.messages[name] = msgExpression;
    }

  }

}
