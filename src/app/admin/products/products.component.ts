import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  imageStorageUrl = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.imageStorageUrl = this.productService.baseUrl;
    this.productService.getAllProducts().subscribe(result => {
      this.products = result.data;
    });
  }

}
