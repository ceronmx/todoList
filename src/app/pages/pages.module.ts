import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';

import { RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { CompleteComponent } from './complete/complete.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    PagesComponent,
    TodoComponent,
    CompleteComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    PagesComponent,
    ]
})
export class PagesModule { }
