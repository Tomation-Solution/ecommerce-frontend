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
  RegistrationError = [];
  loginError = '';
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
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('role', 'customer');
      localStorage.setItem('username', result.firstname);
      this.router.navigate(['/home']);
    }, err => {
      this.RegistrationError = [];
      Object.keys(err.error).forEach((key) => {
        if (err.error[key] !== 'error'){
          this.RegistrationError.push(err.error[key][0]);
        }
      });
    });
  }
  login(form: NgForm): void {
    this.authService.loginCustomer(form.value).subscribe(result => {
      localStorage.setItem('token', result.access_token);
      localStorage.setItem('username', result.firstname);
      localStorage.setItem('email', result.email);
      const id = result.customer_id;
      localStorage.setItem('customerId', id);
      this.authService.customerIsLoggedIn();
      this.router.navigateByUrl('/home');
    }, err => {
      this.loginError = err.error.data;
      console.log(err.error.data);
    });
  }
}
