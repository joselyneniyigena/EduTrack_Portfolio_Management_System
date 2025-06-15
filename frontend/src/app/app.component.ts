import { Component, OnInit, OnDestroy, HostListener, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, AsyncPipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './core/service/auth.service';
import { LoadingService } from './core/service/loading.service';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    SharedModule
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  title = 'education-management-system';
  isMobile = false;
  headerHeight = 80; // Match your header height
  sidenavOpened = true; // Default state

  private destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    public loadingService: LoadingService,
    private breakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    console.log('Edu Track System initialized');

    // Set initial sidebar state based on whether it's a browser
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      this.sidenavOpened = !this.isMobile;
    } else {
      // For SSR, default to desktop view
      this.isMobile = false;
      this.sidenavOpened = true;
    }

    // Monitor screen size changes only in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.Tablet])
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          const wasMobile = this.isMobile;
          this.isMobile = result.matches;

          // Adjust header height and sidebar behavior based on screen size
          this.updateLayoutForScreenSize();

          // Auto-close sidebar on mobile, open on desktop
          if (this.sidenav) {
            if (this.isMobile && !wasMobile) {
              // Switched to mobile - close sidebar
              this.sidenavOpened = false;
              this.sidenav.close();
            } else if (!this.isMobile && wasMobile) {
              // Switched to desktop - open sidebar
              this.sidenavOpened = true;
              this.sidenav.open();
            }
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.updateLayoutForScreenSize();
    }
  }

  /**
   * Toggle sidebar visibility
   */
  toggleSidenav(): void {
    if (this.sidenav) {
      if (this.sidenav.opened) {
        this.closeSidenav();
      } else {
        this.openSidenav();
      }
    } else {
      console.warn('Sidenav is not available. User might not be authenticated.');
    }
  }

  /**
   * Handle menu toggle from header
   */
  onMenuToggle(): void {
    this.toggleSidenav();
  }

  /**
   * Close sidebar (useful for mobile overlay)
   */
  closeSidenav(): void {
    if (this.sidenav && this.sidenav.opened) {
      this.sidenav.close();
      this.sidenavOpened = false;
    }
  }

  /**
   * Open sidebar
   */
  openSidenav(): void {
    if (this.sidenav && !this.sidenav.opened) {
      this.sidenav.open();
      this.sidenavOpened = true;
    }
  }

  /**
   * Check if sidebar should be opened by default
   */
  get shouldSidenavBeOpened(): boolean {
    return !this.isMobile && this.sidenavOpened;
  }

  /**
   * Get sidebar mode based on screen size
   */
  get sidenavMode(): 'side' | 'over' | 'push' {
    return this.isMobile ? 'over' : 'side';
  }

  /**
   * Determine if backdrop should be shown
   */
  get hasBackdrop(): boolean {
    return this.isMobile;
  }

  /**
   * Update layout properties based on current screen size
   */
  private updateLayoutForScreenSize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;

      if (width <= 768) {
        this.headerHeight = 64;
        this.isMobile = true;
      } else if (width <= 1024) {
        this.headerHeight = 70;
        this.isMobile = false;
      } else {
        this.headerHeight = 80;
        this.isMobile = false;
      }
    } else {
      // Default values for SSR
      this.headerHeight = 80;
      this.isMobile = false;
    }
  }

  /**
   * Handle backdrop click (close sidebar on mobile)
   */
  onBackdropClick(): void {
    if (this.isMobile) {
      this.closeSidenav();
    }
  }

  /**
   * Handle sidebar opened event
   */
  onSidenavOpened(): void {
    this.sidenavOpened = true;
    console.log('Sidebar opened, classes:', this.mainContainerClasses);
  }

  /**
   * Handle sidebar closed event
   */
  onSidenavClosed(): void {
    this.sidenavOpened = false;
    console.log('Sidebar closed, classes:', this.mainContainerClasses);
  }

  /**
   * Get CSS classes for main container
   */
  get mainContainerClasses(): string {
    const classes = ['main-container'];
    
    // Add mobile/desktop class
    classes.push(this.isMobile ? 'mobile' : 'desktop');
    
    // Add sidebar state class - use actual sidenav state if available
    const isActuallyOpen = this.sidenav ? this.sidenav.opened : this.sidenavOpened;
    classes.push(isActuallyOpen ? 'sidenav-open' : 'sidenav-closed');
    
    return classes.join(' ');
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {
    // This will be used in template with async pipe
    return true; // Placeholder - actual logic handled by authService.isAuthenticated$ | async
  }

  /**
   * Check if loading
   */
  get isLoading(): boolean {
    // This will be used in template with async pipe
    return false; // Placeholder - actual logic handled by loadingService.loading$ | async
  }
}