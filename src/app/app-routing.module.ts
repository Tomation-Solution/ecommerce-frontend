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
  { path: 'cart', component: CartComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'login', component: LoginRegisterComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'register', component: LoginRegisterComponent},
  { path: 'account', loadChildren: () => import('./myaccount/account.module').then(account => account.AccountModule)},
  { path: '**', component: LoginRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
