import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';


const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(user: User){
    return this.http.post(`${BASE_URL}/users`, {
      email: user.email,
      password: user.pass,
      name: user.name
    });
  }

  signIn(user: User){
    return this.http.post(`${BASE_URL}/users/login`, {
      email: user.email,
      password: user.pass
    });
  }
}
