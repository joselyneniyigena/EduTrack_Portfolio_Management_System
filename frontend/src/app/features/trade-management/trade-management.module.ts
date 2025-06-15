import { NgModule } from '@angular/core';

// Angular Material Modules
import { TradeManagementComponent } from './trade-management.component';
import { TradeManagementService } from './service/trade-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TradeManagementRoutingModule } from './trade-management-routing.module';


@NgModule({
    declarations: [
        TradeManagementComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TradeManagementRoutingModule
    ],
    providers: [
        TradeManagementService
    ],
    exports: [
        TradeManagementComponent
    ]
})
export class TradeManagementModule { }