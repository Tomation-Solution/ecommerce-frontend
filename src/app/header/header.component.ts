import { AuthService } from './../login-register/auth.service';
import { CartService } from './../services/cart.service';
import { CategoryServiceService } from './../services/category-service.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allCategories = [];
  imageStorageUrl;
  totalQty = 0;
  totalCost = 0;
  userIsLoggedIn = localStorage.getItem('token') ? true : false;
  cartProducts = [];
  constructor(
    private catService: CategoryServiceService,
    private cartService: CartService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.Customer.subscribe(result => {
      this.userIsLoggedIn = result[0];
    });
    $('.category-toggle').on('click', () => {
      $('.category-menu').slideToggle();
    });
    $('.cart-total-price').on('click', () => {
      $('.cart-list').slideToggle();
    });
    $('.mini-cart-btn').on('click', () => {
      $('.cart-list').slideToggle();
    });

    // fetches all categorys
    this.catService.getAllCategories().subscribe(result => {
      this.allCategories = result.data;
    }, err => { });

    // subscribe for total quantity and cost
    this.cartService.cummlativeCartProductsEmitter.subscribe(result => {
      this.totalQty = result.totalQuantity;
      this.totalCost = result.totalCost;
    });
    // sets the default image url
    this.imageStorageUrl = this.catService.baseUrl;

    // update the cart when a product is added
    this.cartService.cartProductEmitter.subscribe(result => {
      // insert the product into the object using its name as key and its details as value
      // tslint:disable-next-line: no-string-literal
      const productName = result[0];
      if (this.cartService.addedProductList.products[productName] !== undefined) {
        this.cartService.addedProductList.products[productName].quantity += result[1].quantity;
      } else {
        this.cartService.addedProductList.products[productName] = result[1];
      }
      this.cartService.calculateTotalQtyAndCost();
    });
  }

  fetchLocalStorageCart(): void {
    this.cartProducts = [];
    const storedCart = localStorage.getItem('cart');
    if (storedCart !== null && storedCart !== '') {
      const productObj = JSON.parse(storedCart).products;
      const productObjKeys = Object.keys(productObj);
      productObjKeys.forEach((value) => {
        // get the obj with the name
        const element = productObj[value];
        // tslint:disable-next-line: no-string-literal
        element['productName'] = value;
        this.cartProducts.push(element);
      });
    }
  }

  removeFromCart(obj): void {
    // tslint:disable-next-line: no-string-literal
    this.cartService.deleteFromCart(obj);
    console.log(obj);
  }
}
