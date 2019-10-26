import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'draws-count',
  templateUrl: './draws-count.component.html',
  styleUrls: ['./draws-count.component.scss']
})
export class DrawsCountComponent implements OnInit {

  @Input('appCount')
  appCount: number;
  
  @Input('onGround')
  onGround: number;

  @Input('title')
  title: string;
  
  @Input('footer')
  footer: string;
  
  constructor() { }

  ngOnInit() {
  }

}
