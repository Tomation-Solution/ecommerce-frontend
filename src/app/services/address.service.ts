import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  public baseUrl = environment.backEndUrl;
  private customerAddressUrl = this.baseUrl + '/addresses';
  constructor(private http: HttpClient) { }

  getCustomerAddresses(): Observable<any> {
    return this.http.get(this.customerAddressUrl);
  }

  addNewAddress(address: object): Observable<any> {
    return this.http.post(this.customerAddressUrl, address);
  }
  updateAnAddress(id: number, newAddress: any): Observable<any> {
    return this.http.patch(this.customerAddressUrl + '/' + id, newAddress);
  }
}
