import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { RecuperarRoutingModule } from './recuperar-routing.module';
import { Paso1Component } from './pages/paso1/paso1.component';
import { Paso2Component } from './pages/paso2/paso2.component';
import { Paso3Component } from './pages/paso3/paso3.component';


@NgModule({
  declarations: [
    Paso1Component,
    Paso2Component,
    Paso3Component
  ],
  imports: [
    CommonModule,
    RecuperarRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecuperarModule { }
