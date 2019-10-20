import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Result } from '../result.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-result',
  templateUrl: './detail-result.component.html',
  styleUrls: ['./detail-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailResultComponent implements OnInit {

  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<DetailResultComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Result,
    private _datePipe: DatePipe
  ) {
    console.log('Data', _data);
    this.dialogTitle = _data.date.$date;
  }

  ngOnInit() {
  }

  printResult() {
    let printContents, popupWin: Window;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          #winners {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          
          #winners td, #winners th {
            border: 1px solid #ddd;
            padding: 8px;
          }
          
          #winners tr:nth-child(even){background-color: #f2f2f2;}
          
          #winners th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
          }

          </style>
        </head>
        <body onload="window.print();window.close()">
        <div>
          <p align="center" style="margin-top: 1em"> <font size="6" face="sans-serif"> ${this._datePipe.transform(this.dialogTitle, 'dd-MM-yyyy hh:mm aa')} Winners </font> </p>
        </div>
        ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
  }
}
