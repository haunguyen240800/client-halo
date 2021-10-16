import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { JobsComponent } from './jobs/jobs.component';
import { CategoryComponent } from './category/category.component';
import { BlogComponent } from './blog/blog.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    JobsComponent,
    CategoryComponent,
    BlogComponent,
    TestimonialComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DropdownModule,
    FormsModule
  ]
})
export class HomeModule { }
