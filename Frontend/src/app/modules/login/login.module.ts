import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MainLoginComponent } from './main/main-login.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    MainLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
