import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required,  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    pass: ['', [Validators.required]],
    remember: []
  })

  loading = false;



  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private _toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.loginForm.get('email').setValue(localStorage.getItem('email'));
      this.loginForm.get('remember').setValue(true);
    }
  }

  async login(){
    this.loading = true;
    const {remember, email} = this.loginForm.value;
    try {
      const res: any =  await this._authService.signIn(this.loginForm.value).toPromise();
      if(!res.error){
       if(remember){
         localStorage.setItem('email', email)
       } else {
         localStorage.removeItem('email');
       }

       const { response } = res;
       
       localStorage.setItem('user', JSON.stringify(response.user));
       localStorage.setItem('token', response.token)

       this._toastr.success('Working hard or hardly working?', 'Welcome back! :)')

       this.router.navigateByUrl('client/inicio');
      }else{
        this._toastr.error('Incorrect email/password', res.response);
      }
    } catch (error) {
      console.log(error);
      
      this._toastr.error('Incorrect email/password', 'Something went wrong!')
    }
    this.loginForm.reset();
    this.loginForm.clearValidators();
    this.loading = false;  
  }

  isInvalid(field: string){
    return this.loginForm.get(field).invalid &&  this.loginForm.get(field).touched; 
  }

}
