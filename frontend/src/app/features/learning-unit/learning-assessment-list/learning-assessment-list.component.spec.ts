import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningAssessmentListComponent } from './learning-assessment-list.component';

describe('LearningAssessmentListComponent', () => {
  let component: LearningAssessmentListComponent;
  let fixture: ComponentFixture<LearningAssessmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningAssessmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
