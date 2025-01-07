import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/models/user.model';
import { UrlConfig } from './service.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string;
  constructor(private http : HttpClient) {
      this.baseUrl = UrlConfig.BASEURL + '/api/user';
   }
  
  registerUser(username:string , password:string , role:string):Observable<any>
  {
    console.log('requesting to register user...');
      return this.http.post(this.baseUrl+`/register` , {username,password,role});
      //return of({username,password,role});
  }

  login(username:string , password:string , role:string):Observable<any>
  {
    //tap token and role to local storage
    console.log('requesting to login user...');
    return this.http.post<any>(this.baseUrl+`/login` , {username,password,role}).pipe(
      tap(res=>{
          localStorage.setItem("token", res.token);
          localStorage.setItem("role",res.role);
      })
    )
  }

  isLoggedIn():boolean
  {
      console.log("token in local storage:=>",localStorage.getItem('token'));
      return localStorage.getItem('token')!=null;
  }

  isAdmin():boolean
  {
    return localStorage.getItem('role') == 'ADMIN';
  }

  isOrganizer():boolean
  {
    return localStorage.getItem('role') == 'ORGANIZER';
  }

  logout():void
  {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getRole():string|null
  {
    return localStorage.getItem('role');
  }

}
