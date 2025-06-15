import { TestBed } from '@angular/core/testing';

import { StgLoyaltyService } from './stg-loyalty.service';

describe('StgLoyaltyService', () => {
  let service: StgLoyaltyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StgLoyaltyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
