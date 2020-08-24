import { Category } from './category.model';
import { CategoryServiceService } from './../../services/category-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  catId: number;
  updateOrAdd: string;
  updateErr = '';
  Category = new Category();
  constructor(private route: ActivatedRoute,
              private catService: CategoryServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.catId = +paramMap.get('category_id');
      // check if id is not a number, redirect to categories
      if (isNaN(this.catId)) {
        this.router.navigate(['admin', 'dashboard', 'categories']);
      }
      // if category id is 0, sets categoryname to empty string
      if (this.catId === 0) {
        // sets the html input to empty and update the button to 'Add'
        this.Category.categoryName = '';
        this.updateOrAdd = 'Add';
      } else {
        // update the button to 'Upate'
        this.updateOrAdd = 'Update';
        this.catService.getASingleCategory(this.catId).subscribe(result => {
          this.Category.categoryName = result.data.category_name;
        }, err => {

        });
      }
    });

  }

  updateOrAddCat(form: NgForm): void {
    const data = { category_name: form.value.categoryName };
    // if category is not zero, then update is performed
    if (this.catId !== 0){
      this.catService.updateACategory(this.catId, data).subscribe(result => {
      this.router.navigate(['admin', 'dashboard', 'categories']);
      return;
    }, err => {
      this.updateErr = 'There was an error updating';
    });
    }
    // else a new category is added
    this.catService.addNewCategory(data).subscribe(result => {
      this.router.navigate(['admin', 'dashboard', 'categories']);
    }, err => {
      this.updateErr = 'There was an error adding new category';
    });
  }

}
