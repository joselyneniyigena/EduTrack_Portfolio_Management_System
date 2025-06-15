import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningUnitFormComponent } from './learning-unit-form.component';

describe('LearningUnitFormComponent', () => {
  let component: LearningUnitFormComponent;
  let fixture: ComponentFixture<LearningUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningUnitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
