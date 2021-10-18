import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MnCandidateRoutingModule } from './mn-candidate-routing.module';
import { MnCandidateComponent } from './mn-candidate.component';


@NgModule({
  declarations: [
    MnCandidateComponent
  ],
  imports: [
    CommonModule,
    MnCandidateRoutingModule
  ]
})
export class MnCandidateModule { }
