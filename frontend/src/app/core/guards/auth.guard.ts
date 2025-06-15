import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // return this.authService.isAuthenticated$.pipe(
        //     take(1),
        //     map(isAuthenticated => {
        //         if (isAuthenticated) {
        //             return true;
        //         } else {
        //             this.router.navigate(['/auth/login'], {
        //                 queryParams: { returnUrl: state.url }
        //             });
        //             return false;
        //         }
        //     })
        // );
        return true;
    }
}