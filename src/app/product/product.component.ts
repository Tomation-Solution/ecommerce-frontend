import { ProductService } from './../services/product.service';
import { Product } from './../admin/products/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  popUpProduct(): void{
    this.productService.product.next(this.product);
  }
}
