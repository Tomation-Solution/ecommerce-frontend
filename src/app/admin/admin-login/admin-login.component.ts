import { AuthService } from './../../login-register/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  userDetails = { email: '', password: '' };
  loginError = '';

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  loginUser(form): void {
    document.getElementsByClassName('sqr-btn')[0].innerHTML = 'Please Wait...';
    this.auth.logInVendor(form.value).subscribe(result => {
      if (result.status === 'error') {
        this.loginError = result.data;
        return;
      } else {
        // stores the user data in the auth service
        this.auth.loggedInVendor = result;
        // stores the user token in the session
        sessionStorage.setItem('token', result.access_token);
        sessionStorage.setItem('role', 'vendor');
        sessionStorage.setItem('username', result.firstname);
        this.route.navigateByUrl('/admin/dashboard');
      }
    }, err => {
      this.loginError = err.error.data;
      document.getElementsByClassName('sqr-btn')[0].innerHTML = 'Login';
    });
  }
}
