import { SharedModule } from '@shared/shared.module';

import { RelatedAdvancesComponent } from './components/related-advances-modal/related-advances.component';

import { DetModalComponent } from './components/det-modal/det-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesComponent } from './pages/solicitudes/solicitudes.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    SolicitudesComponent,
    AddModalComponent,
    DetModalComponent,
    RelatedAdvancesComponent,
  ],
  imports: [
    CommonModule,
    SolicitudesRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    DataTablesModule,
    SharedModule
  ]
})
export class SolicitudesModule { }
