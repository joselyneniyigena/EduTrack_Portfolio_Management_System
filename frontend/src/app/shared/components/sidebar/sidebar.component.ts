import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  roles?: string[];
  id?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private expandedItems = new Set<string>();

  menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: 'people',
      roles: ['ADMIN', 'SUPER_ADMIN'],
      children: [
        { 
          id: 'users',
          label: 'Users', 
          icon: 'person', 
          route: '/users' 
        },
        { 
          id: 'roles',
          label: 'Roles', 
          icon: 'security', 
          route: '/roles' 
        }
      ]
    },
    {
      id: 'academic',
      label: 'Academic',
      icon: 'school',
      children: [
        { 
          id: 'academic-years',
          label: 'Academic Years', 
          icon: 'calendar_today', 
          route: '/academic-years', 
          roles: ['ADMIN', 'SUPER_ADMIN'] 
        },
        { 
          id: 'courses',
          label: 'Courses', 
          icon: 'book', 
          route: '/courses' 
        },
        { 
          id: 'learning-units',
          label: 'Learning Units', 
          icon: 'library_books', 
          route: '/learning-units' 
        }
      ]
    },

    {
      id: 'trade-management',
      label: 'Trade Management',
      icon: 'business_center',
      route: '/trade-management'
    },
    {
      id: 'training',
      label: 'Training',
      icon: 'cast_for_education',
      children: [
        { 
          id: 'trainers',
          label: 'Trainers', 
          icon: 'person_outline', 
          route: '/training/trainers' 
        },
        { 
          id: 'trainees',
          label: 'Trainees', 
          icon: 'school', 
          route: '/training/trainees' 
        },
        { 
          id: 'promotions',
          label: 'Promotions', 
          icon: 'trending_up', 
          route: '/training/promotions' 
        }
      ]
    },
    {
      id: 'assessments',
      label: 'Assessments',
      icon: 'assignment',
      children: [
        { 
          id: 'all-assessments',
          label: 'All Assessments', 
          icon: 'assignment', 
          route: '/assessments' 
        },
        { 
          id: 'trainee-assessments',
          label: 'Trainee Assessments', 
          icon: 'assignment_turned_in', 
          route: '/assessments/trainee-assessments' 
        }
      ]
    },
    {
      id: 'evidence',
      label: 'Evidence',
      icon: 'folder_open',
      route: '/evidence'
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: 'settings',
      roles: ['ADMIN', 'SUPER_ADMIN'],
      children: [
        { 
          id: 'trades',
          label: 'Trades', 
          icon: 'work', 
          route: '/trades' 
        },
        { 
          id: 'sectors',
          label: 'Sectors', 
          icon: 'business', 
          route: '/sectors' 
        },
        { 
          id: 'stg-loyalty',
          label: 'STG Loyalty', 
          icon: 'loyalty', 
          route: '/stg-loyalty' 
        }
      ]
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Auto-expand parent items based on current route
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.updateExpandedItemsBasedOnRoute(event.url);
      });

    // Initial expansion based on current route
    this.updateExpandedItemsBasedOnRoute(this.router.url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  hasAccess(item: MenuItem): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }
    return this.authService.hasAnyRole(item.roles);
  }

  isExpanded(item: MenuItem): boolean {
    return item.id ? this.expandedItems.has(item.id) : false;
  }

  toggleExpansion(item: MenuItem, isExpanded: boolean): void {
    if (!item.id) return;

    if (isExpanded) {
      this.expandedItems.add(item.id);
    } else {
      this.expandedItems.delete(item.id);
    }
  }

  trackByFn(index: number, item: MenuItem): string {
    return item.id || item.label;
  }

  private updateExpandedItemsBasedOnRoute(currentUrl: string): void {
    this.menuItems.forEach(item => {
      if (item.children && item.id) {
        const hasActiveChild = item.children.some(child => 
          child.route && currentUrl.startsWith(child.route)
        );
        
        if (hasActiveChild) {
          this.expandedItems.add(item.id);
        }
      }
    });
  }

  // Method to determine if divider should be shown
  shouldShowDivider(index: number): boolean {
    // Show divider after Dashboard (index 0), and after User Management section
    const dividerAfterIndices = [0, 1]; // Dashboard, User Management
    return dividerAfterIndices.includes(index);
  }
}