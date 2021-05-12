import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CompleteComponent } from './complete/complete.component';
import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    PagesComponent,
    TodoComponent,
    CompleteComponent,
    SettingsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PagesComponent,
     ]
})
export class PagesModule { }
