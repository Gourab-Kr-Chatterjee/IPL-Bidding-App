import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username:string;
  password:string;
  role:string;
  ROLES = ['ADMIN',"USER","ORGANIZER"];
  isUnauthorized=false;

  constructor(private authService:AuthService, private router:Router) {
    this.username='';
    this.password='';
    this.role='';
   }

  ngOnInit(): void {
  }

  navigateToHome()
  {
    this.router.navigate(
      ['/']
    )
  }

  login()
  {
    this.authService.login(this.username,this.password,this.role).subscribe(
      res=>{
        console.log("logged in the user:",res);
        this.navigateToHome();
      }
      ,
      error=>{
        console.log("Could not log in...",error);
        this.isUnauthorized=true;
      }
    )
  }

}
