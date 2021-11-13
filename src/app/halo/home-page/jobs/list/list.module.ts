import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/share/share.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    DropdownModule,
    ToastModule
  ]
})
export class ListModule { }
