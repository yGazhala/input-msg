import { NgForm, NgModel } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

export declare module errMsg {

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
    minLength?: string;
    required?: string;
    email?: string;
    maxLength?: string;
    min?: string;
    max?: string;
    integer?: string;
  }

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
}
