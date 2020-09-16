import { FormsModule } from '@angular/forms';
import { MyaccountComponent } from './myaccount.component';
import { RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerprofileComponent } from './customerprofile/customerprofile.component';
import { AddressEditComponent } from './address-edit/address-edit.component';



@NgModule({
  declarations: [
    OrdersComponent,
    AddressComponent,
    CustomerprofileComponent,
    AddressEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
