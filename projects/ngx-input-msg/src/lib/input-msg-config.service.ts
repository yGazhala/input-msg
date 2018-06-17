import { Injectable } from '@angular/core';

import { inputMsg } from './types';

/**
 * Provides configuration for displaying messages.
 */
@Injectable()
export class InputMsgConfigService {

  private defaultConfig: inputMsg.Config = {
    colors: {
      error: '#f44336',
      maxlength: 'grey'
    },
    position: 'bottom-left',
    msg: {
      email: (label: string) => `Wrong ${label}`,
      integer: 'Fractional digits are forbidden',
      max: (label: string, allowed: number) => `Maximum allowed ${label} is ${allowed}`,
      min: (label: string, allowed: number) => `Minimum allowed ${label} is ${allowed}`,
      maxlength: (label: string, allowed: number) => `Maximum ${allowed} chars limit was reached`,
      minlength: (label: string, allowed: number) => `At least ${allowed} chars length are required`,
      pattern: (label: string) => `Invalid ${label}`,
      required: (label: string) => `${label} is required`
    }
  };

  public get(): inputMsg.Config {
    return this.defaultConfig;
  }

  public set(config: inputMsg.Config) {

    if (config.position) {
      this.defaultConfig.position = config.position;
    }

    // set colors
    if (config.colors) {
      Object.keys(config.colors).forEach((key: string) => {
        this.defaultConfig.colors[key] = config.colors[key];
      });
    }

    // set msg
    if (!config.msg) {
      return;
    }
    Object.keys(config.msg).forEach((key: string) => {
      this.defaultConfig.msg[key] = config.msg[key];
    });
  }

}
