import { DataTablesModule } from 'angular-datatables';
import { NoDataDirective } from './../../../../core/directives/images/err-no-data.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';


@NgModule({
  declarations: [
    InicioComponent,
    NoDataDirective
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    DataTablesModule
  ]
})
export class InicioModule { }
