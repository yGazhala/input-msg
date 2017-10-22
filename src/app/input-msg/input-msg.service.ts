import { iterateListLike } from '@angular/core/src/change_detection/change_detection_util';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { inputMsg } from './types';

@Injectable()
export class InputMsgService {

  private defaultConfig: inputMsg.Config = {
    position: 'bottom-left',
    msg: {
      email: (label: string) => `Wrong ${label}`,
      integer: 'Fractional digits are forbidden',
      max: (label: string, allowed: number) => `Maximum allowed ${label} is ${allowed}`,
      min: (label: string, allowed: number) => `Minimum allowed ${label} is ${allowed}`,
      maxLength: (label: string, allowed: number) => `Maximum ${allowed} chars limit was reached`,
      minLength: (label: string, allowed: number) => `At least ${allowed} chars length are required`,
      required: (label: string) => `${label} is required`
    }
  };

  private inputs: {
    [key: string]: inputMsg.Params
  } = {};

  public get config(): inputMsg.Config {
    return this.defaultConfig;
  }

  public getInput(key: string): inputMsg.Params {
    return this.inputs[key];
  }

  public set config(config: inputMsg.Config) {

    Object.keys(config).forEach((key: string) => {
      this.defaultConfig = config[key];
    });
    if (!config.msg) {
      return;
    }
    Object.keys(config.msg).forEach((key: string) => {
      this.defaultConfig.msg[key] = config.msg[key];
    });
  }

  public setInput(key: string, params: inputMsg.Params): void {
    this.inputs[key] = params;
  }

  public removeInput(key: string): void {
    if (!this.inputs[key]) {
      return;
    }
    this.inputs[key].status.complete();
    delete this.inputs[key];
  }

}
