import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Role } from '../../../core/models/role';
import { NotificationService } from '../../../core/service/notification.service';
import { QueryParams } from '../../../core/service/api.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'roleName',
    'name',
    'userCount',
    'actions'
  ];

  dataSource = new MatTableDataSource<Role>();
  totalElements = 0;
  pageSize = 10;
  loading = false;
  searchTerm = '';
  roleStatistics: any = {};

  constructor(
    private roleService: RoleService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRoles();
    this.loadRoleStatistics();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadRoles(): void {
    this.loading = true;
    const params:QueryParams = {
      page: this.paginator?.pageIndex || 0,
      size: this.pageSize,
      sort: this.sort?.active || 'roleName',
      direction: 'ASC',
      search: this.searchTerm
    };

    this.roleService.getRoles(params).subscribe({
      next: (response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (error) => {
        this.notificationService.error('Failed to load roles');
        this.loading = false;
      }
    });
  }

  loadRoleStatistics(): void {
    this.roleService.getRoleStatistics().subscribe({
      next: (stats) => {
        this.roleStatistics = stats;
      },
      error: (error) => {
        console.error('Failed to load role statistics:', error);
      }
    });
  }

  onSearch(): void {
    this.paginator.firstPage();
    this.loadRoles();
  }

  onPageChange(): void {
    this.loadRoles();
  }

  onSortChange(): void {
    this.loadRoles();
  }

  createRole(): void {
    this.router.navigate(['/roles/new']);
  }

  editRole(role: Role): void {
    this.router.navigate(['/roles/edit', role.id]);
  }

  deleteRole(role: Role): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Role',
        message: `Are you sure you want to delete role "${role.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDestructive: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roleService.deleteRole(role.id!).subscribe({
          next: () => {
            this.notificationService.success('Role deleted successfully');
            this.loadRoles();
            this.loadRoleStatistics();
          },
          error: (error) => {
            this.notificationService.error('Failed to delete role. It may be assigned to users.');
          }
        });
      }
    });
  }

  viewRoleUsers(role: Role): void {
    this.router.navigate(['/roles', role.id, 'users']);
  }

  refreshData(): void {
    this.loadRoles();
    this.loadRoleStatistics();
  }
}