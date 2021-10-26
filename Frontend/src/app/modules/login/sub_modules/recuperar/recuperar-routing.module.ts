import { RecoveryGuard } from './../../../../core/guards/recovery/recovery.guard';
import { Paso2Component } from './pages/paso2/paso2.component';
import { Paso3Component } from './pages/paso3/paso3.component';
import { Paso1Component } from './pages/paso1/paso1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'paso1'
  }
  ,{
    path: 'paso1',
    component: Paso1Component
  },
  {
    path: 'paso2',
    component: Paso2Component,
    canActivate: [RecoveryGuard]
  },
  {
    path: 'paso3',
    component: Paso3Component,
    canActivate: [RecoveryGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarRoutingModule { }
