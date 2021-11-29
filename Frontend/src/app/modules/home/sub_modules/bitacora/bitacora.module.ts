import { ReactiveFormsModule } from '@angular/forms';
import { BitacoraComponent } from './pages/bitacora.component';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BitacoraRoutingModule } from './bitacora-routing.module';

@NgModule({
  declarations: [
    BitacoraComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    BitacoraRoutingModule,
    ReactiveFormsModule
  ]
})
export class BitacoraModule { }