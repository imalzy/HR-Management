import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    UserDropdownComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: LOCALE_ID, useValue: 'id-ID' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
