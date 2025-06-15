import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAssessmentListComponent } from './trainee-assessment-list.component';

describe('TraineeAssessmentListComponent', () => {
  let component: TraineeAssessmentListComponent;
  let fixture: ComponentFixture<TraineeAssessmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeAssessmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
