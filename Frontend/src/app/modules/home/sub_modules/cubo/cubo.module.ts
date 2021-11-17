import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuboRoutingModule } from './cubo-routing.module';
import { CuboComponent } from './cubo.component';
import { DxPivotGridModule } from "devextreme-angular";

@NgModule({
  declarations: [
    CuboComponent
  ],
  imports: [
    CommonModule,
    CuboRoutingModule,
    DxPivotGridModule
  ]
})
export class CuboModule { }
