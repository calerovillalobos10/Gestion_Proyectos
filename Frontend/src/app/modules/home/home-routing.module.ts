import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/inicio', pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import("@modules/home/sub_modules/inicio/inicio.module")
      .then(m => m.InicioModule),
  },
  {
    path: 'solicitudes',
    loadChildren: () => import("@modules/home/sub_modules/solicitudes/solicitudes.module")
      .then(m => m.SolicitudesModule),
  },
  {
    path: 'avances',
    loadChildren: () => import("@modules/home/sub_modules/avances/avances.module")
      .then(m => m.AvancesModule),
  },
  {
    path: 'departamentos',
    loadChildren: () => import("@modules/home/sub_modules/departamentos/departamentos.module")
      .then(m => m.DepartamentosModule),
  },
  {
    path: 'funcionarios',
    loadChildren: () => import("@modules/home/sub_modules/funcionarios/funcionarios.module")
      .then(m => m.FuncionariosModule),
  },
  {
    path: 'bitacora',
    loadChildren: () => import("@modules/home/sub_modules/bitacora/bitacora.module")
      .then(m => m.BitacoraModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }