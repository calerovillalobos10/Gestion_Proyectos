import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ListComponent } from './components/list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    FuncionariosComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ]
})
export class FuncionariosModule { }
