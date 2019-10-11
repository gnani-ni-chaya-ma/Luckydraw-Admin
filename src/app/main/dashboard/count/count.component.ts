import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss'],
})
export class CountComponent implements OnInit {

  @Input('count')
  count: number;

  @Input('title')
  title: string;
  
  @Input('footer')
  footer: string;

  constructor() { }

  ngOnInit() {
  }

}
