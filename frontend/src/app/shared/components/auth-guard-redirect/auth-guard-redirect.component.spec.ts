import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGuardRedirectComponent } from './auth-guard-redirect.component';

describe('AuthGuardRedirectComponent', () => {
  let component: AuthGuardRedirectComponent;
  let fixture: ComponentFixture<AuthGuardRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGuardRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthGuardRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
