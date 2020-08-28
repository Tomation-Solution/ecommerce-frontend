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
  CustomerDetails = {data: { }, isLoggedIn: false};
  public username = new BehaviorSubject('');
  private baseUrl = environment.backEndUrl;
  private vendorLoginUrl = this.baseUrl + '/vendor/login';
  private customerRegistratinUrl = this.baseUrl + '/customers/registration';


  constructor(private httpclient: HttpClient) { }

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

  registerCustomer(data): Observable<any> {
    return this.httpclient.post(this.customerRegistratinUrl, data);
  }
}
