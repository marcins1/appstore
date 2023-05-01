import { Injectable } from '@angular/core';

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
  constructor() {
    this.User = {
      username: "default_user",
      email: "default_mail",
      id: 0
    }
  }

  getCurrentUser(){
    return this.User;
  }
  
}
