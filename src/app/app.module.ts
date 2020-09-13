import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './token-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HomeComponent } from './home/home.component';

import { MyaccountComponent } from './myaccount/myaccount.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminModule } from './admin/admin.module';
import { HeadertopComponent } from './headertop/headertop.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { NotFound404Component } from './not-found404/not-found404.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadertopComponent,
    HeaderComponent,
    LoginRegisterComponent,
    HomeComponent,
    MyaccountComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailComponent,
    ProductComponent,
    CategoryComponent,
    NotFound404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AdminModule,
  ],
  exports: [HeadertopComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
