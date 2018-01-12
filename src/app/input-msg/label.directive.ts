import { Directive, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InputMsgService } from './input-msg.service';

import { inputMsg } from './types';

@Directive({
  selector: '[gLabel]'
})
export class LabelDirective implements OnInit, OnDestroy {

  @Input() public for: string; // input id
  @Input() public inputName: string;

  private elem: HTMLLabelElement;
  private valid: BehaviorSubject<boolean>;

  constructor(
    private elemRef: ElementRef,
    private inputMsgService: InputMsgService
  ) { }

  public ngOnDestroy(): void {
    if (this.valid && this.valid.unsubscribe) {
      this.valid.unsubscribe();
    }
  }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;

    const inputKey: string = this.for || this.inputName;
    if (!inputKey) {
      throw new Error('gLabel directive: it seems you forgot to set \'for\' or \'inputName\' attribute');
    }

    // Wait till input element will be initialized.
    // We should wait in case the label element was
    // inserted before the input.
    setTimeout(() => {
      const inputParams = this.inputMsgService.getInput(inputKey);
      if (!inputParams) {
        throw new Error(`gLabel directive: can\'t find the element with name or id: ${inputKey}`);
      }
      this.valid = inputParams.valid;
      this.valid.subscribe(this.toggleClassOnValidChange.bind(this));
    }, 0);
  }

  private toggleClassOnValidChange(valid: boolean): void {
    if (valid) {
      this.elem.classList.remove('g-input_invalid');
    } else {
      this.elem.classList.add('g-input_invalid');
    }
  }

}
