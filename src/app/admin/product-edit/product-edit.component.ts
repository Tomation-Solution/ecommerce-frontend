import { CategoryServiceService } from './../../services/category-service.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../products/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, AfterViewInit {
  selectedFile = null;
  productId = 0;
  updateOrAdd: string;
  uploadHasError = false;
  allCategories = [];
  productForm: FormGroup;
  product: Product = new Product();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private catService: CategoryServiceService) { }

  ngOnInit(): void {
    // sets the html inputs to empty and update the button to 'Add'
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productImage: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [0, Validators.required],
      stockQuantity: [0, Validators.required],
      price: [0, Validators.required],
      manufacturer: ['', Validators.required]
    });
    // fetch the product id from the parameters
    this.route.paramMap.subscribe(paramMap => {
      this.productId = +paramMap.get('product_id');
      // check if id is not a number, redirect to categories
      if (isNaN(this.productId)) {
        this.router.navigate(['admin', 'dashboard', 'products']);
      }
      // if category id is 0, instantiate an empty form
      if (this.productId === 0) {
        this.productForm = this.fb.group({
          productName: ['', [Validators.required, Validators.minLength(3)]],
          productImage: ['', Validators.required],
          description: ['', Validators.required],
          categoryId: [0, Validators.required],
          stockQuantity: [0, [Validators.required, Validators.min(0)]],
          price: [0, [Validators.required, Validators.min(3)]],
          manufacturer: ['', Validators.required]
        });
        this.updateOrAdd = 'Add';
      } else {
        // update the button to 'Upate'
        this.updateOrAdd = 'Update';
        this.productService.getAProduct(this.productId).subscribe(result => {
          if (result.status !== 'error') {
            this.productForm.patchValue({
              productName: result.data.product_name,
              description: result.data.description,
              categoryId: result.data.category_id,
              stockQuantity: result.data.stock_quantity,
              price: result.data.price,
              manufacturer: result.data.manufacturer
            });
            return;
          }
          this.router.navigate(['admin', 'dashboard', 'products']);
        }, err => {
          this.router.navigate(['admin', 'dashboard', 'products']);
        });
      }
    });
  }
  ngAfterViewInit(): void {
    this.catService.getAllCategories().subscribe(result => {
      this.allCategories = result.data;
    });
  }

  updateOrAddProduct(): void {
    document.querySelector('.productAddButton').innerHTML = 'Please wait...';
    const fd = new FormData();
    fd.append('product_name', this.productForm.value.productName);
    fd.append('product_image', this.selectedFile);
    fd.append('description', this.productForm.value.description);
    fd.append('category_id', this.productForm.value.categoryId);
    fd.append('stock_quantity', this.productForm.value.stockQuantity);
    fd.append('price', this.productForm.value.price);
    fd.append('manufacturer', this.productForm.value.manufacturer);

    this.productService.addAProduct(fd).subscribe(result => {
      this.router.navigate(['admin', 'dashboard', 'products']);
    }, err => {
      this.router.navigate(['admin', 'dashboard', 'products', 0]);
      this.uploadHasError = true;
    });
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0] as File;
  }
}
