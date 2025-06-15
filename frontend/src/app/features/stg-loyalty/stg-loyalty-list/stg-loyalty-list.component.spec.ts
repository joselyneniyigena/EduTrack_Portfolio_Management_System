import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StgLoyaltyListComponent } from './stg-loyalty-list.component';

describe('StgLoyaltyListComponent', () => {
  let component: StgLoyaltyListComponent;
  let fixture: ComponentFixture<StgLoyaltyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StgLoyaltyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StgLoyaltyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
