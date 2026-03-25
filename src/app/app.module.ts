import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
imports: [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,

  // PrimeNG
  CardModule,
  InputTextModule,
  ButtonModule,
  TableModule,
  ToastModule,
  ToolbarModule,
  RippleModule,
  TooltipModule,
  ConfirmDialogModule,
],

  providers: [CookieService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
