import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnJobRoutingModule } from './mn-job-routing.module';
import { MnJobComponent } from './mn-job.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    MnJobComponent
  ],
  imports: [
    CommonModule,
    MnJobRoutingModule,
    ShareModule
  ]
})
export class MnJobModule { }
