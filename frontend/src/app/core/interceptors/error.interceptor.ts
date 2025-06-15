import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(error);
            })
        );
    }

    private handleError(error: HttpErrorResponse): void {
        let errorMessage = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
        } else {
            // Server-side error
            switch (error.status) {
                case 400:
                    errorMessage = this.extractErrorMessage(error) || 'Bad Request';
                    break;
                case 401:
                    errorMessage = 'Unauthorized access';
                    break;
                case 403:
                    errorMessage = 'Access forbidden';
                    break;
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 409:
                    errorMessage = this.extractErrorMessage(error) || 'Conflict occurred';
                    break;
                case 422:
                    errorMessage = this.extractValidationErrors(error);
                    break;
                case 500:
                    errorMessage = 'Internal server error';
                    break;
                default:
                    errorMessage = `Error ${error.status}: ${error.statusText}`;
            }
        }

        // Don't show notification for 401 errors (handled by auth interceptor)
        if (error.status !== 401) {
            this.notificationService.error(errorMessage);
        }
    }

    private extractErrorMessage(error: HttpErrorResponse): string {
        if (error.error?.message) {
            return error.error.message;
        }
        if (error.error?.error) {
            return error.error.error;
        }
        return '';
    }

    private extractValidationErrors(error: HttpErrorResponse): string {
        if (error.error?.errors && Array.isArray(error.error.errors)) {
            return error.error.errors.join(', ');
        }
        if (error.error?.message) {
            return error.error.message;
        }
        return 'Validation failed';
    }
}