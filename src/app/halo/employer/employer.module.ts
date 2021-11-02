import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { AlertComponent } from './alert/alert.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfitmationComponent } from './confitmation/confitmation.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCanComponent } from './view-can/view-can.component';
import { UpdatJobComponent } from './updat-job/updat-job.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { UpdateJobComponent } from './update-job/update-job.component';


@NgModule({
  declarations: [
    EmployerComponent,
    AlertComponent,
    ChangePasswordComponent,
    HeaderComponent,
    NavbarComponent,
    CheckoutComponent,
    ConfitmationComponent,
    ProfileCompanyComponent,
    ViewCanComponent,
    UpdatJobComponent,
    ViewJobComponent,
    UpdateJobComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    SliderModule,
    DialogModule
  ]
})
export class EmployerModule { }
