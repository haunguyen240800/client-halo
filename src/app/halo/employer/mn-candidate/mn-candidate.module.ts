import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';

import { MnCandidateRoutingModule } from './mn-candidate-routing.module';
import { MnCandidateComponent } from './mn-candidate.component';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    MnCandidateComponent
  ],
  imports: [
    CommonModule,
    MnCandidateRoutingModule,
    ShareModule,
    DialogModule,
    ShareModule
  ]
})
export class MnCandidateModule { }
