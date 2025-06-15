import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { NotificationService } from '../../../core/service/notification.service';

// Custom Validators
export class CustomValidators {
  static passwordMatch(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  static strongPassword(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);

    const valid = hasNumber && hasUpper && hasLower && hasSpecial;
    
    if (!valid) {
      return { strongPassword: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  currentStep = 0;
  maxSteps = 2;

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
    this.registerForm = this.formBuilder.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      
      // Account Information
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9._-]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), CustomValidators.strongPassword]],
      confirmPassword: ['', [Validators.required]],
      
      // Terms and Conditions
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validators: CustomValidators.passwordMatch });
  }

  get personalInfoGroup() {
    return {
      firstName: this.registerForm.get('firstName'),
      lastName: this.registerForm.get('lastName'),
      phoneNumber: this.registerForm.get('phoneNumber'),
      address: this.registerForm.get('address')
    };
  }

  get accountInfoGroup() {
    return {
      email: this.registerForm.get('email'),
      username: this.registerForm.get('username'),
      password: this.registerForm.get('password'),
      confirmPassword: this.registerForm.get('confirmPassword'),
      acceptTerms: this.registerForm.get('acceptTerms')
    };
  }

  isStepValid(step: number): boolean {
    if (step === 0) {
      return Object.values(this.personalInfoGroup).every(control => control?.valid);
    } else if (step === 1) {
      return Object.values(this.accountInfoGroup).every(control => control?.valid) && 
             !this.registerForm.hasError('passwordMismatch');
    }
    return false;
  }

  nextStep(): void {
    if (this.currentStep < this.maxSteps - 1 && this.isStepValid(this.currentStep)) {
      this.currentStep++;
    } else {
      this.markCurrentStepTouched();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  private markCurrentStepTouched(): void {
    const controls = this.currentStep === 0 ? this.personalInfoGroup : this.accountInfoGroup;
    Object.values(controls).forEach(control => control?.markAsTouched());
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const userData = this.registerForm.value;

      this.authApiService.register(userData).subscribe({
        next: (response) => {
          this.notificationService.success('Account created successfully! Please check your email to verify your account.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.loading = false;
          let errorMessage = 'Registration failed. Please try again.';
          
          if (error.status === 409) {
            errorMessage = 'Username or email already exists.';
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
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength']?.requiredLength;
      return `${this.getFieldDisplayName(fieldName)} must be at least ${minLength} characters`;
    }
    
    if (field?.hasError('pattern')) {
      if (fieldName === 'phoneNumber') {
        return 'Please enter a valid phone number';
      }
      if (fieldName === 'username') {
        return 'Username can only contain letters, numbers, dots, underscores, and hyphens';
      }
    }
    
    if (field?.hasError('strongPassword')) {
      return 'Password must contain at least one uppercase letter, lowercase letter, number, and special character';
    }
    
    if (fieldName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      phoneNumber: 'Phone number',
      address: 'Address',
      email: 'Email',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };
    return displayNames[fieldName] || fieldName;
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  getPasswordStrength(): string {
    const password = this.registerForm.get('password')?.value;
    if (!password) return '';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[#?!@$%^&*-]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  }
}