import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Assessment Routing
import { AssessmentRoutingModule } from './assessment-routing.module';

// Assessment Components
import { AssessmentListComponent } from './assessment-list/assessment-list.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentDetailComponent } from './assessment-detail/assessment-detail.component';
import { TraineeAssessmentListComponent } from './trainee-assessment-list/trainee-assessment-list.component';

// Assessment Services
import { AssessmentService } from './services/assessment.service';
import { TraineeAssessmentService } from './services/trainee-assessment.service';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AssessmentListComponent,
    AssessmentFormComponent,
    AssessmentDetailComponent,
    TraineeAssessmentListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssessmentRoutingModule,
    SharedModule,
    
    // Angular Material Modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    MatStepperModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [
    AssessmentService,
    TraineeAssessmentService
  ]
})
export class AssessmentModule { }
