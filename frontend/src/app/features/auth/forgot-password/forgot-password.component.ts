import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { NotificationService } from '../../../core/service/notification.service';
import { authAnimations } from '../animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: authAnimations
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  emailSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private authApiService: AuthApiService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      const request = this.forgotPasswordForm.value;

      this.authApiService.forgotPassword(request).subscribe({
        next: (response) => {
          this.emailSent = true;
          this.notificationService.success('Password reset instructions have been sent to your email.');
        },
        error: (error) => {
          this.loading = false;
          let errorMessage = 'Failed to send reset email. Please try again.';
          
          if (error.status === 404) {
            errorMessage = 'No account found with this email address.';
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          
          this.notificationService.error(errorMessage);
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.forgotPasswordForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Email is required';
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    return '';
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  resendEmail(): void {
    this.emailSent = false;
    this.onSubmit();
  }
}