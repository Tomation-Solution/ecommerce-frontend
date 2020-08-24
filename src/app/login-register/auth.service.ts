import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loggedInVendor: any;
  CustomerDetails = {data: { }, isLoggedIn: false};
  public username = new BehaviorSubject('');
  private baseUrl = 'http://ecommerce-backend.eba-psj2dvdx.us-west-2.elasticbeanstalk.com';
  private vendorLoginUrl = this.baseUrl + '/vendor/login';
  private customerRegistratinUrl = this.baseUrl + '/customers/registration';


  constructor(private httpclient: HttpClient) { }

  logInVendor(data): Observable<any>{
    return this.httpclient.post(this.vendorLoginUrl, data);
  }
  getUsername(): string {
    return sessionStorage.getItem('username');
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  logOutVendor(): void {
    sessionStorage.clear();
  }

  registerCustomer(data): Observable<any> {
    return this.httpclient.post(this.customerRegistratinUrl, data);
  }
}
