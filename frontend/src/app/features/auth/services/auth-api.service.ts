import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfig } from '../../../core/config/api.config';
import { ApiResponse } from '../../../core/models/api-response';
import { User } from '../../../core/models/user';
import { ApiService } from '../../../core/service/api.service';

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
  expiresIn: number;
  tokenType: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.LOGIN}`, credentials);
  }

  register(userData: RegisterRequest): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.REGISTER}`, userData)
      .pipe(map(response => response.data));
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.FORGOT_PASSWORD}`, request)
      .pipe(map(response => response.data));
  }

  resetPassword(request: ResetPasswordRequest): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.RESET_PASSWORD}`, request)
      .pipe(map(response => response.data));
  }

  verifyEmail(request: VerifyEmailRequest): Observable<{ message: string }> {
    return this.http.post<ApiResponse<{ message: string }>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.VERIFY_EMAIL}`, request)
      .pipe(map(response => response.data));
  }

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.REFRESH}`, { refreshToken })
      .pipe(map(response => response.data));
  }

  logout(): Observable<void> {
    return this.http.post<ApiResponse<void>>(`${this.apiService['baseUrl']}/${ApiConfig.AUTH.LOGOUT}`, {})
      .pipe(map(response => response.data));
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<ApiResponse<boolean>>(`${this.apiService['baseUrl']}/auth/check-username/${username}`)
      .pipe(map(response => response.data));
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    return this.http.get<ApiResponse<boolean>>(`${this.apiService['baseUrl']}/auth/check-email/${email}`)
      .pipe(map(response => response.data));
  }
}