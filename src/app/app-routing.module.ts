import { AccessGuard } from './login-register/access.guard';
import { NotFound404Component } from './not-found404/not-found404.component';
import { CategoryComponent } from './category/category.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(admin => admin.AdminModule)},
  { path: 'home', component: HomeComponent},
  { path: 'cart/:orderId', component: CartComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'category/:name', component: CategoryComponent},
  { path: 'login', component: LoginRegisterComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AccessGuard]},
  { path: 'register', component: LoginRegisterComponent},
  { path: 'account', loadChildren: () => import('./myaccount/account.module').then(account => account.AccountModule)},
  { path: '**', component: NotFound404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
