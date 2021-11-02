import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: ()=> import("./dashboard/dashboard.module").then(m=>m.DashboardModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'contact',
        loadChildren: ()=> import("./contact/contact.module").then(m=>m.ContactModule)
      },
      {
        path: 'mn-job',
        loadChildren: ()=> import("./job/job.module").then(m=>m.JobModule)
      },
      {
        path: 'category',
        loadChildren: ()=> import("./category/category.module").then(m=>m.CategoryModule)
      },
      {
        path: 'job-type',
        loadChildren: ()=> import("./job-type/job-type.module").then(m=>m.JobTypeModule)
      },
      {
        path: 'position',
        loadChildren: ()=> import("./position/position.module").then(m=>m.PositionModule)
      },
      {
        path: 'account',
        loadChildren: ()=> import("./account/account.module").then(m=>m.AccountModule)
      },
      {
        path: 'position',
        loadChildren: ()=> import("./position/position.module").then(m=>m.PositionModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
