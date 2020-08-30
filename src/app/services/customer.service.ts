import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.backEndUrl;
  private getACustomerUrl = this.baseUrl + '/customers/';
  constructor(private http: HttpClient) { }

  getACustomer(customerId: number): Observable<any>{
    return this.http.get(this.getACustomerUrl + customerId);
  }
}
