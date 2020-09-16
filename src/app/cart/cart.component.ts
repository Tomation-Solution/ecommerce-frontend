import { AuthService } from './../login-register/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartDetails = []; // hold a list of all products in an order
  imageStorageUrl; // holds the base url
  totalCost; // holds the value for the totalcost
  userIsLoggedIn;
  hideCheckoutButton = false;
  deleteNotifier = new BehaviorSubject([]);
  constructor(private cartService: CartService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsLoggedIn = this.authService.UserIsLoggedIn();
    this.imageStorageUrl = this.productService.baseUrl;
    const id = +this.route.snapshot.params.orderId;
    this.deleteNotifier.subscribe(res => {
      // if the id is not a number or negative
      if (id < 0 || isNaN(id)) {
        this.router.navigateByUrl('/404-not-found');
      } else if (id === 0) {
        // if id is zero, then fetches the cart products from local storage
        this.fetchFromLocalStorage();
      } else {
        this.hideCheckoutButton = true;
        // fetches the cart products from api
        this.fetchFromApi(id);
      }
    });
  }

  addEachProductTotalCost(): void {
    this.cartDetails.forEach((product) => {
      const totalCost = product.quantity * product.cost;
      // tslint:disable-next-line: no-string-literal
      product['totalcost'] = totalCost;
    });
    console.log(this.cartDetails);
  }

  removeProduct(obj): void {
    this.cartService.deleteFromCart(obj);
    // notify the subscriber to refetch data from source
    this.deleteNotifier.next([]);
  }

  fetchFromLocalStorage(): void {
    this.totalCost = 0 || JSON.parse(localStorage.getItem('cart')).totalCost;
    this.cartDetails = this.cartService.fetchLocalStorageProducts();
    this.addEachProductTotalCost();
  }
  fetchFromApi(id: number): void {
    // fetches the data from the api
    this.orderService.getOrderDetails(id).subscribe(result => {
      this.cartService.addedProductList.products = {};
      // convert tot the formart stored in the localstorage
      result.data.forEach((data) => {
        data.product_image = data.productDetails.product_image;
        data.product_name = data.productDetails.product_name;
        delete data.productDetails;
        delete data.order_id;
        this.cartService.addedProductList.products[data.product_name] = data;
        delete data.product_name;
      });
      // update the cart with the total cost and quantity
      this.cartService.calculateTotalQtyAndCost();
      this.fetchFromLocalStorage();
    }, err => console.log(err));
  }
  checkout(): void {
    const id = +this.route.snapshot.params.orderId;
    if (id === 0) {
      if (this.authService.UserIsLoggedIn()) {
        this.router.navigateByUrl('/checkout');
      } else {
        this.router.navigateByUrl('/login');
      }
    }
  }
}
