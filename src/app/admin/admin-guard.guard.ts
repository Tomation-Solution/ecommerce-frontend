import { AuthService } from './../login-register/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      if (role === 'vendor' && token !== null) {
        this.authService.isLoggedIn = true;
        return true;
      }
      this.router.navigate(['/home']);
      return false;
  }
}
