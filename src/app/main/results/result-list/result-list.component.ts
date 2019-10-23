import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationService } from 'app/main/_service';
import { ResultsService } from 'app/main/_service/results.service';
import { Result } from '../result.model';
import { GenerateResultComponent } from '../generate-result/generate-result.component';
import { DetailResultComponent } from '../detail-result/detail-result.component';
// import { DetailResultComponent } from '../detail-result/detail-result.component';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ResultListComponent implements OnInit {

  displayedColumns = ['position', 'date', 'winners'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dialogRef: MatDialogRef<any>;

  constructor(
    private _resultService: ResultsService,
    private _notificationService: NotificationService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getResults();
  }

  setCustomSort() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'coupons':
          return (item.earnedTickets.length || 0) + (item.ticketMapping.length || 0);
        default:
          return item[property];
      }
    }
  }

  setTableData(results: Result[]) {
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setCustomSort();
  }

  async getResults() {
    try {
      const result = await this._resultService.getWinnerList().toPromise();
      console.log('Results', result.winners);
      this.setTableData(result.winners);
    } catch (error) {
      this._notificationService.show(`${error}`, 'error');
    }
  }

  searchUser(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(result: Result) {
    const dialogRef = this._matDialog.open(DetailResultComponent, {
      panelClass: 'detail-result-dialog',
      data: result,
    });
  }

  openGenerateResultDialog() {
    this.dialogRef = this._matDialog.open(GenerateResultComponent, {
      panelClass: 'result-generate-dialog',
      disableClose: true,
      width: '400px'
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('Result :: ', result);
      if (result) {
        this.getResults();
      }
    });
  }
}
