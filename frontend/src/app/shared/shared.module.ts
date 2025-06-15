import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material Modules - COMPLETE LIST
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';  // ✅ REQUIRED for mat-drawer
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRippleModule } from '@angular/material/core';

// Shared Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NotificationComponent } from './components/notification/notification.component';

// Shared Directives
import { HasRoleDirective } from './directives/has-role.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Shared Pipes
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { AuthGuardRedirectComponent } from './components/auth-guard-redirect/auth-guard-redirect.component';
import { ToastrModule } from 'ngx-toastr';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatSidenavModule,           
  MatListModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,   
  MatChipsModule,
  MatBadgeModule,
  MatTooltipModule,
  MatTabsModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatRippleModule,
  MatProgressSpinnerModule
];

const SHARED_COMPONENTS = [
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  LoadingSpinnerComponent,
  ConfirmationDialogComponent,
  DataTableComponent,
  BreadcrumbComponent,
  NotificationComponent,
  AuthGuardRedirectComponent,        

];

const SHARED_DIRECTIVES = [
  HasRoleDirective,
  ClickOutsideDirective
];

const SHARED_PIPES = [
  SafeHtmlPipe,
  TruncatePipe,
  DateFormatPipe
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,  
    ToastrModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,          
    ...MATERIAL_MODULES,   
    ...SHARED_COMPONENTS,  
    ...SHARED_DIRECTIVES,
    ...SHARED_PIPES
  ]
})
export class SharedModule { }