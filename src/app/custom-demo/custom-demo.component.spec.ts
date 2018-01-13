import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDemoComponent } from './custom-demo.component';

describe('CustomDemoComponent', () => {
  let component: CustomDemoComponent;
  let fixture: ComponentFixture<CustomDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
