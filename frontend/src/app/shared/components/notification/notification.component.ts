import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div class="notification-container">
      <mat-icon>notifications</mat-icon>
      <span>Notifications will appear here</span>
    </div>
  `,
  styles: [`
    .notification-container {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      color: #666;
    }
  `]
})
export class NotificationComponent { }
