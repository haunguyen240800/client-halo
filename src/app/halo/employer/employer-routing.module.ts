import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployerComponent } from './employer.component';
import { ProfileCompanyComponent } from './profile-company/profile-company.component';
import { UpdateJobComponent } from './update-job/update-job.component';
import { ViewCanComponent } from './view-can/view-can.component';

const routes: Routes = [
  {
    path: '',
    component: EmployerComponent,
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
        path: 'job-post',
        loadChildren: () => import("./job-post/job-post.module").then(m=>m.JobPostModule)
      },
      {
        path: 'mn-job',
        loadChildren: () => import("./mn-job/mn-job.module").then(m=>m.MnJobModule)
      },
      {
        path: 'mn-candidate',
        loadChildren: () => import("./mn-candidate/mn-candidate.module").then(m=>m.MnCandidateModule)
      },
      {
        path: 'alert',
        component: AlertComponent
      },
      {
        path: 'account',
        loadChildren: () => import("./account/account.module").then(m=>m.AccountModule)
      },
      {
        path: 'contact',
        loadChildren: () => import("./contact/contact.module").then(m=>m.ContactModule)
      },
      {
        path: 'account/change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'transactions',
        loadChildren: () => import("./transactions/transactions.module").then(m=>m.TransactionsModule)
      },
      {
        path: 'profile-company',
        component: ProfileCompanyComponent
      },
      {
        path: 'mn-candidate/:id',
        component: ViewCanComponent
      },
      {
        path: 'job-post/upadte/:id',
        component: UpdateJobComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
