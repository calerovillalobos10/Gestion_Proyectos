import { EdtModalComponent } from './components/edt-modal/edt-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { ListComponent } from './components/list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ErrImgDirective } from '@core/directives/images/err-img.directive';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { DetModalComponent } from './components/det-modal/det-modal.component';


@NgModule({
  declarations: [
    FuncionariosComponent,
    ListComponent,
    AddModalComponent,
    EdtModalComponent,
    ErrImgDirective,
    DetModalComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
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
export class FuncionariosModule { }
