import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {path: '', component: LoginComponent},
            {path: 'signin', component: LoginComponent},
            {path: 'signup', component: RegisterComponent},
            {path: '', redirectTo: 'auth', pathMatch: 'full'}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
