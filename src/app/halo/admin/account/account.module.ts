import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    DropdownModule,
    ShareModule,
    FormsModule,
    ToastModule
  ]
})
export class AccountModule { }
