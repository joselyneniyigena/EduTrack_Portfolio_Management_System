import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { Role } from '../../../core/models/role';
import { NotificationService } from '../../../core/service/notification.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  roleForm!: FormGroup;
  isEditMode = false;
  roleId: number | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private notificationService: NotificationService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.params['id'];
    if (this.roleId) {
      this.isEditMode = true;
      this.loadRole();
    }
  }

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.pattern(/^[A-Z_]+$/)]],
      name: ['', Validators.required]
    });
  }

  private loadRole(): void {
    if (!this.roleId) return;
    
    this.loading = true;
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (role) => {
        this.populateForm(role);
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load role');
        this.loading = false;
      }
    });
  }

  private populateForm(role: Role): void {
    this.roleForm.patchValue({
      roleName: role.roleName,
      name: role.name
    });
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      this.loading = true;
      const formData = this.prepareFormData();

      const request = this.isEditMode
        ? this.roleService.updateRole(this.roleId!, formData)
        : this.roleService.createRole(formData);

      request.subscribe({
        next: (response) => {
          const action = this.isEditMode ? 'updated' : 'created';
          this.notificationService.success(`Role ${action} successfully`);
          this.router.navigate(['/roles']);
        },
        error: (error) => {
          this.loading = false;
          const action = this.isEditMode ? 'update' : 'create';
          this.notificationService.error(`Failed to ${action} role`);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private prepareFormData(): Role {
    const formValue = this.roleForm.value;
    
    return {
      roleName: formValue.roleName.toUpperCase(),
      name: formValue.name
    };
  }

  private markFormGroupTouched(): void {
    Object.keys(this.roleForm.controls).forEach(key => {
      const control = this.roleForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/roles']);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.roleForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (field?.hasError('pattern')) {
      return 'Role name must contain only uppercase letters and underscores';
    }
    
    return '';
  }

  // Auto-generate roleName from name
  onNameChange(): void {
    const name = this.roleForm.get('name')?.value;
    if (name && !this.isEditMode) {
      const roleName = name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z_]/g, '');
      this.roleForm.get('roleName')?.setValue(roleName);
    }
  }
}