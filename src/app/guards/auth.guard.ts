import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _toastr: ToastrService,
              private router: Router){

  }

  canActivate(): boolean {
      if(localStorage.getItem('token')){
        return true
      }else{
          this.router.navigate(['auth/signin']);
          return false;
      }
  }
  
}
