import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.scss']
})
export class TrainerFormComponent implements OnInit {
  trainerForm!: FormGroup;
  isEditMode = false;
  trainerId?: number;
  loading = false;
  saving = false;

  // Options for form fields
  departments: string[] = [
    'Computer Science',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'DevOps',
    'Cybersecurity',
    'UI/UX Design',
    'Digital Marketing',
    'Project Management',
    'Business Analysis'
  ];

  specializations: string[] = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Machine Learning',
    'Data Analytics',
    'Cloud Computing',
    'Mobile App Development',
    'Game Development',
    'Blockchain',
    'AI/ML',
    'Quality Assurance',
    'Technical Writing'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    this.trainerId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.trainerId;

    if (this.isEditMode) {
      this.loadTrainer();
    }
  }

  initializeForm(): void {
    this.trainerForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^[\+]?[\d\s\-\(\)]+$/)]],
      
      // Professional Information
      department: [''],
      specialization: [''],
      experienceYears: [0, [Validators.min(0), Validators.max(50)]],
      qualifications: [''],
      
      // Profile Information
      bio: ['', [Validators.maxLength(1000)]],
      
      // Status
      isActive: [true]
    });
  }

  loadTrainer(): void {
    if (!this.trainerId) return;

    this.loading = true;
    this.trainerService.getTrainerById(this.trainerId).subscribe({
      next: (trainer) => {
        this.trainerForm.patchValue({
          firstName: trainer.firstName,
          lastName: trainer.lastName,
          email: trainer.email,
          phoneNumber: trainer.phoneNumber || '',
          department: trainer.department || '',
          specialization: trainer.specialization || '',
          experienceYears: trainer.experienceYears || 0,
          qualifications: trainer.qualifications || '',
          bio: trainer.bio || '',
          isActive: trainer.isActive
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trainer:', error);
        this.showSnackBar('Error loading trainer data', 'error');
        this.loading = false;
        this.router.navigate(['/training/trainers']);
      }
    });
  }

  onSubmit(): void {
    if (this.trainerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.saving = true;
    const formData = this.trainerForm.value;

    const operation = this.isEditMode
      ? this.trainerService.updateTrainer(this.trainerId!, formData)
      : this.trainerService.createTrainer(formData);

    operation.subscribe({
      next: (trainer) => {
        const message = this.isEditMode 
          ? 'Trainer updated successfully' 
          : 'Trainer created successfully';
        
        this.showSnackBar(message, 'success');
        this.router.navigate(['/training/trainers', trainer.id]);
      },
      error: (error) => {
        console.error('Error saving trainer:', error);
        const message = this.isEditMode 
          ? 'Error updating trainer' 
          : 'Error creating trainer';
        
        this.showSnackBar(message, 'error');
        this.saving = false;
      }
    });
  }

  onCancel(): void {
    if (this.trainerForm.dirty) {
      const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) {
        return;
      }
    }

    if (this.isEditMode) {
      this.router.navigate(['/training/trainers', this.trainerId]);
    } else {
      this.router.navigate(['/training/trainers']);
    }
  }

  onReset(): void {
    if (this.isEditMode) {
      this.loadTrainer();
    } else {
      this.trainerForm.reset();
      this.trainerForm.patchValue({ isActive: true });
    }
  }

  // Form field getters for template
  get firstName() { return this.trainerForm.get('firstName'); }
  get lastName() { return this.trainerForm.get('lastName'); }
  get email() { return this.trainerForm.get('email'); }
  get phoneNumber() { return this.trainerForm.get('phoneNumber'); }
  get department() { return this.trainerForm.get('department'); }
  get specialization() { return this.trainerForm.get('specialization'); }
  get experienceYears() { return this.trainerForm.get('experienceYears'); }
  get qualifications() { return this.trainerForm.get('qualifications'); }
  get bio() { return this.trainerForm.get('bio'); }
  get isActive() { return this.trainerForm.get('isActive'); }

  // Helper methods
  getFieldError(fieldName: string): string {
    const field = this.trainerForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${fieldName} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} cannot be less than ${field.errors['min'].min}`;
      if (field.errors['max']) return `${fieldName} cannot be greater than ${field.errors['max'].max}`;
      if (field.errors['pattern']) return `${fieldName} format is invalid`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.trainerForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.trainerForm.controls).forEach(key => {
      const control = this.trainerForm.get(key);
      control?.markAsTouched();
    });
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}