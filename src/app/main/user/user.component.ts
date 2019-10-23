import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from '../_service/user.service';
import { NotificationService } from '../_service';
import { DetailComponent } from './detail/detail.component';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserComponent implements OnInit {

  displayedColumns = ['position', 'username', 'contactNumber', 'questionState', 'points', 'coupons'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dialogRef: any;

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  setCustomSort() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'coupons':
          return (item.earnedTickets && item.ticketMapping) ? item.earnedTickets.length + item.ticketMapping.length : 0;
        default:
          return item[property];
      }
    }
  }

  setTableData(users: User[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setCustomSort();
  }

  async getUsers() {
    try {
      const result = await this._userService.getUserList().toPromise();
      console.log('Users', result.users);
      this.setTableData(result.users);
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

  showDetails(user: User) {
    this.dialogRef = this._matDialog.open(DetailComponent, {
      panelClass: 'user-details-dialog',
      data: user,
    });
  }
}
