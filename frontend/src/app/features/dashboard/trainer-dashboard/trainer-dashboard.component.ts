import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { DashboardService } from '../service/admin.service';

export interface TrainerDashboardData {
  assignedTrainees: number;
  activeAssessments: number;
  pendingGrading: number;
  completedAssessments: number;
  upcomingClasses: any[];
  recentSubmissions: any[];
  myModules: any[];
}

@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {
  currentUser$ = this.authService.currentUser$;
  dashboardData: TrainerDashboardData = {
    assignedTrainees: 0,
    activeAssessments: 0,
    pendingGrading: 0,
    completedAssessments: 0,
    upcomingClasses: [],
    recentSubmissions: [],
    myModules: []
  };
  loading = true;

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.loadTrainerDashboard();
  }

  private loadTrainerDashboard(): void {
    this.loading = true;
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser?.id) {
      this.dashboardService.getTrainerDashboardData(currentUser.id).subscribe({
        next: (data) => {
          this.dashboardData = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load trainer dashboard:', error);
          this.loading = false;
        }
      });
    }
  }

  refreshData(): void {
    this.loadTrainerDashboard();
  }
}