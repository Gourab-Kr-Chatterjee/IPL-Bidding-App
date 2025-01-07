import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log("Auth Guard Activated!");
    let isAuthenticated = this.checkAuthenticated();

    let roleInPath = route.url[0].path;
    console.log("Role in path",roleInPath);

    let role:string|null = this.authService.getRole();

    if (isAuthenticated && role!=null && role.toLowerCase()==roleInPath.toLowerCase())
    {
      return true;
    }
  }

  checkAuthenticated()
  {
    return this.authService.isLoggedIn();
  }
  
}
