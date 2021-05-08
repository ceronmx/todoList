import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PagesComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PagesComponent,
    InicioComponent
  ]
})
export class PagesModule { }
