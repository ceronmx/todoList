import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

import { User } from '../interfaces/user.interface';
import { throwError } from 'rxjs';


const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  get headers(){
    const token = localStorage.getItem('token')

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })     
    }
  }

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
    }).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  validateToken(){
    return this.http.get(`${BASE_URL}/users/token/validate`, this.headers)
  }
}
