/**
 * Note, there is the angular cli or webpack issue when we try
 * importing files with .d.ts extension into a file which contains angular decorators.
 * So we decided to use .ts files for declarations until the issue will be fixed.
 * See: https://github.com/angular/angular-cli/issues/4874
 */
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export declare module inputMsg {

  // Message config
  interface Config {
    position?: Position;
    msg?: {
      email?: string | MsgFn;
      integer?: string | MsgFn;
      max?: string | ExtendedMsgFn;
      min?: string | ExtendedMsgFn;
      maxlength?: string | ExtendedMsgFn;
      minlength?: string | ExtendedMsgFn;
      required?: string | MsgFn;
    };
  }

  type ExtendedMsgFn = (placeholder: string, allowedValue: number) => string;

  type InputStatus = 'pristine' | 'valid' | ValidationParam;

  type MsgFn = (placeholder: string) => string;

  // Input params
  interface Params {
    email?: boolean;
    integer?: boolean;
    label?: string;
    max?: number;
    maxlength?: number;
    min?: number;
    minlength?: number;
    required?: boolean;
    status: BehaviorSubject<InputStatus>;
    // type: SupportedInputType | 'textArea';
  }

  type Position = 'bottom-left' | 'bottom-right';

  // Final messages to show
  interface ResultMsg {
    email?: string;
    integer?: string;
    max?: string;
    maxlength?: string;
    min?: string;
    minlength?: string;
    required?: string;
  }

  type SupportedInputType = 'email' | 'text' | 'password' | 'number';

  type ValidationParam = 'email' | 'integer' | 'max' | 'maxlength' | 'min' | 'minlength' | 'required';
}
