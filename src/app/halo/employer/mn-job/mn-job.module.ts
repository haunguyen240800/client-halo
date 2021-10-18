import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnJobRoutingModule } from './mn-job-routing.module';
import { MnJobComponent } from './mn-job.component';


@NgModule({
  declarations: [
    MnJobComponent
  ],
  imports: [
    CommonModule,
    MnJobRoutingModule
  ]
})
export class MnJobModule { }
