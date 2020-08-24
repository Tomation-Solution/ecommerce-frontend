import { AdminDeactivateGuard } from './admin-deactivate.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { AdminGuardGuard } from './admin-guard.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';


const adminRoutes: Routes = [
  {path: '', component: AdminLoginComponent},
  {path: 'dashboard', component: AdminDashboardComponent,
  canActivate: [AdminGuardGuard],
  children: [
    {path: '', redirectTo: 'categories', pathMatch: 'full'},
    {path: 'categories', component: CategoriesComponent},
    {path: 'categories/:category_id', component: CategoryEditComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:product_id', component: ProductEditComponent},
    {path: 'profile', component: ProfileComponent}
  ]}
];


@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
