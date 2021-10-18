import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { AlertComponent } from './alert/alert.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    EmployerComponent,
    AlertComponent,
    ChangePasswordComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule { }
