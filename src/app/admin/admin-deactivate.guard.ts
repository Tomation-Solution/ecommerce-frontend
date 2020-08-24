import { AuthService } from './../login-register/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDeactivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      if (role === null && token === null) {
        this.authService.isLoggedIn = false;
        return true;
      }
      this.router.navigate(['/admin', 'dashboard']);
      return false;
  }

}
