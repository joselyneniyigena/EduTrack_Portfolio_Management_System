import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trainer, Course } from '../trainer-list/trainer-list.component';

export interface Trainee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  educationLevel?: string;
  previousExperience?: string;
  skills?: string[];
  interests?: string[];
  enrollmentDate: Date;
  graduationDate?: Date;
  status: 'ACTIVE' | 'GRADUATED' | 'DROPPED_OUT' | 'SUSPENDED';
  gpa?: number;
  attendanceRate?: number;
  assignedTrainer?: Trainer;
  enrolledCourses?: Course[];
  completedAssessments?: number;
  pendingAssessments?: number;
  certificates?: Certificate[];
  lastActivity?: Date;
}

export interface Certificate {
  id: number;
  name: string;
  issueDate: Date;
  expiryDate?: Date;
}

@Component({
  selector: 'app-trainee-list',
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.scss']
})
export class TraineeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'avatar',
    'name',
    'email',
    'enrollmentDate',
    'status',
    'assignedTrainer',
    'enrolledCourses',
    'gpa',
    'attendanceRate',
    'assessments',
    'lastActivity',
    'actions'
  ];

  dataSource = new MatTableDataSource<Trainee>();
  loading = false;
  totalCount = 0;

  // Filters
  searchTerm = '';
  statusFilter = '';
  trainerFilter = '';
  courseFilter = '';
  enrollmentYearFilter = '';
  
  // Filter options
  trainers: Trainer[] = [];
  courses: Course[] = [];
  enrollmentYears: number[] = [];

  constructor(
    private traineeService: TraineeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrainees();
    this.loadFilterOptions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom filter predicate
    // this.dataSource.filterPredicate = (data: Trainee, filter: string) => {
    //   const searchTermMatch = !this.searchTerm || 
    //     data.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     data.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     data.email.toLowerCase().includes(this.searchTerm.toLowerCase());

    //   const statusMatch = !this.statusFilter || data.status === this.statusFilter;
    //   const trainerMatch = !this.trainerFilter || data.assignedTrainer?.id.toString() === this.trainerFilter;
    //   const courseMatch = !this.courseFilter || 
    //     data.enrolledCourses?.some(course => course.id.toString() === this.courseFilter);
    //   const yearMatch = !this.enrollmentYearFilter || 
    //     new Date(data.enrollmentDate).getFullYear().toString() === this.enrollmentYearFilter;

    //   return searchTermMatch && statusMatch && trainerMatch && courseMatch && yearMatch;
    // };
  }

  loadTrainees(): void {
    this.loading = true;
    this.traineeService.getAllTrainees().subscribe({
      next: (trainees) => {
        this.dataSource.data = trainees;
        this.totalCount = trainees.length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trainees:', error);
        this.showSnackBar('Error loading trainees', 'error');
        this.loading = false;
      }
    });
  }

  loadFilterOptions(): void {
    // Load trainers for filter
    this.traineeService.getTrainers().subscribe(trainers => {
      this.trainers = trainers;
    });

    // Load courses for filter
    this.traineeService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    // Generate enrollment years (current year - 5 to current year + 1)
    const currentYear = new Date().getFullYear();
    this.enrollmentYears = Array.from({length: 7}, (_, i) => currentYear - 5 + i);
  }

  applyFilter(): void {
    this.dataSource.filter = Date.now().toString(); // Trigger filter
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.trainerFilter = '';
    this.courseFilter = '';
    this.enrollmentYearFilter = '';
    this.applyFilter();
  }

  createTrainee(): void {
    this.router.navigate(['/training/trainees/new']);
  }

  editTrainee(trainee: Trainee): void {
    this.router.navigate(['/training/trainees', trainee.id, 'edit']);
  }

  viewTrainee(trainee: Trainee): void {
    this.router.navigate(['/training/trainees', trainee.id]);
  }

  updateTraineeStatus(trainee: Trainee, newStatus: string): void {
    const message = `Are you sure you want to change ${trainee.firstName} ${trainee.lastName}'s status to ${newStatus}?`;

    if (confirm(message)) {
      const oldStatus = trainee.status;
      trainee.status = newStatus as any;
      
      this.traineeService.updateTrainee(trainee.id, trainee).subscribe({
        next: () => {
          this.showSnackBar(`Trainee status updated successfully`, 'success');
          this.loadTrainees();
        },
        error: (error) => {
          console.error('Error updating trainee status:', error);
          this.showSnackBar('Error updating trainee status', 'error');
          trainee.status = oldStatus; // Revert on error
        }
      });
    }
  }

  deleteTrainee(trainee: Trainee): void {
    const message = `Are you sure you want to delete ${trainee.firstName} ${trainee.lastName}? This action cannot be undone.`;
    
    if (confirm(message)) {
      this.traineeService.deleteTrainee(trainee.id).subscribe({
        next: () => {
          this.showSnackBar('Trainee deleted successfully', 'success');
          this.loadTrainees();
        },
        error: (error) => {
          console.error('Error deleting trainee:', error);
          this.showSnackBar('Error deleting trainee', 'error');
        }
      });
    }
  }

  enrollInCourse(trainee: Trainee): void {
    // Open dialog to enroll in courses
    // const dialogRef = this.dialog.open(EnrollCourseDialogComponent, {
    //   width: '600px',
    //   data: { trainee, availableCourses: this.courses }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadTrainees(); // Refresh data
    //   }
    // });
  }

  assignTrainer(trainee: Trainee): void {
    // Open dialog to assign trainer
    // const dialogRef = this.dialog.open(AssignTrainerDialogComponent, {
    //   width: '500px',
    //   data: { trainee, trainers: this.trainers }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadTrainees(); // Refresh data
    //   }
    // });
  }

  viewProgress(trainee: Trainee): void {
    this.router.navigate(['/training/trainees', trainee.id, 'progress']);
  }

  viewAssessments(trainee: Trainee): void {
    this.router.navigate(['/training/trainees', trainee.id, 'assessments']);
  }

  viewCertificates(trainee: Trainee): void {
    this.router.navigate(['/training/trainees', trainee.id, 'certificates']);
  }

  exportTrainees(): void {
    this.traineeService.exportTrainees().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `trainees_${new Date().toISOString().split('T')[0]}.xlsx`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting trainees:', error);
        this.showSnackBar('Error exporting trainees', 'error');
      }
    });
  }

  bulkEnroll(): void {
    // Open dialog for bulk enrollment
    // const dialogRef = this.dialog.open(BulkEnrollDialogComponent, {
    //   width: '700px',
    //   data: { courses: this.courses }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.loadTrainees();
    //   }
    // });
  }

  refreshData(): void {
    this.loadTrainees();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'ACTIVE': return 'primary';
      case 'GRADUATED': return 'accent';
      case 'DROPPED_OUT': return 'warn';
      case 'SUSPENDED': return 'warn';
      default: return 'primary';
    }
  }

  getStatusText(status: string): string {
    return status.replace('_', ' ').toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  getFullName(trainee: Trainee): string {
    return `${trainee.firstName} ${trainee.lastName}`;
  }

  getInitials(trainee: Trainee): string {
    return `${trainee.firstName.charAt(0)}${trainee.lastName.charAt(0)}`.toUpperCase();
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  formatPercentage(value: number | undefined): string {
    if (value === undefined) return 'N/A';
    return `${Math.round(value)}%`;
  }

  getGpaColor(gpa: number | undefined): string {
    if (!gpa) return '';
    if (gpa >= 3.5) return 'primary';
    if (gpa >= 2.5) return 'accent';
    return 'warn';
  }

  getAttendanceColor(rate: number | undefined): string {
    if (!rate) return '';
    if (rate >= 90) return 'primary';
    if (rate >= 75) return 'accent';
    return 'warn';
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}

// Injectable service
@Injectable({
  providedIn: 'root'
})
export class TraineeService {
  private apiUrl = '/api/trainees';

  constructor(private http: HttpClient) {}

  getAllTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(this.apiUrl);
  }

  getTraineeById(id: number): Observable<Trainee> {
    return this.http.get<Trainee>(`${this.apiUrl}/${id}`);
  }

  createTrainee(trainee: Partial<Trainee>): Observable<Trainee> {
    return this.http.post<Trainee>(this.apiUrl, trainee);
  }

  updateTrainee(id: number, trainee: Partial<Trainee>): Observable<Trainee> {
    return this.http.put<Trainee>(`${this.apiUrl}/${id}`, trainee);
  }

  deleteTrainee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>('/api/trainers');
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses');
  }

  exportTrainees(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }

  enrollInCourse(traineeId: number, courseId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${traineeId}/courses/${courseId}`, {});
  }

  unenrollFromCourse(traineeId: number, courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${traineeId}/courses/${courseId}`);
  }

  assignTrainer(traineeId: number, trainerId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${traineeId}/trainer/${trainerId}`, {});
  }

  getTraineeProgress(traineeId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${traineeId}/progress`);
  }

  getTraineeAssessments(traineeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${traineeId}/assessments`);
  }
}