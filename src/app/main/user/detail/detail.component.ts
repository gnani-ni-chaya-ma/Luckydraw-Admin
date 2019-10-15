import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../user.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent {

  dialogTitle: string;
  user: User;
  assignCoupons: any[];

  
  /**
   * constructor
   * 
   * @param matDialogRef 
   * @param _data 
   */
  constructor(
    public matDialogRef: MatDialogRef<DetailComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
    this.user = _data;
    this.dialogTitle = `${this.user.username}`;
    this.assignCoupons = this.groupBy(this.user.ticketMapping, (coupon: { assignDate: { $date: any; }; }) => coupon.assignDate.$date);
    console.log('assignCoupons', this.assignCoupons);
  }

  
  /**
   * Filter array Group by
   * 
   * @param list 
   * @param keyGetter 
   * @returns Aarray
   */
  groupBy(list: any[], keyGetter: { (coupon: any): any; (arg0: any): void; }) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return Array.from(map).sort(this.sortByDate);
  }


  /**
   * Sort mutidimention Array by 0 th index
   * 
   * @param a 
   * @param b 
   * Sorted array
   */
  sortByDate(a: number[], b: number[]) {
    if (a[0] === b[0]) {
      return 0;
    }
    else {
      return (a[0] < b[0]) ? -1 : 1;
    }
  }


  /**
   * Format array
   * 
   * @param coupon 
   * @returns
   */
  getCoupon(coupon: any[]) {
    return coupon.map(t => t.ticketNo)
  }

}
