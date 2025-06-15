import { Component, Input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  icon?: string;
}

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li *ngFor="let item of items; let last = last" class="breadcrumb-item">
          <a *ngIf="item.url && !last" [routerLink]="item.url" class="breadcrumb-link">
            <mat-icon *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</mat-icon>
            {{ item.label }}
          </a>
          <span *ngIf="!item.url || last" class="breadcrumb-current">
            <mat-icon *ngIf="item.icon" class="breadcrumb-icon">{{ item.icon }}</mat-icon>
            {{ item.label }}
          </span>
          <mat-icon *ngIf="!last" class="breadcrumb-separator">chevron_right</mat-icon>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      margin-bottom: 24px;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
    }

    .breadcrumb-link {
      color: #0078d4;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 120, 212, 0.1);
        text-decoration: underline;
      }
    }

    .breadcrumb-current {
      color: #666;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      font-weight: 500;
    }

    .breadcrumb-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .breadcrumb-separator {
      color: #999;
      font-size: 16px;
      width: 16px;
      height: 16px;
      margin: 0 4px;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}