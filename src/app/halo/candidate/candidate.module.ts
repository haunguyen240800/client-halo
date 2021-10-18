import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CandidateComponent } from './candidate.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidateComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    ReactiveFormsModule
  ]
})
export class CandidateModule { }
