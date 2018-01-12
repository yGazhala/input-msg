import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMsgService } from './input-msg.service';
import { InputValidator } from './input-validator.service';

import { InputDirective } from './input.directive';
import { LabelDirective } from './label.directive';
import { MsgComponent } from './msg.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputDirective,
    LabelDirective,
    MsgComponent
  ],
  providers: [
    InputMsgService,
    InputValidator
  ],
  exports: [
    InputDirective,
    LabelDirective,
    MsgComponent
  ]
})

export class InputMsgModule { }
