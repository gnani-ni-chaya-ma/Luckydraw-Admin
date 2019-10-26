import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule } from '@angular/material';
import { CountComponent } from './count/count.component';
import { DrawsCountComponent } from './draws-count/draws-count.component';

@NgModule({
  declarations: [DashboardComponent, CountComponent, DrawsCountComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,

    ChartsModule,
    NgxChartsModule,

    FuseSharedModule,
    FuseWidgetModule
  ],
  providers: [
    DatePipe
  ]
})
export class DashboardModule { }
