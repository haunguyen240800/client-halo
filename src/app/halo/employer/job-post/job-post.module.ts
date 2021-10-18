import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPostRoutingModule } from './job-post-routing.module';
import { JobPostComponent } from './job-post.component';


@NgModule({
  declarations: [
    JobPostComponent
  ],
  imports: [
    CommonModule,
    JobPostRoutingModule
  ]
})
export class JobPostModule { }
