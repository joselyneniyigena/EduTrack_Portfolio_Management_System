import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAssessmentListComponent } from './training-assessment-list.component';

describe('TrainingAssessmentListComponent', () => {
  let component: TrainingAssessmentListComponent;
  let fixture: ComponentFixture<TrainingAssessmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingAssessmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
