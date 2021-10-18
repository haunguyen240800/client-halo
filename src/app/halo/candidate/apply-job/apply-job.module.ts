import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyJobRoutingModule } from './apply-job-routing.module';
import { ApplyJobComponent } from './apply-job.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    ApplyJobComponent
  ],
  imports: [
    CommonModule,
    ApplyJobRoutingModule,
    ShareModule
  ]
})
export class ApplyJobModule { }
