import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private auth:AuthService) {}
  canActivate(){
    if(this.auth.loggedIn()){
      return true;
    }
    else{
      alert("Login to Access this page");
      this.router.navigate(['/'])
      return false;
    }
  }

}
