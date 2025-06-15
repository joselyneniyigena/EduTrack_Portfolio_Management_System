import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ApiConfig } from "../../../core/config/api.config";
import { ApiResponse } from "../../../core/models/api-response";
import { TrainerSearchParams, TrainerCreateRequest, TrainerUpdateRequest, TrainerAssignmentRequest, TrainerStats, TrainerPerformanceReport, TrainerFeedback, TrainerSchedule, TrainerAvailability } from "../../../core/models/training-models";
import { ApiService } from "../../../core/service/api.service";
import { Trainer, Course } from "../trainer-list/trainer-list.component";

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
    this.baseUrl = this.apiService['baseUrl'];
  }

  // CRUD Operations
  getAllTrainers(params?: TrainerSearchParams): Observable<Trainer[]> {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof TrainerSearchParams];
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(item => httpParams = httpParams.append(key, item.toString()));
          } else {
            httpParams = httpParams.append(key, value.toString());
          }
        }
      });
    }

    return this.http.get<ApiResponse<Trainer[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_ALL}`, { params: httpParams })
      .pipe(map(response => response.data));
  }

  getTrainerById(id: number): Observable<Trainer> {
    return this.http.get<ApiResponse<Trainer>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_BY_ID}/${id}`)
      .pipe(map(response => response.data));
  }

  createTrainer(trainer: TrainerCreateRequest): Observable<Trainer> {
    return this.http.post<ApiResponse<Trainer>>(`${this.baseUrl}/${ApiConfig.TRAINERS.CREATE}`, trainer)
      .pipe(map(response => response.data));
  }

  updateTrainer(id: number, trainer: Partial<TrainerUpdateRequest>): Observable<Trainer> {
    return this.http.put<ApiResponse<Trainer>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UPDATE}/${id}`, trainer)
      .pipe(map(response => response.data));
  }

  deleteTrainer(id: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.DELETE}/${id}`)
      .pipe(map(response => response.data));
  }

  // Trainer Status Management
  activateTrainer(id: number): Observable<Trainer> {
    return this.http.patch<ApiResponse<Trainer>>(`${this.baseUrl}/${ApiConfig.TRAINERS.ACTIVATE}/${id}`, {})
      .pipe(map(response => response.data));
  }

  deactivateTrainer(id: number): Observable<Trainer> {
    return this.http.patch<ApiResponse<Trainer>>(`${this.baseUrl}/${ApiConfig.TRAINERS.DEACTIVATE}/${id}`, {})
      .pipe(map(response => response.data));
  }

  // Course Assignment Operations
  assignCourse(request: TrainerAssignmentRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.ASSIGN_COURSE}`, request)
      .pipe(map(response => response.data));
  }

  unassignCourse(trainerId: number, courseId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UNASSIGN_COURSE}/${trainerId}/${courseId}`)
      .pipe(map(response => response.data));
  }

  getTrainerCourses(trainerId: number): Observable<Course[]> {
    return this.http.get<ApiResponse<Course[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_COURSES}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  getAvailableCoursesForTrainer(trainerId: number): Observable<Course[]> {
    return this.http.get<ApiResponse<Course[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.AVAILABLE_COURSES}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  // Trainee Management
  getTrainerTrainees(trainerId: number): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_TRAINEES}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  assignTrainee(trainerId: number, traineeId: number): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.ASSIGN_TRAINEE}/${trainerId}/${traineeId}`, {})
      .pipe(map(response => response.data));
  }

  unassignTrainee(trainerId: number, traineeId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UNASSIGN_TRAINEE}/${trainerId}/${traineeId}`)
      .pipe(map(response => response.data));
  }

  // Statistics and Analytics
  getTrainerStats(trainerId: number): Observable<TrainerStats> {
    return this.http.get<ApiResponse<TrainerStats>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_STATS}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  getTrainerPerformanceReport(trainerId: number, period: string): Observable<TrainerPerformanceReport> {
    return this.http.get<ApiResponse<TrainerPerformanceReport>>(`${this.baseUrl}/${ApiConfig.TRAINERS.PERFORMANCE_REPORT}/${trainerId}/${period}`)
      .pipe(map(response => response.data));
  }

  getTrainerFeedback(trainerId: number, courseId?: number): Observable<TrainerFeedback[]> {
    let params = new HttpParams();
    if (courseId) {
      params = params.append('courseId', courseId.toString());
    }

    return this.http.get<ApiResponse<TrainerFeedback[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_FEEDBACK}/${trainerId}`, { params })
      .pipe(map(response => response.data));
  }

  // Schedule Management
  getTrainerSchedule(trainerId: number, startDate?: Date, endDate?: Date): Observable<TrainerSchedule[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.append('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.append('endDate', endDate.toISOString());
    }

    return this.http.get<ApiResponse<TrainerSchedule[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_SCHEDULE}/${trainerId}`, { params })
      .pipe(map(response => response.data));
  }

  createScheduleSession(session: Partial<TrainerSchedule>): Observable<TrainerSchedule> {
    return this.http.post<ApiResponse<TrainerSchedule>>(`${this.baseUrl}/${ApiConfig.TRAINERS.CREATE_SESSION}`, session)
      .pipe(map(response => response.data));
  }

  updateScheduleSession(sessionId: number, session: Partial<TrainerSchedule>): Observable<TrainerSchedule> {
    return this.http.put<ApiResponse<TrainerSchedule>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UPDATE_SESSION}/${sessionId}`, session)
      .pipe(map(response => response.data));
  }

  cancelScheduleSession(sessionId: number, reason?: string): Observable<void> {
    return this.http.patch<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.CANCEL_SESSION}/${sessionId}`, { reason })
      .pipe(map(response => response.data));
  }

  // Availability Management
  getTrainerAvailability(trainerId: number): Observable<TrainerAvailability[]> {
    return this.http.get<ApiResponse<TrainerAvailability[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_AVAILABILITY}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  updateTrainerAvailability(trainerId: number, availability: TrainerAvailability[]): Observable<TrainerAvailability[]> {
    return this.http.put<ApiResponse<TrainerAvailability[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UPDATE_AVAILABILITY}/${trainerId}`, availability)
      .pipe(map(response => response.data));
  }

  // Filter Options
  getDepartments(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_DEPARTMENTS}`)
      .pipe(map(response => response.data));
  }

  getSpecializations(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_SPECIALIZATIONS}`)
      .pipe(map(response => response.data));
  }

  getSkills(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_SKILLS}`)
      .pipe(map(response => response.data));
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}/${ApiConfig.TRAINERS.GET_LANGUAGES}`)
      .pipe(map(response => response.data));
  }

  // Import/Export Operations
  exportTrainers(format: 'xlsx' | 'csv' | 'pdf' = 'xlsx'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${ApiConfig.TRAINERS.EXPORT}`, {
      params: { format },
      responseType: 'blob'
    });
  }

  exportTrainerReport(trainerId: number, format: 'xlsx' | 'pdf' = 'pdf'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${ApiConfig.TRAINERS.EXPORT_REPORT}/${trainerId}`, {
      params: { format },
      responseType: 'blob'
    });
  }

  importTrainers(file: File): Observable<{ successCount: number; errorCount: number; errors: string[] }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ApiResponse<{ successCount: number; errorCount: number; errors: string[] }>>(`${this.baseUrl}/${ApiConfig.TRAINERS.IMPORT}`, formData)
      .pipe(map(response => response.data));
  }

  downloadImportTemplate(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${ApiConfig.TRAINERS.IMPORT_TEMPLATE}`, {
      responseType: 'blob'
    });
  }

  // Profile Management
  uploadProfileImage(trainerId: number, file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<ApiResponse<{ imageUrl: string }>>(`${this.baseUrl}/${ApiConfig.TRAINERS.UPLOAD_IMAGE}/${trainerId}`, formData)
      .pipe(map(response => response.data));
  }

  deleteProfileImage(trainerId: number): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${ApiConfig.TRAINERS.DELETE_IMAGE}/${trainerId}`)
      .pipe(map(response => response.data));
  }

  // Validation Methods
  checkEmailAvailability(email: string, excludeId?: number): Observable<boolean> {
    let params = new HttpParams().append('email', email);
    if (excludeId) {
      params = params.append('excludeId', excludeId.toString());
    }

    return this.http.get<ApiResponse<boolean>>(`${this.baseUrl}/${ApiConfig.TRAINERS.CHECK_EMAIL}`, { params })
      .pipe(map(response => response.data));
  }

  checkPhoneAvailability(phone: string, excludeId?: number): Observable<boolean> {
    let params = new HttpParams().append('phone', phone);
    if (excludeId) {
      params = params.append('excludeId', excludeId.toString());
    }

    return this.http.get<ApiResponse<boolean>>(`${this.baseUrl}/${ApiConfig.TRAINERS.CHECK_PHONE}`, { params })
      .pipe(map(response => response.data));
  }

  // Utility Methods
  getTrainerFullName(trainer: Trainer): string {
    return `${trainer.firstName} ${trainer.lastName}`;
  }

  getTrainerInitials(trainer: Trainer): string {
    return `${trainer.firstName.charAt(0)}${trainer.lastName.charAt(0)}`.toUpperCase();
  }

  calculateExperienceLevel(experienceYears?: number): 'Junior' | 'Mid-level' | 'Senior' | 'Expert' {
    if (!experienceYears) return 'Junior';
    if (experienceYears < 2) return 'Junior';
    if (experienceYears < 5) return 'Mid-level';
    if (experienceYears < 10) return 'Senior';
    return 'Expert';
  }

  formatTrainerStatus(isActive: boolean): { text: string; color: string } {
    return {
      text: isActive ? 'Active' : 'Inactive',
      color: isActive ? 'primary' : 'warn'
    };
  }
}