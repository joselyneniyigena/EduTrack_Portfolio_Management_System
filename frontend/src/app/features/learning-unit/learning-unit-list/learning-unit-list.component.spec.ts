import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningUnitListComponent } from './learning-unit-list.component';

describe('LearningUnitListComponent', () => {
  let component: LearningUnitListComponent;
  let fixture: ComponentFixture<LearningUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningUnitListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
