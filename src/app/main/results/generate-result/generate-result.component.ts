import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { NotificationService } from 'app/main/_service';

@Component({
  selector: 'app-generate-result',
  templateUrl: './generate-result.component.html',
  styleUrls: ['./generate-result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenerateResultComponent implements OnInit {

  dialogTitle = 'Generate Result';
  generateResultForm: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<GenerateResultComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private _fuseProgressBarService: FuseProgressBarService,
    private _notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.generateResultForm = this._formBuilder.group({
      date: ['', Validators.required],
      noOfDraws: ['', Validators.required],
      draws: new FormArray([this.drawForm()]),
      ratio: [0.5, Validators.required],
    });
  }

  drawForm(index?): FormGroup {
    return this._formBuilder.group({
      prize: [`${index || ''}`, Validators.required],
      count: ['', Validators.required]
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

  generateResult() {
    console.log('Generate Results', this.generateResultForm.value);
  }

}
