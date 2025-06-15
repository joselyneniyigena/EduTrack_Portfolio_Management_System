import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { TraineeAssessmentListComponent } from './trainee-assessment-list/trainee-assessment-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: AssessmentListComponent
  },
  {
    path: 'trainee-assessments',
    component: TraineeAssessmentListComponent
  },
  {
    path: 'new',
    component: AssessmentFormComponent
  },
  {
    path: 'edit/:id',
    component: AssessmentFormComponent
  },
  {
    path: 'detail/:id',
    component: AssessmentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentRoutingModule { }
