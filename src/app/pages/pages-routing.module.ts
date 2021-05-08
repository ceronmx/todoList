import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {   path: 'client', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'inicio', component: InicioComponent},
            {path: '', redirectTo: 'inicio', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
