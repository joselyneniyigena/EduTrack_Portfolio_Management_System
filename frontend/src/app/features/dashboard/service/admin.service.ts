import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStats, RecentActivity } from '../admin-dashboard/admin-dashboard.component';
import { ApiService } from '../../../core/service/api.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private apiService: ApiService) { }

    getDashboardStats(): Observable<DashboardStats> {
        return this.apiService.get<DashboardStats>('dashboard/stats');
    }

    getRecentActivities(limit: number = 10): Observable<RecentActivity[]> {
        return this.apiService.get<RecentActivity[]>('dashboard/activities', { limit });
    }

    getAssessmentAnalytics(): Observable<any[]> {
        return this.apiService.get<any[]>('dashboard/assessment-analytics');
    }

    getEnrollmentAnalytics(): Observable<any[]> {
        return this.apiService.get<any[]>('dashboard/enrollment-analytics');
    }

    getTrainerDashboardData(trainerId: number): Observable<any> {
        return this.apiService.get<any>(`dashboard/trainer/${trainerId}`);
    }

    getTraineeDashboardData(traineeId: number): Observable<any> {
        return this.apiService.get<any>(`dashboard/trainee/${traineeId}`);
    }
}