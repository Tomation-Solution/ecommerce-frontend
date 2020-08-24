import { Router } from '@angular/router';
import { AuthService } from './../../login-register/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
    username: string;
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }
  logOut(): void {
    this.authService.logOutVendor();
    this.authService.isLoggedIn = false;
    this.router.navigateByUrl('/home');
  }
}
