import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoRootComponent } from './demo-root.component';

describe('DemoRootComponent', () => {
  let component: DemoRootComponent;
  let fixture: ComponentFixture<DemoRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
