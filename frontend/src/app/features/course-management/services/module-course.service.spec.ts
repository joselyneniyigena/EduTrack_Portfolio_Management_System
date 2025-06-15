import { TestBed } from '@angular/core/testing';

import { ModuleCourseService } from './module-course.service';

describe('ModuleCourseService', () => {
  let service: ModuleCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
