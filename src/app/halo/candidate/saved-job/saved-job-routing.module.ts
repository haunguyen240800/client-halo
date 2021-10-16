import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedJobComponent } from './saved-job.component';

const routes: Routes = [
  {
    path: '',
    component: SavedJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedJobRoutingModule { }
