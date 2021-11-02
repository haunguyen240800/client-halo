import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { JobPostComponent } from './job-post.component';
import { NewComponent } from './new/new.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: JobPostComponent,
    children: [
      {
        path: 'new',
        component: NewComponent
      },
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'pkgpayment',
        component: PaymentComponent
      },
      {
        path: 'confitmation',
        component: ConfirmComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostRoutingModule { }
