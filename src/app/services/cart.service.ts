import { BehaviorSubject } from 'rxjs';
import { CartProduct } from './../models/cartProduct.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProductEmitter = new BehaviorSubject([]);
  cummlativeCartProductsEmitter = new BehaviorSubject({ products: {}, totalQuantity: 0, totalCost: 0 });
  addedProductList = { products: {}, totalQuantity: 0, totalCost: 0 };

  constructor(private http: HttpClient) {
    // updates the cart to the existing list in the local storage if any
    const storedCart = localStorage.getItem('cart');
    if (storedCart !== null) {
      this.addedProductList = JSON.parse(storedCart);
    }
  }

  addToCart(obj): void {
    console.log('add to cart got called before click');
    const newObj: CartProduct = { product_id: obj.product_id, cost: obj.price,
      quantity: obj.quantity || 1, product_image: obj.product_image };
    const intoList = [obj.product_name, newObj];
    this.cartProductEmitter.next(intoList);
  }
  calculateTotalQtyAndCost(): void {
    console.log('calculateTotalQtyAndCost got called before click');
    let qtyacc = 0;
    let totalCost = 0;
    const keys = Object.keys(this.addedProductList.products);
    console.log(keys);
    if (keys.length > 1) {
      console.log('lopping starts');
      for (const p in this.addedProductList.products) {
        if (this.addedProductList.products[p] !== undefined) {
          qtyacc += this.addedProductList.products[p].quantity;
          totalCost += this.addedProductList.products[p].cost;
        }
      }
      console.log('lopping ends');
      this.addedProductList.totalCost = totalCost;
      this.addedProductList.totalQuantity = qtyacc;
      console.log(this.addedProductList);
    }
    const storedCart = JSON.stringify(this.addedProductList);
    localStorage.setItem('cart', storedCart);
    this.cummlativeCartProductsEmitter.next(this.addedProductList);
  }

  deleteFromCart(obj): void {
    // tslint:disable-next-line: no-string-literal
    delete this.addedProductList.products[obj['productName']];
    // tslint:disable-next-line: no-string-literal
    this.addedProductList.totalCost -= obj['cost'];
    // tslint:disable-next-line: no-string-literal
    this.addedProductList.totalQuantity -= obj['quantity'];
    this.calculateTotalQtyAndCost();
    console.log(this.addedProductList);
  }
}
