import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerId: number; // the customer id
  customer; // the customer object
  addresses = []; // array of address of the customer
  cartProducts = []; // array of products from the localstorage
  hasAddress = true;  // toggled to false if the user has no address yet
  selectedAdd: string; // stores the selected address of customer for delivery
  totalCost = 0 || JSON.parse(localStorage.getItem('cart')).totalCost;
  constructor(private custService: CustomerService, private addService: AddressService) { }

  ngOnInit(): void {
    // fetch the customer id from local storage
    this.customerId = +localStorage.getItem('customerId') - 21;
    this.custService.getACustomer(this.customerId).subscribe(result => {
        this.customer = result.data;
    }, err => {
      console.log(err);
    });
    // fetch the addresses of customer from local storage
    this.addService.getCustomerAddresses(this.customerId).subscribe(result => {
      if (result.data.length === 0){
        this.hasAddress = false;
      }else {
        this.hasAddress = true;
        this.addresses = result.data;
      }
    }, err => {
      console.log(err);
    });
    // load cart product into an array
    this.fetchLocalStorageCart();
  }

  displayAddress(evt): any {
    const addr = this.addresses.find((add) => {
      return add.address_id === +evt.target.value;
    });
    this.selectedAdd = addr.full_address;
  }

  fetchLocalStorageCart(): void {
    this.cartProducts = [];
    const productObj = JSON.parse(localStorage.getItem('cart')).products;
    const productObjKeys = Object.keys(productObj);
    productObjKeys.forEach((value) => {
      // get the obj with the name
      const element = productObj[value];
      // tslint:disable-next-line: no-string-literal
      element['productName'] = value;
      // tslint:disable-next-line: no-string-literal
      element['totalCost'] = element.cost * element.quantity;
      this.cartProducts.push(element);
    });
  }
}
