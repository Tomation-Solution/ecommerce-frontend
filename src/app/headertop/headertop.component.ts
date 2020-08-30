import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login-register/auth.service';

@Component({
  selector: 'app-headertop',
  templateUrl: './headertop.component.html',
  styleUrls: ['./headertop.component.css']
})
export class HeadertopComponent implements OnInit {
  username = '' || localStorage.getItem('username');
  userIsLoggedIn = localStorage.getItem('token') ? true : false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.authService.Customer.subscribe(result => {
      console.log('username has been updated ', result);
      if (result.length !== 0) {
        // [boolean, username] is returned from observable if logged in or [boolean] if not
        if (result.length > 1) {
          this.userIsLoggedIn = result[0];
          this.username = result[1];
          return;
        }
        this.userIsLoggedIn = result[0];
        this.username = result[1];
      }
    });
  }

  logout(): void {
   // clear the entire local storage
   this.authService.logOutVendor();
   // emit a trigger to update the username
   this.authService.customerIsLoggedIn();
   // emit a trigger to update the cart
   this.cartService.addedProductList =  { products: {}, totalQuantity: 0, totalCost: 0 };
   this.cartService.calculateTotalQtyAndCost();
   // emit a trigger to update the total cost and quantity
   // redirect to the home page
  }
}
