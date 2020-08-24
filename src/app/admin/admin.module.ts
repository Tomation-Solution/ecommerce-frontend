import { ProductsComponent } from './products/products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    CategoriesComponent,
    ProfileComponent,
    ProductEditComponent,
    CategoryEditComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
