import { environment } from './../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product = new BehaviorSubject({});
  public baseUrl = environment.backEndUrl;
  private getAProductUrl = this.baseUrl + '/product/id';
  private addAProductUrl = this.baseUrl + '/products';
  private mostViewedUrl = this.baseUrl + '/products?type=mostviewed';
  private categoryProductUrl = this.baseUrl + '/products?category=';
  constructor(private http: HttpClient) { }

  getAllProducts(): any {
    return this.http.get(this.addAProductUrl);
  }
  getAProduct(productId: number): any {
    const url = this.getAProductUrl.replace('id', productId.toString(10));
    return this.http.get(url);
  }
  updateAProduct(productId: number, productObj: FormData): any {
    const url = this.getAProductUrl.replace('id', productId.toString(10));
    return this.http.patch(url, productObj);
  }
  addAProduct(productObj: FormData): any {
    return this.http.post(this.addAProductUrl, productObj);
  }
  getMostViewed(): any{
    return this.http.get(this.mostViewedUrl);
  }
  getProductsByCategory(name: string): Observable<any> {
    const url = this.categoryProductUrl + name;
    return this.http.get(url);
  }
}
