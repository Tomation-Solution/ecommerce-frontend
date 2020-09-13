import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryProduct = [];
  categoryName: string;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params.name;
      console.log(this.categoryName);

      this.productService.getProductsByCategory(this.categoryName).subscribe(result => {
        this.categoryProduct = result.data;
        console.log(this.categoryProduct);
      }, err => console.log(err));

    });
  }

}
