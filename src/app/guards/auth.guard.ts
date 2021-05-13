import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  private loading = false;

  constructor(private _authService: AuthService,
              private router: Router){

  }

  public get loadingStatus(){
    return this.loading;
  }

  async canActivate(): Promise<any> {
    this.loading = true;
    let guardResult = false;

    if(localStorage.getItem('token')){
      try {
        const res:any = await this._authService.validateToken().toPromise();
        
        if(res.response.tokenValid){
          guardResult = true
        }else{
          this.router.navigate(['auth/signin']);
          guardResult = false;
        }
        
      } catch (error) {
        this.router.navigate(['auth/signin']);
        guardResult = false;
      }
      this.loading = false;
      return guardResult;
    } else {
      this.loading = false;
      this.router.navigate(['auth/signin']);
      return false;
    }
  }

  
}
