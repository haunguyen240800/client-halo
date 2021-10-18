import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedJobRoutingModule } from './saved-job-routing.module';
import { SavedJobComponent } from './saved-job.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SavedJobComponent
  ],
  imports: [
    CommonModule,
    SavedJobRoutingModule,
    ShareModule,
    FormsModule
  ]
})
export class SavedJobModule { }
