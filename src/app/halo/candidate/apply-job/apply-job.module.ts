import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyJobRoutingModule } from './apply-job-routing.module';
import { ApplyJobComponent } from './apply-job.component';


@NgModule({
  declarations: [
    ApplyJobComponent
  ],
  imports: [
    CommonModule,
    ApplyJobRoutingModule
  ]
})
export class ApplyJobModule { }
