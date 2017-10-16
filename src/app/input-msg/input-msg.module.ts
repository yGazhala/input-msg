import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMsgService } from './input-msg.service';
import { InputValidator } from './input-validator.service';

import { MsgComponent } from './msg.component';
import { InputDirective } from './input.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputDirective,
    MsgComponent
  ],
  providers: [
    InputMsgService,
    InputValidator
  ],
  exports: [
    InputDirective,
    MsgComponent
  ]
})

export class InputMsgModule { }
