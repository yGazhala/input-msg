import { Injectable } from '@angular/core';

import { inputMsg } from './types';

/**
 * This utility service stores the input element params
 * for communication between gInput directive,
 * gMsg component and gLabel directive.
 */
@Injectable()
export class InputStorageService {

  private storageById: {
    [id: string]: inputMsg.InputParams
  } = {};

  /**
   * Note, this storage is provided, because
   * user might set id or name attribute to
   * the input element or even both of them.
   */
  private storageByName: {
    [id: string]: inputMsg.InputParams
  } = {};

  public get(key: string): inputMsg.InputParams {
    return this.storageById[key] || this.storageByName[key];
  }

  public remove(key: string): void {
    this.removeFromSpecificStorage('storageById', key);
    this.removeFromSpecificStorage('storageByName', key);
  }

  public set(input: inputMsg.InputParams, id?: string, name?: string): void {
    if (id) {
      this.storageById[id] = input;
    }
    if (name) {
      this.storageByName[name] = input;
    }
  }


  private removeFromSpecificStorage(storage: 'storageById' | 'storageByName', key: string): void {
    if (!this[storage][key]) {
      return;
    }
    this[storage][key].valid.complete();
    this[storage][key].status.complete();
    delete this[storage][key];
  }

}
