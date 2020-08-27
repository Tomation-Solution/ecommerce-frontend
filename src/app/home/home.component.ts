import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostViewed = []; // stores the most viewed products
  bestSellers = []; // stores an array of most sold products
  featuredProducts = []; // stores the first 4 products
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    // fetch the top most viewed products
    this.productService.getMostViewed().subscribe(result => {
      if (result.data !== []) {
        this.mostViewed = result.data.slice(0, 4);
      }
    });

    // fetch all products and shuffle it
    this.productService.getAllProducts().subscribe(result => {
      // gets the array of products
      let arr = result.data;
      // shuffle the array of products
      arr = this.shuffleProductsList(arr);
      // get the top 4
      // use the top 4 in template
      this.featuredProducts = arr.slice(0, 4);
      this.bestSellers = arr.slice(5, 9);
    });

  }

  shuffleProductsList(arr): [] {
    return arr.sort(() => {
      // tslint:disable-next-line: no-unused-expression
      Math.random() - 0.5;
    });
  }

}
