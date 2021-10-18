import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MnCandidateComponent } from './mn-candidate.component';

const routes: Routes = [
  {
    path: '',
    component: MnCandidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MnCandidateRoutingModule { }
