// src/app/core/core.module.ts

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Guards - These are properly provided in this module
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AdminGuard } from './guards/admin.guard';

// Interceptors - These are properly registered in this module
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

// Services - These are properly provided in this module
import { ApiService } from './service/api.service';
import { AuthService } from './service/auth.service';
import { LoadingService } from './service/loading.service';
import { NotificationService } from './service/notification.service';
import { StorageService } from './service/storage.service';

@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    HttpClientModule
  ],

  providers: [
    // Services: These provide application-wide functionality.
    AuthService,
    ApiService,
    NotificationService,
    LoadingService,
    StorageService,

    // Guards: These protect routes based on authentication and authorization logic.
    AuthGuard,
    RoleGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in AppModule only.');
    }
  }
}
