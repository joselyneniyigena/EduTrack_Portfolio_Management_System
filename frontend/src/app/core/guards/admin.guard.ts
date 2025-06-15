import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.currentUser$.pipe(
            take(1),
            map(user => {
                if (!user) {
                    this.router.navigate(['/auth/login']);
                    return false;
                }

                const isAdmin = this.authService.hasAnyRole(['ADMIN', 'SUPER_ADMIN']);

                if (!isAdmin) {
                    this.notificationService.error('Admin access required');
                    this.router.navigate(['/dashboard']);
                    return false;
                }

                return true;
            })
        );
    }
}