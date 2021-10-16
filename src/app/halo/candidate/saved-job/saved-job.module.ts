import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedJobRoutingModule } from './saved-job-routing.module';
import { SavedJobComponent } from './saved-job.component';


@NgModule({
  declarations: [
    SavedJobComponent
  ],
  imports: [
    CommonModule,
    SavedJobRoutingModule
  ]
})
export class SavedJobModule { }
