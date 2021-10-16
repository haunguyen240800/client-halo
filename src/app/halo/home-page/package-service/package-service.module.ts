import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageServiceRoutingModule } from './package-service-routing.module';
import { PackageServiceComponent } from './package-service.component';


@NgModule({
  declarations: [
    PackageServiceComponent
  ],
  imports: [
    CommonModule,
    PackageServiceRoutingModule
  ]
})
export class PackageServiceModule { }
