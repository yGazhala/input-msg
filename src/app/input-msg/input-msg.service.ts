import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { errMsg as inputMsg } from './types';

@Injectable()
export class InputMsgService {

  private inputs: {
    [key: string]: BehaviorSubject<inputMsg.Params | void>
  } = {};

  public get(key: string): BehaviorSubject<inputMsg.Params | void> {
    return this.inputs[key];
  }

  public init(key: string): void {
    this.inputs[key] = new BehaviorSubject(undefined);
  }

  public set(key: string, params: inputMsg.Params): void {
    this.inputs[key].next(params);
  }

  public remove(key: string): void {
    if (!this.inputs[key]) {
      return;
    }
    this.inputs[key].complete();
    delete this.inputs[key];
  }

}
