import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Customer } from './../models/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  customer: Customer = {};
  RegistrationError = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(form: NgForm): void {
    const customerData = {
      firstname: this.customer.firstName,
      lastname: this.customer.lastName,
      email: this.customer.email,
      phone_number: this.customer.phoneNumber,
      password: this.customer.password
    };
    this.authService.registerCustomer(customerData).subscribe(result => {
      this.authService.CustomerDetails.isLoggedIn = true;
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('role', 'customer');
      localStorage.setItem('username', result.firstname);
      this.authService.username.next(localStorage.getItem('username'));
      this.router.navigate(['/home']);
    }, err => {
      console.log(err);
    });
  }
  login(form: NgForm): void {

  }
}
