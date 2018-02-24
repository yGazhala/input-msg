import { Component, Input, OnInit, OnChanges, OnDestroy, SimpleChange, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { InputMsgService } from '../input-msg.service';
import { InputStorageService } from '../input-storage.service';

import { inputMsg } from '../types';


/**
 * Displays a message for an input element
 * depending on it`s validation status.
 */
@Component({
  selector: 'g-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MsgComponent implements OnInit, OnChanges, OnDestroy {

  /**
   * input id or name
   */
  @Input() public for: string;
  /**
   * DEPRECATED.
   * Use for param instead.
   */
  @Input() public inputId: string;
  /**
   * DEPRECATED.
   * Use for param instead.
   */
  @Input() public inputName: string;
  /**
   * Optional params with custom messages
   * that overwrite the default ones
   */
  @Input() public email: string | inputMsg.MsgFn;
  @Input() public integer: string | inputMsg.MsgFn;
  @Input() public max: string | inputMsg.ExtendedMsgFn;
  @Input() public maxlength: string | inputMsg.ExtendedMsgFn;
  @Input() public min: string | inputMsg.ExtendedMsgFn;
  @Input() public minlength: string | inputMsg.ExtendedMsgFn;
  @Input() public pattern: string | inputMsg.MsgFn;
  @Input() public position: inputMsg.Position;
  @Input() public required: string | inputMsg.MsgFn;

  // Currently shown message
  public currentMsg: string;

  private currentStatus: inputMsg.InputStatus;
  private defaultConfig: inputMsg.Config;
  private inputKey: string;
  private inputParams: inputMsg.InputParams;
  // All available messages corresponded
  // to validation params of the input
  private messages: inputMsg.ResultMsg = {};
  private subscriptions: Subscription[] = [];

  constructor(
    private inputMsgService: InputMsgService,
    private inputStorageService: InputStorageService
  ) { }

  public getClasses(): { [name: string]: boolean } {

    const position: 'bottom-left' | 'bottom-right' = this.position || this.inputMsgService.config.position;
    return {
      'g-msg_pos_bottom-left': position === 'bottom-left',
      'g-msg_pos_bottom-right': position === 'bottom-right',
      'g-msg_color_tooltip': this.currentStatus === 'maxlength',
      'g-msg_material': this.inputParams.material
    };
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

    this.defaultConfig = this.inputMsgService.config;

    this.inputKey = this.for || this.inputId || this.inputName;
    if (!this.inputKey) {
      throw new Error('gMsg component: \'for\' parameter with the input id or name must be provided.');
    }

    this.inputParams = this.inputStorageService.get(this.inputKey);
    if (!this.inputParams) {
      throw new Error(`gMsg component: can\'t find the input element with id or name: ${this.inputKey}`);
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

    if (typeof this.inputParams.validationParams[name] === 'undefined') {
      return;
    }

    // helper type guard
    const isFn = (arg: any): arg is inputMsg.MsgFn | inputMsg.ExtendedMsgFn => {
      return typeof arg === 'function';
    };

    // validation params with inputMsg.MsgFn type support
    const msgFnSupport = ['email', 'integer', 'required', 'pattern'];

    // set a message generated from MsgFn() or as a simle string
    if (msgFnSupport.indexOf(name) !== -1) {
      let msgExpression: inputMsg.MsgFn | string;
      if (typeof this[name] !== 'undefined') {
        msgExpression = this[name] as inputMsg.MsgFn | string;
      } else {
        msgExpression = this.defaultConfig.msg[name] as inputMsg.MsgFn | string;
      }
      this.messages[name] = isFn(msgExpression) ? msgExpression(this.inputParams.label) : msgExpression;
      return;
    }

    // Otherwise - set a message generated from ExtendedMsgFn() or as a simle string
    let extendedMsgExpression: inputMsg.ExtendedMsgFn | string;
    if (typeof this[name] !== 'undefined') {
      extendedMsgExpression = this[name] as inputMsg.ExtendedMsgFn | string;
    } else {
      extendedMsgExpression = this.defaultConfig.msg[name] as inputMsg.ExtendedMsgFn | string;
    }
    if (isFn(extendedMsgExpression)) {
      this.messages[name] = extendedMsgExpression(this.inputParams.label, this.inputParams.validationParams[name] as number);
    } else {
      this.messages[name] = extendedMsgExpression;
    }

  }

}
