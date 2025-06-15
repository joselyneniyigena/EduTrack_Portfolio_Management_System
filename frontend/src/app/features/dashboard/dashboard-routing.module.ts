import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './trainer-dashboard/trainer-dashboard.component';
import { TraineeDashboardComponent } from './trainee-dashboard/trainee-dashboard.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'SUPER_ADMIN'] }
  },
  {
    path: 'trainer',
    component: TrainerDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['TRAINER', 'ADMIN', 'SUPER_ADMIN'] }
  },
  {
    path: 'trainee',
    component: TraineeDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['TRAINEE', 'TRAINER', 'ADMIN', 'SUPER_ADMIN'] }
  },
  {
    path: 'overview',
    component: AdminDashboardComponent // Default dashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }