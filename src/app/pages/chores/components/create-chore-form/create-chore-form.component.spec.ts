import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChoreFormComponent } from './create-chore-form.component';

describe('CreateChoreFormComponent', () => {
  let component: CreateChoreFormComponent;
  let fixture: ComponentFixture<CreateChoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
