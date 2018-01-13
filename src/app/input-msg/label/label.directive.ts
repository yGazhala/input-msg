import { Directive, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { InputStorageService } from '../input-storage.service';

import { inputMsg } from '../types';

/**
 * Adds/removes 'g-input_invalid' css class
 * when input status changes
 */
@Directive({
  selector: '[gLabel]'
})
export class LabelDirective implements OnInit, OnDestroy {

  /**
   * input element id or name
   */
  @Input() public for: string;

  private elem: HTMLLabelElement;
  private valid: BehaviorSubject<boolean>;

  constructor(
    private elemRef: ElementRef,
    private inputStorageService: InputStorageService
  ) { }

  public ngOnDestroy(): void {
    if (this.valid && this.valid.unsubscribe) {
      this.valid.unsubscribe();
    }
  }

  public ngOnInit(): void {

    this.elem = this.elemRef.nativeElement;

    if (!this.for) {
      throw new Error('gLabel directive: \'for\' attribute with input id or name is required.');
    }

    // Wait till the input element will be initialized.
    // We should wait in case the label element was
    // inserted before the input.
    setTimeout(() => {
      const inputParams = this.inputStorageService.get(this.for);
      if (!inputParams) {
        throw new Error(`gLabel directive: can\'t find the input element with id or name: ${this.for}`);
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
