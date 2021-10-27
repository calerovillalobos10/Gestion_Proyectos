import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from '@core/interceptors/Tokens';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrImgDirective } from './core/directives/images/err-img.directive';

@NgModule({
  declarations: [
    AppComponent,
    ErrImgDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
