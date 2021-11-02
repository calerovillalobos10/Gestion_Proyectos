
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ListComponent } from './components/list/list.component';
import { EdtModalComponent } from './components/edt-modal/edt-modal.component';

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
    NgxDatatableModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
         
        }

      }
    })
  ]
})
export class DepartamentosModule { }
