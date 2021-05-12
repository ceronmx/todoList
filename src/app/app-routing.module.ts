import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'client/todo', pathMatch: 'full' },
  { path: '**', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),
            AuthRoutingModule,
            PagesRoutingModule
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
