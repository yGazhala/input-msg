import { Injectable } from '@angular/core';

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
      maxlength: (label: string, allowed: number) => `Maximum ${allowed} chars limit was reached`,
      minlength: (label: string, allowed: number) => `At least ${allowed} chars length are required`,
      required: (label: string) => `${label} is required`
    }
  };

  public get config(): inputMsg.Config {
    return this.defaultConfig;
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

}
