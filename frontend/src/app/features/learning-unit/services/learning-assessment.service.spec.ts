import { TestBed } from '@angular/core/testing';

import { LearningAssessmentService } from './learning-assessment.service';

describe('LearningAssessmentService', () => {
  let service: LearningAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
