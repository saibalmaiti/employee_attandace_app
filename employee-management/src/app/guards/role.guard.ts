import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private route: Router){}
  canActivate() {
    if(localStorage.getItem("role") == "ROLE_ADMIN")
      return true;
    alert("You are not authorized to access this page");
    this.route.navigate(["/"]);
    return false;
  }

}
