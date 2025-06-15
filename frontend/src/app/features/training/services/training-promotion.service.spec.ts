import { TestBed } from '@angular/core/testing';

import { TrainingPromotionService } from './training-promotion.service';

describe('TrainingPromotionService', () => {
  let service: TrainingPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
