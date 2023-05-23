import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser: any;
  isLoggedIn: boolean;
  isAdmin: boolean = false;
  constructor(private auth: AuthService, private storage: StorageService){
    this.isLoggedIn = storage.isLoggedIn();
    if (this.isLoggedIn) {
      this.currentUser = storage.getUser();
      this.isAdmin = this.currentUser.roles.find((role: string) => {
        if (role === "ROLE_ADMIN") {
          return true;
        }
      
        return false;
      });
    }
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: res => {
        console.log(res);
        this.storage.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
