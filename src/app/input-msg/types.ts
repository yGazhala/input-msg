/**
 * Note, there is the angular cli or webpack issue when we try
 * importing files with .d.ts extension into a file which contains angular decorators.
 * So we decided to use .ts files for declarations until the issue will be fixed.
 * See: https://github.com/angular/angular-cli/issues/4874
 */
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { NgForm, NgModel } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

export declare module inputMsg {

  interface Params {
    type?: any;
    label?: any;
    isRequired?: boolean;
    minLengthValue?: number;
    maxLengthValue?: number;
    minValue?: number;
    maxValue?: number;
    isInteger?: boolean;
    model: NgModel;
    form: NgForm;
  }

  interface Config {
    position?: 'bottom-left' | 'bottom-right';
    msg?: {
      email?: string | MsgFn;
      integer?: string | MsgFn;
      max?: string | ExtendedMsgFn;
      min?: string | ExtendedMsgFn;
      maxLength?: string | ExtendedMsgFn;
      minLength?: string | ExtendedMsgFn;
      required?: string | MsgFn;
    };
  }

  type ExtendedMsgFn = (placeholder: string, allowedValue: string | number) => string;

  interface InputParams {
    type?: any;
    label?: any;
    isRequired?: boolean;
    minLengthValue?: number;
    maxLengthValue?: number;
    minValue?: number;
    maxValue?: number;
    isInteger?: boolean;
  }

  type MsgFn = (placeholder: string) => string;
}
