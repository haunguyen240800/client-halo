import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingComponent } from './rating/rating.component';
import {PaginatorModule} from 'primeng/paginator';
import { PopupInterviewComponent } from './popup-interview/popup-interview.component';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    NotFoundComponent,
    PaginationComponent,
    RatingComponent,
    PopupInterviewComponent,
    FullCalendarComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    DialogModule,
    ReactiveFormsModule,
    FullCalendarModule
  ],
  exports: [NotFoundComponent,PaginationComponent,PopupInterviewComponent,FullCalendarComponent]
})
export class ShareModule { }
