import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { GenerateResultComponent } from './generate-result/generate-result.component';
import { ResultListComponent } from './result-list/result-list.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { DetailResultComponent } from './detail-result/detail-result.component';

@NgModule({
  declarations: [GenerateResultComponent, ResultListComponent, DetailResultComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,

    FuseSharedModule,
    FuseConfirmDialogModule,
  ],
  entryComponents: [
    GenerateResultComponent,
    DetailResultComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ResultsModule { }
