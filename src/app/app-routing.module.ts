import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RecoverComponent } from './auth/recover/recover.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'recover', component: RecoverComponent},
  {path: '*', pathMatch: 'full', redirectTo: 'login'},
  {path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
