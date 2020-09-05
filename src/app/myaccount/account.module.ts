import { MyaccountComponent } from './myaccount.component';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';



@NgModule({
  declarations: [
    OrdersComponent,
    AddressComponent,
    CustomerprofileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: MyaccountComponent,
        children: [
          { path: 'profile', component: CustomerprofileComponent },
          { path: 'address', component: AddressComponent },
          { path: 'orders', component: OrdersComponent },
        ]
      },

    ])
  ]
})
export class AccountModule { }
