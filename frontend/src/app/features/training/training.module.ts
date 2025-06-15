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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Training Routing
import { TrainingRoutingModule } from './training-routing.module';

// Training Components
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TraineeListComponent } from './trainee-list/trainee-list.component';
import { TrainingPromotionListComponent } from './training-promotion-list/training-promotion-list.component';
import { TrainingAssessmentListComponent } from './training-assessment-list/training-assessment-list.component';

// Training Services
import { TrainerService } from './services/trainer.service';
import { TraineeService } from './services/trainee.service';
import { TrainingPromotionService } from './services/training-promotion.service';
import { TrainingAssessmentService } from './services/training-assessment.service';

// Shared Module
import { SharedModule } from '../../shared/shared.module';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';

@NgModule({
  declarations: [
    TrainerListComponent,
    TraineeListComponent,
    TrainingPromotionListComponent,
    TrainingAssessmentListComponent,
    TrainerFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TrainingRoutingModule,
    SharedModule,
    
  ],
  providers: [
    TrainerService,
    TraineeService,
    TrainingPromotionService,
    TrainingAssessmentService
  ]
})
export class TrainingModule { }
