import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    DropdownModule,
    FormsModule
  ]
})
export class ListModule { }
