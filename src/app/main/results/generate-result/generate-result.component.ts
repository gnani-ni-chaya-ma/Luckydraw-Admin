import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { NotificationService } from 'app/main/_service';
import { ResultsService } from 'app/main/_service/results.service';

@Component({
  selector: 'app-generate-result',
  templateUrl: './generate-result.component.html',
  styleUrls: ['./generate-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GenerateResultComponent implements OnInit {

  dialogTitle = 'Generate Result';
  generateResultForm: FormGroup;
  minDate = new Date(2019, 10, 7);
  maxDate = new Date(2019, 10, 12);
  slots = [
    { viewValue: '06:30 PM', value: [18, 30, 0] },
    { viewValue: '08:00 PM', value: [20, 0, 0] },
    { viewValue: '09:30 PM', value: [21, 30, 0] },
  ];

  constructor(
    public matDialogRef: MatDialogRef<GenerateResultComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _fuseProgressBarService: FuseProgressBarService,
    private _notificationService: NotificationService,
    private _resultService: ResultsService,
  ) { }

  ngOnInit() {
    this.generateResultForm = this._formBuilder.group({
      date: [null, Validators.required],
      slot: [null, Validators.required],
      noOfDraws: [null, [Validators.required, Validators.pattern(/^\d{1,2}$/)]],
      draws: new FormArray([]),
      ratio: [0.5, [Validators.required, Validators.pattern(/^(0(\.\d+)?|1(\.0+)?)$/)]],
    });
  }

  drawForm(index?): FormGroup {
    return this._formBuilder.group({
      prize: [index, Validators.required],
      count: [null, [Validators.required, Validators.pattern(/^\d{1,2}$/)]]
    });
  }

  get f() { return this.generateResultForm.controls; }
  get d() { return this.f.draws as FormArray; }

  onTypeNoOfDraws(value: number) {
    while (this.d.length !== 0) {
      this.d.removeAt(0);
    }
    for (let index = 0; index < value; index++) {
      this.d.push(this.drawForm(index + 1));
    }
  }

  async generateResult() {
    try {
      this._fuseProgressBarService.show();
      const formData = this.generateResultForm.value;
      const date = Object.values(formData.date._i).reverse();
      date[1] = Number(date[1]) + 1;
      formData.date = [...date, ...formData.slot];
      delete formData.noOfDraws;
      delete formData.slot;
      console.log('Generate Results', formData);
      await this._resultService.generateResult(formData).toPromise();
      this._fuseProgressBarService.hide();
      this.matDialogRef.close(true);
    } catch (error) {
      this._fuseProgressBarService.hide();
      console.error('Error', error);
      this._notificationService.show(`${error}`, 'error');
    }
  }

}
