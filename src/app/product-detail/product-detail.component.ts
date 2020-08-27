import { ProductService } from './../services/product.service';
import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product;
  quantity = 1;
  imageStorageUrl = this.productService.baseUrl;
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.productService.getAProduct(id).subscribe(result => {
     this.product = result.data;
   });

  }

  addToCartProduct(): void {
    // console.log(this.quantity);
    this.product.quantity = +this.quantity;
    // console.log(this.product);
    this.cartService.addToCart(this.product);
  }

}
