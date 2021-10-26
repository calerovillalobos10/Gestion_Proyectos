import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvancesRoutingModule } from './avances-routing.module';
import { AvancesComponent } from './pages/avances/avances.component';


@NgModule({
  declarations: [
    AvancesComponent
  ],
  imports: [
    CommonModule,
    AvancesRoutingModule
  ]
})
export class AvancesModule { }
