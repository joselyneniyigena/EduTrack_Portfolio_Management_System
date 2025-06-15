import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() menuToggle = new EventEmitter<void>();
  
  currentUser$ = this.authService.currentUser$;
  searchControl = new FormControl('');
  showSearch = true; // Can be controlled based on route or user preference
  
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Setup search functionality
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        if (searchTerm) {
          this.performSearch(searchTerm);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onMenuToggle(): void {
    this.menuToggle.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  getUserPrimaryRole(user: User | null): string {
    if (!user) return 'Guest';
    
    if (user.userRoles && user.userRoles.length > 0) {
      return user.userRoles[0].role.name;
    }
    return 'User';
  }

  getInitials(user: User | null): string {
    if (!user) return 'U';
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  private performSearch(searchTerm: string): void {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
    // You could emit an event or call a search service
    // this.searchService.search(searchTerm);
  }

  // Navigation methods for menu items
  goToNotifications(): void {
    this.router.navigate(['/notifications']);
  }

  goToMessages(): void {
    this.router.navigate(['/messages']);
  }

  goToHelp(): void {
    this.router.navigate(['/help']);
  }

  goToThemeSettings(): void {
    this.router.navigate(['/settings/theme']);
  }

  goToPrivacySettings(): void {
    this.router.navigate(['/settings/privacy']);
  }

  sendFeedback(): void {
    // Open feedback modal or navigate to feedback page
    console.log('Opening feedback form');
  }

  markAllNotificationsAsRead(): void {
    // Implement mark all as read functionality
    console.log('Marking all notifications as read');
  }

  // Method to check if user has unread notifications
  hasUnreadNotifications(): boolean {
    // Implement logic to check for unread notifications
    return true; // Placeholder
  }

  // Method to get notification count
  getNotificationCount(): number {
    // Implement logic to get actual notification count
    return 3; // Placeholder
  }

  // Method to get message count
  getMessageCount(): number {
    // Implement logic to get actual message count
    return 2; // Placeholder
  }

  // Method to handle theme toggle
  toggleTheme(): void {
    // Implement theme toggle functionality
    console.log('Toggling theme');
  }

  // Method to handle language change
  changeLanguage(language: string): void {
    // Implement language change functionality
    console.log('Changing language to:', language);
    // You could use Angular i18n or a translation service
    // this.translateService.use(language);
  }

  // Method to check if current route should show search
  shouldShowSearch(): boolean {
    const currentRoute = this.router.url;
    const searchEnabledRoutes = ['/dashboard', '/courses', '/trainees', '/assessments'];
    return searchEnabledRoutes.some(route => currentRoute.startsWith(route));
  }

  // Method to get user's full name
  getUserFullName(user: User | null): string {
    if (!user) return 'Guest User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
  }

  // Method to check if user is online (if you have real-time status)
  isUserOnline(user: User | null): boolean {
    // Implement online status check
    return true; // Placeholder - could check last activity, websocket connection, etc.
  }

  // Method to get user's status message
  getUserStatus(user: User | null): string {
    if (!user) return 'Offline';
    
    // You could implement different statuses based on user activity
    const role = this.getUserPrimaryRole(user);
    return role;
  }

  // Method to handle notification click
  onNotificationClick(notificationId: string): void {
    console.log('Notification clicked:', notificationId);
    // Navigate to relevant page or mark as read
    // this.notificationService.markAsRead(notificationId);
  }

  // Method to get recent notifications (placeholder data)
  getRecentNotifications(): any[] {
    return [
      {
        id: '1',
        title: 'New course assignment',
        message: 'Advanced Mathematics course has been assigned to Class 10A',
        time: '2 minutes ago',
        unread: true,
        type: 'assignment'
      },
      {
        id: '2',
        title: 'Assessment completed',
        message: 'John Doe completed the Physics assessment',
        time: '1 hour ago',
        unread: false,
        type: 'assessment'
      },
      {
        id: '3',
        title: 'System maintenance',
        message: 'Scheduled maintenance will occur tonight at 2 AM',
        time: '3 hours ago',
        unread: false,
        type: 'system'
      }
    ];
  }

  // Method to format notification time
  formatNotificationTime(timestamp: string | Date): string {
    // Implement time formatting logic
    // You could use a library like moment.js or date-fns
    return timestamp.toString(); // Placeholder
  }

  // Method to get notification icon based on type
  getNotificationIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'assignment': 'assignment',
      'assessment': 'quiz',
      'system': 'info',
      'message': 'mail',
      'reminder': 'alarm',
      'grade': 'grade'
    };
    return iconMap[type] || 'notifications';
  }

  // Method to check if user has specific permission
  hasPermission(permission: string): boolean {
    // Implement permission checking logic
    // This would typically check against user roles/permissions
    return true; // Placeholder
  }

  // Method to get user's preferred language
  getUserLanguage(): string {
    // Get from user settings or browser preference
    return 'en'; // Placeholder
  }

  // Method to get available languages
  getAvailableLanguages(): { code: string; name: string }[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'de', name: 'Deutsch' }
    ];
  }
}