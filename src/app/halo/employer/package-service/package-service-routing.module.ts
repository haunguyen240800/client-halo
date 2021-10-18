import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageServiceComponent } from './package-service.component';

const routes: Routes = [
  {
    path: '',
    component: PackageServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageServiceRoutingModule { }
