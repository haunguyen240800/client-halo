import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './halo/login/login.component';
import { NotFoundComponent } from './halo/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'ct',
    loadChildren: () => import("./halo/home-page/home-page.module").then(m=>m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'ct',
    pathMatch: 'full'
  },
  {
    path: 'can',
    loadChildren: () => import("./halo/candidate/candidate.module").then(m=>m.CandidateModule)
  },
  {
    path: 'emp',
    loadChildren: () => import("./halo/employer/employer.module").then(m=>m.EmployerModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./halo/admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
