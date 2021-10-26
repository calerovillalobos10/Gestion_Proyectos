import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {}
      }
    })
  ]
})
export class PrincipalModule { }
