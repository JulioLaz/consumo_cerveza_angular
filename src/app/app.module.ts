import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CalcularComponent } from './calcular/calcular.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    NavBarComponent,
    CalcularComponent,
    ModalErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [
    ModalErrorComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
