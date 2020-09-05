import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private customerOrderUrl = environment.backEndUrl + '/customers/orders';
  private paymenttypeUrl = environment.backEndUrl + '/vendor/paymenttype';
  private updateOrderUrl = environment.backEndUrl + '/customer/orders/';
  constructor(private http: HttpClient) { }

  getAllPaymentType(): Observable<any> {
    return this.http.get(this.paymenttypeUrl);
  }
  postAnOrder(orderDetails): Observable<any> {
    return this.http.post(this.customerOrderUrl, orderDetails);
  }
  updateAnOrder(orderid: number, orderDetails): Observable<any> {
    return this.http.patch(this.updateOrderUrl + orderid, orderDetails);
  }
}
