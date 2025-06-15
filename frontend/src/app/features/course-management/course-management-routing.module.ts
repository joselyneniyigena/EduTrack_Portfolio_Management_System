import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ModuleCourseListComponent } from './module-course-list/module-course-list.component';
import { SchoolProfileListComponent } from './school-profile-list/school-profile-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: CourseListComponent
  },
  {
    path: 'modules',
    component: ModuleCourseListComponent
  },
  {
    path: 'school-profiles',
    component: SchoolProfileListComponent
  },
  {
    path: 'new',
    component: CourseFormComponent
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent
  },
  {
    path: 'detail/:id',
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }
