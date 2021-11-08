import { AddModalComponent } from './components/add-modal/add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvancesRoutingModule } from './avances-routing.module';
import { AvancesComponent } from './pages/avances/avances.component';


@NgModule({
  declarations: [
    AvancesComponent,
    AddModalComponent
  ],
  imports: [
    CommonModule,
    AvancesRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    DataTablesModule
  ]
})
export class AvancesModule { }
