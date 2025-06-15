import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearFormComponent } from './academic-year-form.component';

describe('AcademicYearFormComponent', () => {
  let component: AcademicYearFormComponent;
  let fixture: ComponentFixture<AcademicYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicYearFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
