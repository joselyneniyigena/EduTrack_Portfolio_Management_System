import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeManagementComponent } from './trade-management.component';

const routes: Routes = [
  {
    path: '',
    component: TradeManagementComponent
  },
  {
    path: 'sectors',
    component: TradeManagementComponent,
    data: { activeTab: 0 }
  },
  {
    path: 'trades',
    component: TradeManagementComponent,
    data: { activeTab: 1 }
  },
  {
    path: 'rtqf-levels',
    component: TradeManagementComponent,
    data: { activeTab: 2 }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeManagementRoutingModule { }