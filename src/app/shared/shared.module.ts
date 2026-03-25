import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponentComponent } from './components/toolbar-navigation-component/toolbar-navigation-component.component';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';



@NgModule({
  declarations: [
    ToolbarNavigationComponentComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
        // PrimeNg
    ToolbarModule,
    CardModule,
    ButtonModule,
  ],

  exports: [ToolbarNavigationComponentComponent, ShortenPipe],
  providers: [DialogService, CurrencyPipe],

})
export class SharedModule { }
