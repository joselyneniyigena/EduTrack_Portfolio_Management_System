import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-auth-guard-redirect',
  template: `
    <div class="auth-redirect-container">
      <div class="redirect-card">
        <mat-spinner diameter="40"></mat-spinner>
        <h3>Redirecting...</h3>
        <p>Please wait while we redirect you to the appropriate page.</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-redirect-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .redirect-card {
      background: white;
      padding: 40px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

      h3 {
        margin: 16px 0 8px 0;
        color: #2c3e50;
      }

      p {
        margin: 0;
        color: #7f8c8d;
      }
    }
  `]
})
export class AuthGuardRedirectComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      const userRoles = this.authService.getUserRoles();
      
      // Redirect based on user role
      if (userRoles.includes('SUPER_ADMIN') || userRoles.includes('ADMIN')) {
        this.router.navigate(['/dashboard/admin']);
      } else if (userRoles.includes('TRAINER')) {
        this.router.navigate(['/dashboard/trainer']);
      } else if (userRoles.includes('TRAINEE')) {
        this.router.navigate(['/dashboard/trainee']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl } });
    }
  }
}