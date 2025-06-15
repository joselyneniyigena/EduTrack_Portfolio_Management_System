import { Routes, PreloadAllModules } from '@angular/router'; // Ensure PreloadAllModules is imported if used
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
    },
    {
        path: 'roles',
        loadChildren: () => import('./features/role-management/role-management.module').then(m => m.RoleManagementModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
    },
    {
        path: 'courses',
        loadChildren: () => import('./features/course-management/course-management.module').then(m => m.CourseManagementModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'trade-management',
        loadChildren: () => import('./features/trade-management/trade-management.module').then(m => m.TradeManagementModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'assessments',
        loadChildren: () => import('./features/assessment/assessment.module').then(m => m.AssessmentModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'academic-years',
        loadChildren: () => import('./features/academic-year/academic-year.module').then(m => m.AcademicYearModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
    },
    {
        path: 'learning-units',
        loadChildren: () => import('./features/learning-unit/learning-unit.module').then(m => m.LearningUnitModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'training',
        loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'evidence',
        loadChildren: () => import('./features/evidence/evidence.module').then(m => m.EvidenceModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'stg-loyalty',
        loadChildren: () => import('./features/stg-loyalty/stg-loyalty.module').then(m => m.StgLoyaltyModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
