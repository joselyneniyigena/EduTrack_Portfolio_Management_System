import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TraineeListComponent } from './trainee-list/trainee-list.component';
import { TrainingPromotionListComponent } from './training-promotion-list/training-promotion-list.component';
import { TrainingAssessmentListComponent } from './training-assessment-list/training-assessment-list.component';
import path from 'path';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'trainers',
    pathMatch: 'full'
  },
  {
    path: 'trainers',
    component: TrainerListComponent
  },
   {
    path: 'trainers/new',  
    component: TrainerFormComponent
  },
  {
    path: 'trainees',
    component: TraineeListComponent
  },
  {
    path: 'promotions',
    component: TrainingPromotionListComponent
  },
  {
    path: 'assessments',
    component: TrainingAssessmentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }