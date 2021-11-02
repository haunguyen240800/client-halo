import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobTypeRoutingModule } from './job-type-routing.module';
import { JobTypeComponent } from './job-type.component';


@NgModule({
  declarations: [
    JobTypeComponent
  ],
  imports: [
    CommonModule,
    JobTypeRoutingModule
  ]
})
export class JobTypeModule { }
