import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
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
    loadChildren: () => import("./halo/candidate/candidate.module").then(m=>m.CandidateModule),
    canActivate: [AuthGuard],
    data: {
      roles: ["ROLE_CANDIDATE"]
    }
  },
  {
    path: 'emp',
    loadChildren: () => import("./halo/employer/employer.module").then(m=>m.EmployerModule),
    canActivate: [AuthGuard],
    data: {
      roles: ["ROLE_EMPLOYER"]
    }
  },
  {
    path: 'admin',
    loadChildren: () => import("./halo/admin/admin.module").then(m=>m.AdminModule),
    canActivate: [AuthGuard],
    data: {
      roles: ["ROLE_ADMIN","ROLE_STAFF"]
    }
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
