import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  updateOrderTrigger = new BehaviorSubject({order_id: 0, ref: '', trans_ref: ''});
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
    const formUrl = this.updateOrderUrl + orderid;
    console.log(formUrl);
    console.log(orderDetails);
    return this.http.patch(formUrl, orderDetails);
  }
  getAllOrdersForCustomer(): Observable<any> {
    return this.http.get(this.customerOrderUrl);
  }
}
