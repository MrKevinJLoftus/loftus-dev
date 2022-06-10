import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogWorkFormComponent } from './log-work-form.component';

describe('LogWorkFormComponent', () => {
  let component: LogWorkFormComponent;
  let fixture: ComponentFixture<LogWorkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogWorkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWorkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
