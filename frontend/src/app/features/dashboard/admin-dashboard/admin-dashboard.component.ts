import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../core/service/auth.service';
import { DashboardService } from '../service/admin.service';

export interface DashboardStats {
  totalUsers: number;
  totalTrainees: number;
  totalTrainers: number;
  totalCourses: number;
  totalAssessments: number;
  activeAcademicYears: number;
  pendingAssessments: number;
  completedAssessments: number;
}

export interface RecentActivity {
  id: number;
  type: 'USER_CREATED' | 'ASSESSMENT_COMPLETED' | 'COURSE_ENROLLED' | 'TRAINER_ASSIGNED';
  description: string;
  timestamp: Date;
  user?: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  stats: DashboardStats = {
    totalUsers: 0,
    totalTrainees: 0,
    totalTrainers: 0,
    totalCourses: 0,
    totalAssessments: 0,
    activeAcademicYears: 0,
    pendingAssessments: 0,
    completedAssessments: 0
  };
  
  recentActivities: RecentActivity[] = [];
  chartData: any[] = [];
  loading = true;

  // Chart configurations
  assessmentChartData: any[] = [];
  enrollmentChartData: any[] = [];

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;
    
    forkJoin({
      stats: this.dashboardService.getDashboardStats(),
      activities: this.dashboardService.getRecentActivities(),
      assessmentData: this.dashboardService.getAssessmentAnalytics(),
      enrollmentData: this.dashboardService.getEnrollmentAnalytics()
    }).subscribe({
      next: (data) => {
        this.stats = data.stats;
        this.recentActivities = data.activities;
        this.assessmentChartData = data.assessmentData;
        this.enrollmentChartData = data.enrollmentData;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load dashboard data:', error);
        this.loading = false;
      }
    });
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'USER_CREATED': return 'person_add';
      case 'ASSESSMENT_COMPLETED': return 'assignment_turned_in';
      case 'COURSE_ENROLLED': return 'school';
      case 'TRAINER_ASSIGNED': return 'assignment_ind';
      default: return 'info';
    }
  }

  getActivityColor(type: string): string {
    switch (type) {
      case 'USER_CREATED': return 'primary';
      case 'ASSESSMENT_COMPLETED': return 'accent';
      case 'COURSE_ENROLLED': return 'primary';
      case 'TRAINER_ASSIGNED': return 'warn';
      default: return 'primary';
    }
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}