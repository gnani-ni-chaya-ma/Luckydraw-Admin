import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { SocketService } from 'app/main/_service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class DashboardComponent implements OnInit, OnDestroy {

  statistics: any[];
  draws: any[];
  dashboardSubscription: Subscription;

  constructor(
    public socketService: SocketService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.dashboardSubscription = this.socketService.listen().subscribe(data => {
      this.statistics = data.data;
      // (this.statistics[this.statistics.indexOf('<100')] as Object)['feeling'] = '😁';
      // this.statistics[this.statistics.indexOf('<25')] = '😌';
      // this.statistics[this.statistics.indexOf('<50')] = '😐';
      // this.statistics[this.statistics.indexOf('=0')] = '😔';
      this.draws = data.draws;
      console.log('Getting Data ...');
      console.log('statistics :: ', this.draws);
    });
  }

  ngOnDestroy() {
    this.dashboardSubscription.unsubscribe();
  }

  getFormattedDate(date: number) {
    return this.datePipe.transform(date, 'dd-MMM-yyyy hh:mm aa')
  }

}
