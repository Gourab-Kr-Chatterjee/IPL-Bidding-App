import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  isAdmin : boolean;
  isOrganizer : boolean;
  constructor(private authService: AuthService , private router:Router) {
    this.isLoggedIn = authService.isLoggedIn();
    this.isAdmin = authService.isAdmin();
    this.isOrganizer = authService.isOrganizer();
   }

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.logout();
    this.router.navigate(
      ['/login']
    );
  }

  get nextAction()
  {
    let linkName = this.isAdmin?'Admin':this.isOrganizer?'Organizer':'Register';
    let link = this.isAdmin?"/admin":this.isOrganizer?'/organizer':'/signup';
    return {linkName,link};
  }

  

}
