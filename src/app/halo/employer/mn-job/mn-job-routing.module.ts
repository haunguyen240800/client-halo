import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MnJobComponent } from './mn-job.component';

const routes: Routes = [
  {
    path: '',
    component: MnJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MnJobRoutingModule { }
