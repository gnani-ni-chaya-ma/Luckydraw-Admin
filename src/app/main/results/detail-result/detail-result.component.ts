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
    let popupWin: Window;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(this.getContent());
    popupWin.document.close();
  }

  getContent(): string {
    const resultDate = `${this._datePipe.transform(this.dialogTitle, 'dd-MM-yyyy hh:mm aa')}`;
    const printContents = document.getElementById('print-section').innerHTML;
    return `<html>
        <head>
          <title>Winners_${this._datePipe.transform(this.dialogTitle, 'dd-MM-yyyy-hhmm-aa')}</title>
          <style>
            * {
                font-family: "Trebuchet MS",
                    Arial,
                    Helvetica,
                    sans-serif;
            }

            #heading {
                border: 2px solid grey;
                text-align: center;
            }

            #winners {
                border-collapse: collapse;
                width: 100%;
            }

            #winners td,
            #winners th {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
                line-height: 30px;
                font-size: 24px;
                border: 2px solid grey;
            }

            #winners th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: center;
                font-size: 26px;
                border: 2px solid grey;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
        <div id="heading">
            <h1>${resultDate}</h1>
            <h2>Luckydraw Winners</h2>
        </div>
        <br>
        ${printContents}
        </body>
      </html>`;
  }
}
