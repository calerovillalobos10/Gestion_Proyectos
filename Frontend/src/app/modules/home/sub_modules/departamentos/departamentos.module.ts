
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ListComponent } from './components/list/list.component';
import { EdtModalComponent } from './components/edt-modal/edt-modal.component';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    DepartamentosComponent,
    AddModalComponent,
    ListComponent,
    EdtModalComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    ErrorTailorModule.forRoot({
      errors: { useValue: {} }
    })
  ]
})

export class DepartamentosModule { }