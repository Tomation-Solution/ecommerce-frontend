import { Customer } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loggedInVendor: any;
  CustomerDetails = {isLoggedIn: false};
  public Customer = new BehaviorSubject([]);
  private baseUrl = environment.backEndUrl;
  private vendorLoginUrl = this.baseUrl + '/vendor/login';
  private customerLoginUrl = this.baseUrl + '/customers/login';
  private customerRegistratinUrl = this.baseUrl + '/customers/registration';


  constructor(private httpclient: HttpClient) {
  }

  logInVendor(data): Observable<any>{
    return this.httpclient.post(this.vendorLoginUrl, data);
  }
  getUsername(): string {
    return localStorage.getItem('username');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logOutVendor(): void {
    localStorage.clear();
  }

  UserIsLoggedIn(): boolean {
    if(localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  registerCustomer(data): Observable<any> {
    return this.httpclient.post(this.customerRegistratinUrl, data);
  }
  loginCustomer(data): Observable<any> {
    return this.httpclient.post(this.customerLoginUrl, data);
  }
  customerIsLoggedIn(): any {
    console.log('logged out vendor got called');
    if (localStorage.getItem('token') !== null) {
      console.log('username is true');
      this.Customer.next([true, localStorage.getItem('username')]);
      return;
    }
    console.log('username is false');
    this.Customer.next([false, '']);
  }
}
