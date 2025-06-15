import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { DashboardService } from '../service/admin.service';

export interface TraineeDashboardData {
  enrolledCourses: number;
  completedAssessments: number;
  pendingAssessments: number;
  overallProgress: number;
  upcomingDeadlines: any[];
  recentGrades: any[];
  currentModules: any[];
  learningPath: any;
}

@Component({
  selector: 'app-trainee-dashboard',
  templateUrl: './trainee-dashboard.component.html',
  styleUrls: ['./trainee-dashboard.component.scss']
})
export class TraineeDashboardComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  dashboardData: TraineeDashboardData = {
    enrolledCourses: 0,
    completedAssessments: 0,
    pendingAssessments: 0,
    overallProgress: 0,
    upcomingDeadlines: [],
    recentGrades: [],
    currentModules: [],
    learningPath: null
  };
  loading = true;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadTraineeDashboard();
  }

  private loadTraineeDashboard(): void {
    this.loading = true;
    const currentUser = this.authService.getCurrentUser();

    if (currentUser?.id) {
      this.dashboardService.getTraineeDashboardData(currentUser.id).subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load trainee dashboard:', error);
          this.loading = false;
        }
      });
    }
  }

  refreshData(): void {
    this.loadTraineeDashboard();
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return 'primary';
    if (progress >= 60) return 'accent';
    return 'warn';
  }
}