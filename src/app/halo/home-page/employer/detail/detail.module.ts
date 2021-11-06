import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    DialogModule,
    RatingModule,
    FormsModule,
    ToastModule
  ]
})
export class DetailModule { }
