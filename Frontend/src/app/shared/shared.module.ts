import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginTransitionComponent } from './transitions/login-transition/login-transition.component';
import { LogoutTransitionComponent } from './transitions/logout-transition/logout-transition.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    LoginTransitionComponent,
    LogoutTransitionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], 
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    LoginTransitionComponent,
    LogoutTransitionComponent,
  ]
  
})
export class SharedModule { }