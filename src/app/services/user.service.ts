import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TaskResponse } from '../interfaces/taskResponse.interface';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private get headers(){
    const token = localStorage.getItem('token')

    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })     
    }
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
}
