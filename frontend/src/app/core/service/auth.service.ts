import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthApiService, LoginRequest, LoginResponse } from '../../features/auth/services/auth-api.service';
import { User } from '../models/user';
import { StorageService } from './storage.service';


interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private tokenRefreshTimer: any;

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authApiService: AuthApiService
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.storageService.getToken();
    if (token && !this.isTokenExpired(token)) {
      const user = this.storageService.getUser();
      if (user) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        // this.startRefreshTokenTimer();
      }
    } else {
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.authApiService.login(credentials).pipe(
      tap(loginResponse => {
        this.setSession(loginResponse);
        // this.startRefreshTokenTimer();
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<User> {
    return this.authApiService.register(userData);
  }

  logout(): void {
    this.clearSession();
    this.stopRefreshTokenTimer();
    this.router.navigate(['/auth/login']);
  }

  // refreshToken(): Observable<LoginResponse> {
  //   const refreshToken = this.storageService.getRefreshToken();
  //   if (!refreshToken) {
  //     this.logout();
  //     return throwError(() => new Error('No refresh token available'));
  //   }

  //   return this.authApiService.refreshToken(refreshToken).pipe(
  //     tap(loginResponse => {
  //       this.setSession(loginResponse);
  //       this.startRefreshTokenTimer();
  //     }),
  //     catchError(error => {
  //       this.logout();
  //       return throwError(() => error);
  //     })
  //   );
  // }

  forgotPassword(email: string): Observable<any> {
    return this.authApiService.forgotPassword({ email });
  }

  resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
    return this.authApiService.resetPassword({ token, password, confirmPassword });
  }

  private setSession(authResult: LoginResponse): void {
    const expiresAt = new Date().getTime() + (authResult.expiresIn * 1000);
    
    this.storageService.setToken(authResult.token);
    this.storageService.setRefreshToken(authResult.refreshToken);
    this.storageService.setUser(authResult.user);
    this.storageService.setItem('expires_at', expiresAt);
    
    this.currentUserSubject.next(authResult.user);
    this.isAuthenticatedSubject.next(true);
  }

  private clearSession(): void {
    this.storageService.clearAuth();
    this.storageService.removeItem('expires_at');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  public getToken(): string | null {
    return this.storageService.getToken();
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  public hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.userRoles?.some(userRole => userRole.role.roleName === role) || false;
  }

  public hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  public getUserRoles(): string[] {
    const user = this.getCurrentUser();
    return user?.userRoles?.map(userRole => userRole.role.roleName) || [];
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const expirationDate = decoded.exp * 1000;
      return Date.now() >= expirationDate;
    } catch {
      return true;
    }
  }

  private getTokenExpirationDate(): Date | null {
    const expiresAt = this.storageService.getItem<number>('expires_at');
    return expiresAt ? new Date(expiresAt) : null;
  }

  // private startRefreshTokenTimer(): void {
  //   const expirationDate = this.getTokenExpirationDate();
  //   if (!expirationDate) return;

  //   // Refresh token 5 minutes before expiration
  //   const timeout = expirationDate.getTime() - Date.now() - (5 * 60 * 1000);
    
  //   if (timeout > 0) {
  //     this.tokenRefreshTimer = setTimeout(() => {
  //       this.refreshToken().subscribe();
  //     }, timeout);
  //   } else {
  //     // Token expires soon, refresh immediately
  //     this.refreshToken().subscribe();
  //   }
  // }

  private stopRefreshTokenTimer(): void {
    if (this.tokenRefreshTimer) {
      clearTimeout(this.tokenRefreshTimer);
      this.tokenRefreshTimer = null;
    }
  }

  // Utility methods
  public isTokenExpiringSoon(): boolean {
    const expirationDate = this.getTokenExpirationDate();
    if (!expirationDate) return true;

    const fiveMinutes = 5 * 60 * 1000;
    return (expirationDate.getTime() - Date.now()) < fiveMinutes;
  }

  public getTokenTimeRemaining(): number {
    const expirationDate = this.getTokenExpirationDate();
    if (!expirationDate) return 0;

    return Math.max(0, expirationDate.getTime() - Date.now());
  }
}