import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StgLoyaltyFormComponent } from './stg-loyalty-form.component';

describe('StgLoyaltyFormComponent', () => {
  let component: StgLoyaltyFormComponent;
  let fixture: ComponentFixture<StgLoyaltyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StgLoyaltyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StgLoyaltyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
