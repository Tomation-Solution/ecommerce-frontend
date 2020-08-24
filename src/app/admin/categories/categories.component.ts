import { CategoryServiceService } from './../../services/category-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoryList = [];
  productImageUrl = 'http://127.0.0.1:5000/static';
  products = [];
  constructor(private catService: CategoryServiceService) { }

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(result => {
      this.categoryList = result.data;
    }, err => {
      this.categoryList = ['THERE WAS ISSUE FETCHING ALL CATEGORIES, PLEASE REFRESH TO TRY AGAIN'];
    });
  }

  // fetch all products for a single category
  getProductsForCat(category: string): any {
    console.log(category);
    this.catService.getProductsForACategory(category).subscribe(result => {
      if (result.data !== []) {
        this.products = result.data;
        return;
      }
      console.log(this.products);
    }, err => {});
  }
}
