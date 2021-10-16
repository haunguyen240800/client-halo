import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import("./home/home.module").then(m=>m.HomeModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'contact',
        loadChildren: () => import("./contact/contact.module").then(m=>m.ContactModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import("./jobs/jobs.module").then(m=>m.JobsModule)
      },
      {
        path: 'employer',
        loadChildren: () => import("./employer/employer.module").then(m=>m.EmployerModule)
      },
      {
        path: 'register',
        loadChildren: () => import("./register/register.module").then(m=>m.RegisterModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import("./about-us/about-us.module").then(m=>m.AboutUsModule)
      },
      {
        path: 'register',
        loadChildren: () => import("./register/register.module").then(m=>m.RegisterModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
