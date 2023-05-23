import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface user{
  username: String;
  email: String;
  id: Number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  User: user;
  constructor(private http: HttpClient) {
    this.User = {
      username: "default_user",
      email: "default_mail",
      id: 0
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  getCurrentUser(){
    return this.User;
  }

}
