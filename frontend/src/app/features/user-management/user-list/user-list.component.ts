import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { User } from '../../../core/models/user';
import { NotificationService } from '../../../core/service/notification.service';
import { QueryParams } from '../../../core/service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'userReference',
    'firstName',
    'lastName',
    'email',
    'username',
    'roles',
    'enabled',
    'registrationDate',
    'actions'
  ];

  dataSource = new MatTableDataSource<User>();
  totalElements = 0;
  pageSize = 10;
  loading = false;
  searchTerm = '';

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsers(): void {
    this.loading = true;
    const params: QueryParams = {
      page: this.paginator?.pageIndex || 0,
      size: this.pageSize,
      sort: this.sort?.active || 'firstName',
      direction: 'ASC',
      search: this.searchTerm
    };

    this.userService.getUsers(params).subscribe({
      next: (response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load users');
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.paginator.firstPage();
    this.loadUsers();
  }

  onPageChange(): void {
    this.loadUsers();
  }

  onSortChange(): void {
    this.loadUsers();
  }

  createUser(): void {
    this.router.navigate(['/users/new']);
  }

  editUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  viewUser(user: User): void {
    this.router.navigate(['/users/detail', user.id]);
  }

  toggleUserStatus(user: User): void {
    const action = user.enabled ? 'disable' : 'enable';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
        message: `Are you sure you want to ${action} ${user.firstName} ${user.lastName}?`,
        confirmText: action.charAt(0).toUpperCase() + action.slice(1),
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.toggleUserStatus(user.id!).subscribe({
          next: (updatedUser) => {
            this.notificationService.success(`User ${action}d successfully`);
            this.loadUsers();
          },
          error: (error) => {
            this.notificationService.error(`Failed to ${action} user`);
          }
        });
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id!).subscribe({
          next: () => {
            this.notificationService.success('User deleted successfully');
            this.loadUsers();
          },
          error: (error) => {
            this.notificationService.error('Failed to delete user');
          }
        });
      }
    });
  }

  resetPassword(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Reset Password',
        message: `Reset password for ${user.firstName} ${user.lastName}? A new password will be sent to their email.`,
        confirmText: 'Reset',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.resetPassword(user.id!).subscribe({
          next: () => {
            this.notificationService.success('Password reset email sent successfully');
          },
          error: (error) => {
            this.notificationService.error('Failed to reset password');
          }
        });
      }
    });
  }

  getRoleNames(user: User): string {
    return user.userRoles?.map(ur => ur.role.name).join(', ') || 'No roles';
  }
}