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
      maxLength?: string | ExtendedMsgFn;
      minLength?: string | ExtendedMsgFn;
      required?: string | MsgFn;
    };
  }

  type ExtendedMsgFn = (placeholder: string, allowedValue: number) => string;

  type MsgFn = (placeholder: string) => string;

  // Input params
  interface Params {
    email?: boolean;
    integer?: boolean;
    label?: string;
    max?: number;
    maxLength?: number;
    min?: number;
    minLength?: number;
    required?: boolean;
    status: BehaviorSubject<string>;
    // type: SupportedInputType | 'textArea';
  }

  type Position = 'bottom-left' | 'bottom-right';

  // Final messages to show
  interface ResultMsg {
    email?: string;
    integer?: string;
    max?: string;
    maxLength?: string;
    min?: string;
    minLength?: string;
    required?: string;
  }

  type SupportedInputType = 'email' | 'text' | 'password' | 'number';

  type ValidationParam = 'email' | 'integer' | 'max' | 'maxLength' | 'min' | 'minLength' | 'required';
}
