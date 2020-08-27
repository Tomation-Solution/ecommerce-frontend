import { CartService } from './../services/cart.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  imageStorageUrl;
  outOfStock = true;
  @Input() product;
  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.imageStorageUrl = this.productService.baseUrl;
    this.checkOutOfStock();
  }

  popUpProduct(): void{
    this.productService.product.next(this.product);
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  checkOutOfStock(): void {
    if (this.product.stock_quantity > 0) {
      this.outOfStock = false;
    }
  }
}
