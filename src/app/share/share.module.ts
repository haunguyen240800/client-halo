import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    NotFoundComponent,
    PaginationComponent,
    RatingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NotFoundComponent,PaginationComponent]
})
export class ShareModule { }
