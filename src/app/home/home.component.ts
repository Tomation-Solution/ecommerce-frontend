import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mostViewed = [];
  featuredProducts = []; //stores the first 4 products
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
        // fetch the top most viewed products
        this.productService.getMostViewed().subscribe(result => {
         if (result.data !== []) {
          this.mostViewed = result.data.slice(0, 4);
         }
        });
  }

}
