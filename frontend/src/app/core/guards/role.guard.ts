import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';


@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const requiredRoles = route.data['roles'] as string[];

        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        return true;

        // return this.authService.currentUser$.pipe(
        //     take(1),
        //     map(user => {
        //         if (!user) {
        //             this.router.navigate(['/auth/login']);
        //             return false;
        //         }

        //         const hasRequiredRole = this.authService.hasAnyRole(requiredRoles);

        //         if (!hasRequiredRole) {
        //             this.notificationService.error('You do not have permission to access this page');
        //             this.router.navigate(['/dashboard']);
        //             return false;
        //         }

        //         return true;
        //     })
        // );
    }
}