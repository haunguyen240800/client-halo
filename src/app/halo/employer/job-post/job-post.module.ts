import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {StepsModule} from 'primeng/steps';
import {ToastModule} from 'primeng/toast';

import { JobPostRoutingModule } from './job-post-routing.module';
import { JobPostComponent } from './job-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  declarations: [
    JobPostComponent,
    NewComponent,
    PaymentComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    JobPostRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    EditorModule,
    StepsModule,
    FormsModule,
    NgxPayPalModule,
    ToastModule
  ]
})
export class JobPostModule { }
