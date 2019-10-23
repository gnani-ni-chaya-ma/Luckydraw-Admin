import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultListComponent } from './result-list/result-list.component';

const routes: Routes = [
  {
    path: '',
    component: ResultListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
