import { TestBed } from '@angular/core/testing';

import { LearningUnitService } from './learning-unit.service';

describe('LearningUnitService', () => {
  let service: LearningUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
