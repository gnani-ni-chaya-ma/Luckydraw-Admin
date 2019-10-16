import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { GenerateResultComponent } from './generate-result/generate-result.component';
import { ResultListComponent } from './result-list/result-list.component';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule, MatTableModule, MatToolbarModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';

@NgModule({
  declarations: [GenerateResultComponent, ResultListComponent],
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

    FuseSharedModule,
    FuseConfirmDialogModule,
  ],
  entryComponents: [
    GenerateResultComponent
  ]
})
export class ResultsModule { }
