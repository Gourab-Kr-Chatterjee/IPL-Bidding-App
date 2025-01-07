import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  ROLES = ["ADMIN","USER","ORGANIZER"]
  newUser:any={}
  usernameIsInvalid=false;
  passwordIsInvalid=false;
  constructor(private authService: AuthService,private router:Router) {
    
    this.newUser = {
      username  : '',
      password  : '',
      role  : '',
      confirmPassword:''
    }
   }

  ngOnInit(): void {
  }

  navigateToLoginPage()
  {
    this.router.navigate(
      ['/login']
    );
  }

  createUser()
  {
    this.authService.registerUser(this.newUser.username , this.newUser.password , this.newUser.role).subscribe(
      res=>{
        console.log("User registered....",res);
        this.navigateToLoginPage();
      }
    )
  }

  get passwordMismatch()
  {
    return !(this.newUser.password.localeCompare(this.newUser.confirmPassword)==0);
  }

  checkUsername()
  {
    if(this.newUser.username.trim()=='')
    {
      this.usernameIsInvalid=true
    }
  }

  checkPassword()
  {
    if(this.newUser.password.trim()=='')
    {
      this.passwordIsInvalid=true
    }
  }



}
