import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import("./dashboard/dashboard.module").then(m=>m.DashboardModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'saved-job',
        loadChildren: () => import("./saved-job/saved-job.module").then(m=>m.SavedJobModule)
      },
      {
        path: 'apply-job',
        loadChildren: () => import("./apply-job/apply-job.module").then(m=>m.ApplyJobModule)
      },
      {
        path: 'alert',
        loadChildren: () => import("./alert/alert.module").then(m=>m.AlertModule)
      },
      {
        path: 'account',
        loadChildren: () => import("./account/account.module").then(m=>m.AccountModule)
      },
      {
        path: 'resume',
        loadChildren: () => import("./my-resume/my-resume.module").then(m=>m.MyResumeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
