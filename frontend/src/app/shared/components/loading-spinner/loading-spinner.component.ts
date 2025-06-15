import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-container">
      <mat-spinner diameter="50"></mat-spinner>
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      
      p {
        margin-top: 16px;
        color: #666;
        font-size: 14px;
      }
    }
  `]
})
export class LoadingSpinnerComponent { }