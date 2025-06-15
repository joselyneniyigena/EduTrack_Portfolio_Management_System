import { TestBed } from '@angular/core/testing';

import { TraineeAssessmentService } from './trainee-assessment.service';

describe('TraineeAssessmentService', () => {
  let service: TraineeAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
