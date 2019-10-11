import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../_service/user.service';
import { NotificationService } from '../_service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserComponent implements OnInit {

  displayedColumns = ['position', 'username', 'contactNumber', 'questionState', 'points', 'buttons'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  setTableData(users: User[]) {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getUsers() {
    try {
      const result = await this.userService.getUserList().toPromise();
      console.log('Users', result.users);
      this.setTableData(result.users);
    } catch (error) {
      this.notificationService.show(`${error}`, 'error');
    }
  }

  searchUser(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface User {
  username: string;
  ak_ques_st: number;
  contactNumber: string;
  earnedTickets: number[];
  points: number;
  questionState: number;
  ticketMapping: any[];
}
