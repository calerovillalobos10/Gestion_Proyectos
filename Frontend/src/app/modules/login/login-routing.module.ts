
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("@modules/login/sub_modules/principal/principal.module")
      .then(m => m.PrincipalModule),
  },

  {
    path: 'recuperar',
    loadChildren: () => import("@modules/login/sub_modules/recuperar/recuperar.module")
      .then(m => m.RecuperarModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
