import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/user-utils';
const AUTH_API = 'http://localhost:8080/authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User;
  constructor(private http: HttpClient) {
    this.user = {
      username: "default_user",
      email: "default_mail",
      userID: '0',
      role: "guest",
      listOfApps: [],
      premiumSubs: [],
      cart: [],
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
    )
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

  getCurrentUser(): User {
    let user = window.sessionStorage.getItem('user_authorization');
    if(user){
      const userData = JSON.parse(user);
      this.user.userID = userData._id;
      this.user.username = userData.username;
      this.user.email = userData.email;
      this.user.role = userData.roles[0].name;
      this.user.listOfApps = userData.listOfApps;
      this.user.premiumSubs = userData.PremiumSubscriptions;
      this.user.cart = userData.cart;
    }
    console.log(this.user);
    return this.user
  }

}
