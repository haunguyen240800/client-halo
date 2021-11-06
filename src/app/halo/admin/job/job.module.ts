import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';


@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    ShareModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    DropdownModule,
    ToastModule
  ]
})
export class JobModule { }
