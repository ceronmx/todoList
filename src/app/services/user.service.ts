import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TaskResponse } from '../interfaces/taskResponse.interface';
import { User } from '../interfaces/user.interface';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private get headers(){
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })     
    }
  }

  private get uid(){
    const user: any = localStorage.getItem('user');  
    const {_id} = JSON.parse(user); 
    return _id;
  }

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<TaskResponse>(`${BASE_URL}/tasks?sortBy=createdAt:desc`, this.headers)
      .pipe(
        catchError(e => {
          return throwError(e);
        })
      );
  }

  createTask(description: string){
    const body = {
      description
    };

    return this.http.post(`${BASE_URL}/tasks`, body , this.headers)
      .pipe(
        catchError(e =>{
          return throwError(e);
        })
      )
  }

  completeTask(id: string){
    const body = {
      completed: true
    };
    return this.http.patch(`${BASE_URL}/tasks/${id}`, body, this.headers)
    .pipe(
      catchError(e =>{
        return throwError(e);
      })
    );
  }

  deleteTask(id: string){
    return this.http.delete(`${BASE_URL}/tasks/${id}`, this.headers)
    .pipe(
      catchError(e =>{
        return throwError(e);
      })
    );
  }

  deleteTasks(){
    return this.http.delete(`${BASE_URL}/tasks`, this.headers)
    .pipe(
      catchError(e =>{
        return throwError(e);
      })
    );
  }

  getUser(){
    return this.http.get(`${BASE_URL}/users/me`, this.headers)
    .pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getAvatar(){
    return this.http.get(`${BASE_URL}/users/${this.uid}/avatar`)
      .pipe(
        catchError( e => {
          return throwError(e);
        })
      )
  }

  patchUser(data: User){
    return this.http.patch(`${BASE_URL}/users/me`, data ,this.headers)
      .pipe(
        catchError( e => {
          return throwError(e);
        })
      )
  }

  postAvatar(avatar: File){
    const body = new FormData();
    body.append('avatar', avatar);
    return this.http.post(`${BASE_URL}/users/me/avatar`, body, this.headers)
    .pipe(
      catchError( e => {
        return throwError(e);
      })
    )
  }
}
