import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { AuthService } from './login-register/auth.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medheight';
  poppedProduct: any;

  constructor(
    public authservice: AuthService,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.product.subscribe(result => {
       this.poppedProduct = result;
       console.log(this.poppedProduct);
      });
  }
}
