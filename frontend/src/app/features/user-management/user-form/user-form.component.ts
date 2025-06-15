import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RoleService } from '../../role-management/services/role.service';
import { Role } from '../../../core/models/role';
import { User, UserRole } from '../../../core/models/user';
import { NotificationService } from '../../../core/service/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  loading = false;
  availableRoles: Role[] = [];
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private notificationService: NotificationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadRoles();
    
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.isEditMode = true;
      this.loadUser();
    }
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      userReference: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      enabled: [true],
      roles: this.fb.array([])
    });
  }

  get rolesFormArray(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  private loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.availableRoles = roles;
      },
      error: (error) => {
        this.notificationService.error('Failed to load roles');
      }
    });
  }

  private loadUser(): void {
    if (!this.userId) return;
    
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.populateForm(user);
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load user');
        this.loading = false;
      }
    });
  }

  private populateForm(user: User): void {
    this.userForm.patchValue({
      userReference: user.userReference,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      address: user.address,
      enabled: user.enabled
    });

    // Remove password requirement for edit mode
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();

    // Set user roles
    this.setUserRoles(user.userRoles || []);
  }

  private setUserRoles(userRoles: UserRole[]): void {
    const rolesArray = this.userForm.get('roles') as FormArray;
    rolesArray.clear();

    this.availableRoles.forEach(role => {
      const isSelected = userRoles.some(ur => ur.role.id === role.id);
      rolesArray.push(this.fb.control(isSelected));
    });
  }

  onRoleChange(roleIndex: number, event: any): void {
    const rolesArray = this.userForm.get('roles') as FormArray;
    rolesArray.at(roleIndex).setValue(event.checked);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      const formData = this.prepareFormData();

      const request = this.isEditMode
        ? this.userService.updateUser(this.userId!, formData)
        : this.userService.createUser(formData);

      request.subscribe({
        next: (response) => {
          const action = this.isEditMode ? 'updated' : 'created';
          this.notificationService.success(`User ${action} successfully`);
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.loading = false;
          const action = this.isEditMode ? 'update' : 'create';
          this.notificationService.error(`Failed to ${action} user`);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private prepareFormData(): User {
    const formValue = this.userForm.value;
    const selectedRoles = this.getSelectedRoles();

    const userData: User = {
      userReference: formValue.userReference,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      username: formValue.username,
      phoneNumber: formValue.phoneNumber,
      address: formValue.address,
      enabled: formValue.enabled,
      userRoles: selectedRoles.map(role => ({
        role: role,
        user: {} as User // Will be set by backend
      }))
    };

    if (formValue.password) {
      userData.password = formValue.password;
    }

    return userData;
  }

  private getSelectedRoles(): Role[] {
    const selectedRoles: Role[] = [];
    const rolesFormArray = this.userForm.get('roles') as FormArray;

    rolesFormArray.controls.forEach((control, index) => {
      if (control.value) {
        selectedRoles.push(this.availableRoles[index]);
      }
    });

    return selectedRoles;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (field?.hasError('email')) {
      return 'Please enter a valid email';
    }
    
    if (field?.hasError('minlength')) {
      return `Password must be at least 6 characters long`;
    }
    
    return '';
  }
}