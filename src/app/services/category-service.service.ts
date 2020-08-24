import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  public baseUrl = 'http://ecommerce-backend.eba-psj2dvdx.us-west-2.elasticbeanstalk.com/';
  private allCategoriesUrl = this.baseUrl + 'vendor/categories';
  private allProductsForACatUrl = this.baseUrl + 'products?category=category_name';
  private getASingleCategoryUrl = this.baseUrl + 'vendor/categories/';
  private updateACategoryUrl = this.baseUrl + 'vendor/categories/';
  constructor(private http: HttpClient) { }

  getAllCategories(): any{
    return this.http.get(this.allCategoriesUrl);
  }
  getProductsForACategory(category: string): any {
    // replace hard written category_name with the inserted category from parameters
    const formUrl = this.allProductsForACatUrl.replace('category_name', category);
    return this.http.get(formUrl);
  }
  getASingleCategory(categoryId: number): any {
    // append the category id to the endpoint to form the full url
    const formUrl = this.getASingleCategoryUrl + categoryId;
    return this.http.get(formUrl);
  }
  updateACategory(categoryId: number, categoryObj): any {
    // update a category name
    const formUrl = this.updateACategoryUrl + categoryId;
    return this.http.patch(formUrl, categoryObj);
  }
  addNewCategory(categoryObj): any {
    return this.http.post(this.allCategoriesUrl, categoryObj);
  }
}
