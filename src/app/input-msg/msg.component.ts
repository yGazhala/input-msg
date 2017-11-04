import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { InputMsgService } from './input-msg.service';
import { InputValidator } from './input-validator.service';

import { inputMsg } from './types';

@Component({
  selector: 'g-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MsgComponent implements OnInit {

  @Input() public inputId: string;
  @Input() public inputName: string;
  // Optional params that overwrite the default config
  @Input() public email: string | inputMsg.MsgFn;
  @Input() public integer: string | inputMsg.MsgFn;
  @Input() public max: string | inputMsg.ExtendedMsgFn;
  @Input() public maxLength: string | inputMsg.ExtendedMsgFn;
  @Input() public min: string | inputMsg.ExtendedMsgFn;
  @Input() public minLength: string | inputMsg.ExtendedMsgFn;
  @Input() public position: inputMsg.Position;
  @Input() public required: string | inputMsg.MsgFn;

  public isShown: boolean;
  public msg: inputMsg.ResultMsg = {};
  public params: inputMsg.Params;

  private defaultConfig: inputMsg.Config;
  private inputKey: string;
  // validation params with inputMsg.MsgFn type support
  private readonly msgFnSupport = ['email', 'integer', 'required'];
  // all supported validation params
  private validationParams: inputMsg.ValidationParam[];

  constructor(private inputMsgService: InputMsgService) {}

  public getPositionClass(): string {
    const position: 'bottom-left' | 'bottom-right' = this.inputMsgService.config.position;
    return `g-msg__pos_${position}`;
  }

  public ngOnInit(): void {

    this.defaultConfig = this.inputMsgService.config;
    this.validationParams = this.inputMsgService.validationParams;
    this.inputKey = this.inputName || this.inputId;
    if (!this.inputKey) {
      throw new Error('gMsg component: inputName or inputId attribute must be provided');
    }
    this.params = this.inputMsgService.getInput(this.inputKey);
    this.params.status.subscribe((status) => {
      console.log(status);
    });
    if (!this.params) {
      throw new Error(`gMsg component: can\'t find the element with name or id: ${this.inputKey}`);
    }
    this.validationParams.forEach((name: inputMsg.ValidationParam) => {
      this.setMsg(name);
    });
  }

  /**
   * Sets message text for a given validation parameter.
   * If appropriate message expression is not provided
   * throgh @Input() binding - the default one is used instead.
   */
  private setMsg(name: inputMsg.ValidationParam): void {

    if (typeof this.params[name] === 'undefined' ||
        typeof this.params[name] !== 'number' ||
        this.params[name] !== true
    ) {
      return;
    }
    // set a message generated from MsgFn() or as a simle string
    if (this.msgFnSupport.indexOf(name) !== -1) {
      const defaultMsg = this.defaultConfig.msg[name] as inputMsg.MsgFn | string;
      const msg = <inputMsg.MsgFn | string>this[name] || defaultMsg;
      this.msg[name] = typeof msg === 'function' ? msg(this.params.label) : msg;
      return;
    }
    // Otherwise - set a message generated from ExtendedMsgFn() or as a simle string
    const defaultExpression = this.defaultConfig.msg[name] as inputMsg.ExtendedMsgFn | string;
    const expression = <inputMsg.ExtendedMsgFn | string>this[name] || defaultExpression;
    this.msg[name] = typeof expression === 'function' ? expression(this.params.label, this.params[name]as number) : expression;
  }

}
