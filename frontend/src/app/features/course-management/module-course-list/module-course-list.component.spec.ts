import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleCourseListComponent } from './module-course-list.component';

describe('ModuleCourseListComponent', () => {
  let component: ModuleCourseListComponent;
  let fixture: ComponentFixture<ModuleCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleCourseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
