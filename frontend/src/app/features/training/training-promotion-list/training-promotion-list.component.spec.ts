import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPromotionListComponent } from './training-promotion-list.component';

describe('TrainingPromotionListComponent', () => {
  let component: TrainingPromotionListComponent;
  let fixture: ComponentFixture<TrainingPromotionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingPromotionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPromotionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
