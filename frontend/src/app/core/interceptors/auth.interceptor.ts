import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Skip auth header for login and register requests
        if (this.isAuthRequest(request.url)) {
            return next.handle(request);
        }

        const token = this.authService.getToken();

        if (token) {
            console.log('Adding token to the request:', token);
            request = this.addTokenToRequest(request, token);
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    // Token expired or invalid
                    // return this.handle401Error(request, next);
                }
                return throwError(error);
            })
        );
    }

    private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // Try to refresh token
    //     return this.authService.refreshToken().pipe(
    //         switchMap(response => {
    //             const newToken = response.token;
    //             return next.handle(this.addTokenToRequest(request, newToken));
    //         }),
    //         catchError(error => {
    //             // Refresh failed, logout user
    //             this.authService.logout();
    //             return throwError(error);
    //         })
    //     );
    // }

    private isAuthRequest(url: string): boolean {
        return url.includes('/auth/login') ||
            url.includes('/auth/register') ||
            url.includes('/auth/refresh') ||
            url.includes('/auth/forgot-password');
    }
}