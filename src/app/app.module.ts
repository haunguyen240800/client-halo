import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './halo/login/login.component';
import { ShareModule } from './share/share.module';
import { NotFoundComponent } from './halo/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RestPasswordComponent } from './halo/rest-password/rest-password.component';
import { Interceptor } from './core/interceptor/interceptor';
import { NgxPayPalModule } from 'ngx-paypal';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RestPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShareModule,
    FileUploadModule,
    DropdownModule,
    NgxPayPalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
  exports: [ShareModule]
})
export class AppModule { }
