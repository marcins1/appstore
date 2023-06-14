import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../data/user-utils';
import { StorageService } from './storage.service';
const AUTH_API = 'http://localhost:8080/authentication/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: User;
  constructor(private http: HttpClient,
              private storage: StorageService) {
    this.user = {
      username: "default_user",
      email: "default_mail",
      userID: '0',
      role: "guest",
      listOfApps: [],
      premiumSubs: [],
      cart: [],
    }
    // this.storage.saveUser(this.user);
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
    let user = this.storage.getUser();
    if(user){
      this.user.userID = user._id;
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.role = user.roles[0].name;
      this.user.listOfApps = user.listOfApps;
      this.user.premiumSubs = user.PremiumSubscriptions;
      this.user.cart = user.cart;
    }
    return this.user
  }

}
