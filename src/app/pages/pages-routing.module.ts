import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CompleteComponent } from './complete/complete.component';
import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
    {   path: 'client', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'todo', component: TodoComponent},
            {path: 'done', component: CompleteComponent},
            {path: 'settings', component: SettingsComponent},
            {path: '', redirectTo: 'todo', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
