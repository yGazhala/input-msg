import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { InputMsgService } from '../input-msg.service';
import { InputStorageService } from '../input-storage.service';

import { inputMsg } from '../types';

/**
 * Displays a message for an input element
 * depending on its validation status.
 */
@Component({
  selector: 'g-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MsgComponent implements OnInit {

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
  @Input() public position: inputMsg.Position;
  @Input() public required: string | inputMsg.MsgFn;

  // Currently shown message
  public currentMsg: string;

  private defaultConfig: inputMsg.Config;
  private inputKey: string;
  // Messages to show when input status changes
  private messages: inputMsg.ResultMsg = {};
  // validation params with inputMsg.MsgFn type support
  private readonly msgFnSupport = ['email', 'integer', 'required'];
  private params: inputMsg.InputParams;
  private status: inputMsg.InputStatus;
  // all supported validation params
  private validationParams: inputMsg.ValidationParam[];

  constructor(
    private inputMsgService: InputMsgService,
    private inputStorageService: InputStorageService
  ) { }

  public getClasses(): { [name: string]: boolean } {

    const position: 'bottom-left' | 'bottom-right' = this.position || this.inputMsgService.config.position;
    return {
      'g-msg_pos_bottom-left': position === 'bottom-left',
      'g-msg_pos_bottom-right': position === 'bottom-right',
      'g-msg_color_tooltip': this.status === 'maxlength',
      'g-msg_material': this.params.material
    };
  }

  public ngOnInit(): void {

    this.defaultConfig = this.inputMsgService.config;
    this.validationParams = this.inputMsgService.validationParams;

    this.inputKey = this.for || this.inputId || this.inputName;
    if (!this.inputKey) {
      throw new Error('gMsg component: \'for\' parameter with the input id or name must be provided.');
    }

    this.params = this.inputStorageService.get(this.inputKey);
    if (!this.params) {
      throw new Error(`gMsg component: can\'t find the input element with id or name: ${this.inputKey}`);
    }

    // Set default or custom messages for given validation params
    this.validationParams.forEach((name: inputMsg.ValidationParam) => {
      this.setMsg(name);
    });
    // Listen to the input status
    this.params.status.subscribe(this.onStatusChange.bind(this));
  }

  private onStatusChange(status: inputMsg.InputStatus): void {

    this.status = status;
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

  // Sets message text for a given validation parameter.
  // If appropriate message expression is not provided
  // throgh @Input() binding - the default one is used instead.
  private setMsg(name: inputMsg.ValidationParam): void {

    if (typeof this.params[name] === 'undefined') {
      return;
    }
    // set a message generated from MsgFn() or as a simle string
    if (this.msgFnSupport.indexOf(name) !== -1) {
      const defaultMsg = this.defaultConfig.msg[name] as inputMsg.MsgFn | string;
      const msg = <inputMsg.MsgFn | string>this[name] || defaultMsg;
      this.messages[name] = this.isFn(msg) ? msg(this.params.label) : msg;
      return;
    }
    // Otherwise - set a message generated from ExtendedMsgFn() or as a simle string
    const defaultExpression = this.defaultConfig.msg[name] as inputMsg.ExtendedMsgFn | string;
    const expression = <inputMsg.ExtendedMsgFn | string>this[name] || defaultExpression;
    this.messages[name] = this.isFn(expression) ? expression(this.params.label, this.params[name] as number) : expression;
  }

  private isFn(arg: any): arg is inputMsg.MsgFn | inputMsg.ExtendedMsgFn {
    return typeof arg === 'function';
  }

}
