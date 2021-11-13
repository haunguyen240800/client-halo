import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfoAccountComponent } from './info-account/info-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    NavbarComponent,
    InfoAccountComponent,
    ChangePasswordComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DialogModule
  ]
})
export class AdminModule { }
