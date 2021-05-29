import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  
  changePasswordForm: FormGroup = this.fb.group({
    pass: ['', [Validators.required, Validators.minLength(6)]],
    pass2: ['', [Validators.required, Validators.minLength(6)]]
  }, {validators: this.checkPasswords});

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  });

  showChangePassword = false;
  loading = false;
  userData;
  file: File;
  fileName: string;
  imagePath: string | ArrayBuffer = '../../../assets/noimage.jpg';

  
  constructor(private _userService: UserService,
              private _toastrService: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserData();
  }

  get password2Check(){
    const password = this.changePasswordForm.get('pass').value;
    const password2 = this.changePasswordForm.get('pass2').value;

   return !(password === password2)
  }

  isInvalid(field: string){
    return this.userForm?.get(field).invalid &&  this.userForm?.get(field).touched; 
  }

  passwordInvalid(field: string){
    return this.changePasswordForm.get(field).invalid &&  this.changePasswordForm.get(field).touched; 
  }

  changeImage($event){
    this.file = $event.target.files[0];
    this.fileName = this.file.name;


    this.readFile($event.target)
    this.userForm.markAsDirty();
  }

  async sendData(){
    this.loading = true;
    const data = {
      ...this.userForm.value,
    }

    try {
      const resUserData = await this._userService.patchUser(data).toPromise();
      let resUserAvatar;
      if(this.file){
        resUserAvatar = await this._userService.postAvatar(this.file).toPromise();
      }

      console.log(resUserData);
      console.log(resUserAvatar);
      
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
    
  }

  async changePass(){
    this.loading = true;
    const data = {
      ...this.userForm.value,
    }

    try {
      const resUserData = await this._userService.patchUser(data).toPromise();
      let resUserAvatar;
      if(this.file){
        resUserAvatar = await this._userService.postAvatar(this.file).toPromise();
      }

      console.log(resUserData);
      console.log(resUserAvatar);
      
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
    
  }

  private readFile(inputValue: any){
    const file = inputValue.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = (e) =>{
      this.imagePath = fileReader.result;
    }

    fileReader.readAsDataURL(file);

  }

  private async getUserData(){
    this.loading = true;
    try {
      const res: any = await this._userService.getUser().toPromise();

      if(!res.error){
        this.userData = res.response;
        this.initForm();
        
        
      }
    } catch (error) {
      this._toastrService.error(error.error.response);
    }

    try {
      const avatar: any = await this._userService.getAvatar().toPromise();
      console.log(avatar);
      
      if(!avatar.error){
        console.log(avatar)
      }
    } catch (error) {
      this.imagePath = error.url;
    }

    this.loading = false;
  }

  private initForm(){
    this.userForm.setValue({
      name: this.userData.name,
      email: this.userData.email
    })
  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('pass').value;
    const password2 = group.get('pass2').value;

    return password === password2 ? null : { notSame: true };
  }

  private changeAvatar(avatar: File){
    
  }

}
