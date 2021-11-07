import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    SolicitudesComponent,
    AddModalComponent
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    PdfViewerModule,
    DataTablesModule
  ]
})
export class SolicitudesModule { }
