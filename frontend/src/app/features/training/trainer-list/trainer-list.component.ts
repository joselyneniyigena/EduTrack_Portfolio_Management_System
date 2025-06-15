import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface Trainer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  specialization?: string;
  department?: string;
  experienceYears?: number;
  qualifications?: string;
  bio?: string;
  isActive: boolean;
  dateJoined: Date;
  lastLogin?: Date;
  assignedCourses?: Course[];
  assignedTrainees?: number;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
}

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.scss']
})
export class TrainerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'avatar',
    'name',
    'email',
    'specialization',
    'department',
    'experienceYears',
    'assignedCourses',
    'assignedTrainees',
    'status',
    'lastLogin',
    'actions'
  ];

  dataSource = new MatTableDataSource<Trainer>();
  loading = false;
  totalCount = 0;

  // Filters
  searchTerm = '';
  departmentFilter = '';
  specializationFilter = '';
  statusFilter = '';
  
  // Filter options
  departments: string[] = [];
  specializations: string[] = [];

  constructor(
    private trainerService: TrainerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrainers();
    this.loadFilterOptions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom filter predicate
    this.dataSource.filterPredicate = (data: Trainer, filter: string) => {
      const searchTermMatch = !this.searchTerm || 
        data.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        data.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        data.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const departmentMatch = !this.departmentFilter || data.department === this.departmentFilter;
      const specializationMatch = !this.specializationFilter || data.specialization === this.specializationFilter;
      const statusMatch = !this.statusFilter || 
        (this.statusFilter === 'active' && data.isActive) ||
        (this.statusFilter === 'inactive' && !data.isActive);

      return searchTermMatch && departmentMatch && specializationMatch && statusMatch;
    };
  }

  loadTrainers(): void {
    this.loading = true;
    this.trainerService.getAllTrainers().subscribe({
      next: (trainers) => {
        this.dataSource.data = trainers;
        this.totalCount = trainers.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trainers:', error);
        this.showSnackBar('Error loading trainers', 'error');
        this.loading = false;
      }
    });
  }

  loadFilterOptions(): void {
    // Load departments and specializations for filters
    this.trainerService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });

    this.trainerService.getSpecializations().subscribe(specializations => {
      this.specializations = specializations;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = Date.now().toString(); // Trigger filter
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.departmentFilter = '';
    this.specializationFilter = '';
    this.statusFilter = '';
    this.applyFilter();
  }

  createTrainer(): void {
    this.router.navigate(['/training/trainers/new']);
  }

  editTrainer(trainer: Trainer): void {
    this.router.navigate(['/training/trainers', trainer.id, 'edit']);
  }

  viewTrainer(trainer: Trainer): void {
    this.router.navigate(['/training/trainers', trainer.id]);
  }

  toggleTrainerStatus(trainer: Trainer): void {
    const action = trainer.isActive ? 'deactivate' : 'activate';
    const message = `Are you sure you want to ${action} ${trainer.firstName} ${trainer.lastName}?`;

    if (confirm(message)) {
      trainer.isActive = !trainer.isActive;
      this.trainerService.updateTrainer(trainer.id, trainer).subscribe({
        next: () => {
          this.showSnackBar(`Trainer ${action}d successfully`, 'success');
          this.loadTrainers();
        },
        error: (error) => {
          console.error(`Error ${action}ing trainer:`, error);
          this.showSnackBar(`Error ${action}ing trainer`, 'error');
          trainer.isActive = !trainer.isActive; // Revert on error
        }
      });
    }
  }

  deleteTrainer(trainer: Trainer): void {
    const message = `Are you sure you want to delete ${trainer.firstName} ${trainer.lastName}? This action cannot be undone.`;
    
    if (confirm(message)) {
      this.trainerService.deleteTrainer(trainer.id).subscribe({
        next: () => {
          this.showSnackBar('Trainer deleted successfully', 'success');
          this.loadTrainers();
        },
        error: (error) => {
          console.error('Error deleting trainer:', error);
          this.showSnackBar('Error deleting trainer', 'error');
        }
      });
    }
  }

  assignCourse(trainer: Trainer): void {
    // Open dialog to assign courses
    // const dialogRef = this.dialog.open(AssignCourseDialogComponent, {
    //   width: '600px',
    //   data: { trainer, availableCourses: [] } // Load available courses
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadTrainers(); // Refresh data
    //   }
    // });
  }

  viewAssignedCourses(trainer: Trainer): void {
    // Navigate to trainer's courses view
    this.router.navigate(['/training/trainers', trainer.id, 'courses']);
  }

  viewAssignedTrainees(trainer: Trainer): void {
    // Navigate to trainer's trainees view
    this.router.navigate(['/training/trainers', trainer.id, 'trainees']);
  }

  exportTrainers(): void {
    this.trainerService.exportTrainers().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `trainers_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting trainers:', error);
        this.showSnackBar('Error exporting trainers', 'error');
      }
    });
  }

  refreshData(): void {
    this.loadTrainers();
  }

  getStatusColor(trainer: Trainer): string {
    return trainer.isActive ? 'primary' : 'warn';
  }

  getStatusText(trainer: Trainer): string {
    return trainer.isActive ? 'Active' : 'Inactive';
  }

  getFullName(trainer: Trainer): string {
    return `${trainer.firstName} ${trainer.lastName}`;
  }

  getInitials(trainer: Trainer): string {
    return `${trainer.firstName.charAt(0)}${trainer.lastName.charAt(0)}`.toUpperCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString();
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}

// Injectable service (you'll need to implement this)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = '/api/trainers';

  constructor(private http: HttpClient) {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl);
  }

  getTrainerById(id: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/${id}`);
  }

  createTrainer(trainer: Partial<Trainer>): Observable<Trainer> {
    return this.http.post<Trainer>(this.apiUrl, trainer);
  }

  updateTrainer(id: number, trainer: Partial<Trainer>): Observable<Trainer> {
    return this.http.put<Trainer>(`${this.apiUrl}/${id}`, trainer);
  }

  deleteTrainer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDepartments(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/departments`);
  }

  getSpecializations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/specializations`);
  }

  exportTrainers(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }

  assignCourse(trainerId: number, courseId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${trainerId}/courses/${courseId}`, {});
  }

  unassignCourse(trainerId: number, courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${trainerId}/courses/${courseId}`);
  }
}