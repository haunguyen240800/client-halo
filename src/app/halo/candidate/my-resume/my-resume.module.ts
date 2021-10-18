import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';

import { MyResumeRoutingModule } from './my-resume-routing.module';
import { MyResumeComponent } from './my-resume.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillComponent } from './skill/skill.component';
import { AwardComponent } from './award/award.component';
import { GenComponent } from './gen/gen.component';
import { ShareModule } from 'src/app/share/share.module';
import { DialogModule } from 'primeng/dialog';
import {SliderModule} from 'primeng/slider';

@NgModule({
  declarations: [
    MyResumeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillComponent,
    AwardComponent,
    GenComponent
  ],
  imports: [
    CommonModule,
    MyResumeRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    EditorModule,
    ShareModule,
    DialogModule,
    SliderModule
  ]
})
export class MyResumeModule { }
