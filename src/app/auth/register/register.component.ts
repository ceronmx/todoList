import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    pass: ['', [Validators.required, Validators.minLength(6)]],
    pass2: ['', [Validators.required, Validators.minLength(6)]]
  }, 
  { validators: this.checkPasswords }
  );

  visibility = {
    icon: 'visibility',
    type: 'password'
  }

  visibility2 = {
    icon: 'visibility',
    type: 'password'
  }

  loading = false;

  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private _toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get password2Check(){
    const password = this.signupForm.get('pass').value;
    const password2 = this.signupForm.get('pass2').value;

   return !(password === password2)
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('pass').value;
    const password2 = group.get('pass2').value;

    return password === password2 ? null : { notSame: true };
  }

  isInvalid(field: string){
    return this.signupForm.get(field).invalid && this.signupForm.get(field).touched;
  }

  passVisibility(){
    const {icon} = this.visibility;
    if(icon === 'visibility') {
      this.visibility.icon = 'visibility_off';
      this.visibility.type = 'text';
    }
    else {
      this.visibility.icon = 'visibility';
      this.visibility.type = 'password';
    }
  }

  pass2Visibility(){
    const {icon} = this.visibility2;
    if(icon === 'visibility') {
      this.visibility2.icon = 'visibility_off';
      this.visibility2.type = 'text';
    }
    else { 
      this.visibility2.icon = 'visibility';
      this.visibility2.type = 'password';
    }
  }

  async signUp(){
    this.loading = true;
    let res : any;
    const {email, name, pass} = this.signupForm.value;
    try {
      res = await this._authService.signUp({name, email, pass}).toPromise();
      if(!res.error){
        this._toastrService.success('User created', 'Success');
      }else{
        this._toastrService.error(res.response, 'Oopsies!');
      }
      this.loading = false;
      this.router.navigateByUrl('/login');
    } catch (error) {
      this._toastrService.error(error.error.response, 'Oopsies!');
      this.loading = false;
    }

  }
}
