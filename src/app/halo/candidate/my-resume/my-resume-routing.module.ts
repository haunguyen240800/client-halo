import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Education } from 'src/app/model/education';
import { AwardComponent } from './award/award.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { GenComponent } from './gen/gen.component';
import { MyResumeComponent } from './my-resume.component';
import { SkillComponent } from './skill/skill.component';

const routes: Routes = [
  {
    path: '',
    component: MyResumeComponent,
    children: [
      {
        path: 'gen',
        component: GenComponent
      },
      {
        path: '',
        redirectTo: 'gen',
        pathMatch: 'full'
      },
      {
        path: 'exp',
        component: ExperienceComponent
      },
      {
        path: 'edu',
        component: EducationComponent
      },
      {
        path: 'skill',
        component: SkillComponent
      },
      {
        path: 'award',
        component: AwardComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyResumeRoutingModule { }
