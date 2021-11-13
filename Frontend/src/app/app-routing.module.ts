import { AuthGuard } from './core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/main/home.component';
import { MainLoginComponent } from '@modules/login/main/main-login.component';

const routes: Routes = [
  {
    path:'login',
    component: MainLoginComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },

  {
    path:'', 
    component: HomeComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate:[AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }