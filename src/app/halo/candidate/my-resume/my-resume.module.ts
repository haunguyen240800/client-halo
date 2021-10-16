import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyResumeRoutingModule } from './my-resume-routing.module';
import { MyResumeComponent } from './my-resume.component';


@NgModule({
  declarations: [
    MyResumeComponent
  ],
  imports: [
    CommonModule,
    MyResumeRoutingModule
  ]
})
export class MyResumeModule { }
