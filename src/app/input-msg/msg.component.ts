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

  @Input() public inputModel: any;
  @Input() public inputId: string;
  @Input() public inputName: string;
  @Input() public form: any;
  // Optional config with messages that overwrites the default messages
  @Input() public config: inputMsg.Config;
  // Optional parameters that overwrites the config messages and the default messages
  @Input() public requiredMsg: string;
  @Input() public emailMsg: string;
  @Input() public minLengthMsg: string;
  @Input() public maxLengthMsg: string;
  @Input() public minMsg: string;
  @Input() public maxMsg: string;
  @Input() public integerMsg: string;

  public msg: inputMsg.Config = {};
  public params: inputMsg.Params;

  private inputKey: string;

  constructor(
    private inputMsgService: InputMsgService,
    private validator: InputValidator
  ) { }

  public ngOnInit(): void {
    this.inputKey = this.inputName || this.inputId;
    if (!this.inputKey) {
      throw new Error('gMsg component: inputName or inputId attribute must be provided');
    }
    const input = this.inputMsgService.getInput(this.inputKey);
    if (!input) {
      throw new Error(`gMsg component: can\t find form elem with key ${this.inputKey}`);
    }
    input.subscribe((params: inputMsg.Params) => {
      if (params) {
        this.params = params;
        this.setMessages(params);
      }
    });
  }

  private getDefaultMsgFor(errType: string, label?: string, value?: number): string {
    let msg: string;

    switch (errType) {
      case 'required':
       msg = 'Required field';
       break;
      case 'email':
        msg = 'Wrong Email';
        break;
      case 'minLength':
        if (label) {
            msg = `Wrong ${label}`;
          } else if (value) {
            const charsStr = (value >= 2) ? 'chars' : 'char';
            msg = `Must be at least ${value} ${charsStr} long`;
          }
        break;
      case 'maxLength':
        if (value) {
          const charsStr = (value >= 2) ? 'chars' : 'char';
          msg = `Can't be more than ${value} ${charsStr} long`;
        } else {
          msg = 'This field is too long';
        }
        break;
        case 'min':
          msg = `Minimum value allowed is ${value}`;
          break;
        case 'max':
          msg = `Maximum value allowed is ${value}`;
          break;
        case 'integer':
          msg = 'Value must be an integer';
          break;
        default:
          msg = 'Invalid field';
    }

    return msg;
  }

  private setMessages(inputParams: inputMsg.Params): void {
    if (!this.config) {
      this.config = {};
    }
    // required msg
    if (inputParams.isRequired) {
      this.msg.required = this.requiredMsg || this.config.required || this.getDefaultMsgFor('required');
    }
    // email
    if (inputParams.type === 'email') {
      this.msg.email = this.emailMsg || this.config.email || this.getDefaultMsgFor('email');
    }
    // minLength
    this.setMinLengthMsg(inputParams);
    // maxLength
    if (inputParams.maxLengthValue) {
      this.msg.maxLength = this.maxLengthMsg || this.config.maxLength
        || this.getDefaultMsgFor('maxLength', undefined, inputParams.maxLengthValue);
    }
    // min
    if (this.validator.isNumber(inputParams.minValue)) {
      this.msg.min = this.minMsg || this.config.min || this.getDefaultMsgFor('min', undefined, inputParams.minValue);
    }
    // max
    if (this.validator.isNumber(inputParams.maxValue)) {
      this.msg.max = this.maxMsg || this.config.max || this.getDefaultMsgFor('max', undefined, inputParams.maxValue);
    }
    // integer
    if (inputParams.isInteger) {
        this.msg.integer = this.integerMsg || this.config.integer || this.getDefaultMsgFor('integer');
    }
  }

  private setMinLengthMsg(inputParams: inputMsg.Params): void {
    if (!inputParams.minLengthValue) {
      return;
    }
    if (this.minLengthMsg) {
      this.msg.minLength = this.minLengthMsg;
      return;
    }
    if (this.config && this.config.minLength) {
      this.msg.minLength = this.config.minLength;
      return;
    }
    if (inputParams.type === 'text') {
      if (inputParams.label) {
        this.msg.minLength = this.getDefaultMsgFor('minLength', inputParams.label);
      } else {
        this.msg.minLength = this.getDefaultMsgFor('minLength', undefined, inputParams.minLengthValue);
      }
      return;
    }
    if (inputParams.type === 'password') {
      this.msg.minLength = this.getDefaultMsgFor('minLength', undefined, inputParams.minLengthValue);
    }
  }

}
