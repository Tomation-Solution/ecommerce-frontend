import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Orders } from './../models/order.model';
import { NgForm } from '@angular/forms';
import { OrderService } from './../services/order.service';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../services/address.service';

declare let PaystackPop: any; // declare moment
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
  paymentTypeList: [] = []; // stores all payment type list
  totalCost = 0 || JSON.parse(localStorage.getItem('cart')).totalCost;
  orders: Orders = {};
  constructor(
    private custService: CustomerService,
    private addService: AddressService,
    private orderSevice: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    // fetch the customer id from local storage
    this.customerId = +localStorage.getItem('customerId');
    this.custService.getACustomer(this.customerId).subscribe(result => {
      this.customer = result.data;
    }, err => {
      console.log(err);
    });

    // fetch all payment type
    this.orderSevice.getAllPaymentType().subscribe(result => {
      this.paymentTypeList = result.data;
    });
    // fetch the addresses of customer from local storage
    this.addService.getCustomerAddresses().subscribe(result => {
      if (result.data.length === 0) {
        this.hasAddress = false;
      } else {
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
    this.orders.address_id = +evt.target.value;
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
  getPaymentType(evt): void {
    // add the id of the payment type to the orders object
    this.orders.paymenttype_id = +evt.target.value;
    // listen to the click event
    document.querySelector('#makeOrder').addEventListener('click', (): void => {
      const productToOrder = JSON.parse(JSON.stringify(this.cartProducts));
      productToOrder.forEach((item) => {
        delete item.productName;
        delete item.product_image;
        delete item.totalCost;
      });
      this.orders.orders = productToOrder;
      if (this.orders.paymenttype_id === 1) {
        // store the order in the back end and route to the order page
        this.orderSevice.postAnOrder(this.orders).subscribe(result => {
          alert('order recieved successfully');
          this.router.navigateByUrl('/account/orders');
        }, err => console.log(err));
      } else if (this.orders.paymenttype_id === 2) {
        // store the order in the back end and route to the order page
        this.orderSevice.postAnOrder(this.orders).subscribe(result => {

          // pop up the payment gateway to make payment
          const totalCost = JSON.parse(localStorage.getItem('cart')).totalCost;
          const handler = PaystackPop.setup({
            key: environment.publicKey,
            email: localStorage.getItem('email'),
            amount: +totalCost * 100,
            currency: 'NGN',
            firstname: localStorage.getItem('username'),
            lastname: '',
            // label: "Optional string that replaces customer email"
            metadata: {
              custom_fields: [
                {
                  display_name: '',
                  variable_name: '',
                  value: ''
                }
              ]
            },
            callback: (response) => {
              // upon successful payment, update the order with the referenceid and transactionid
              this.orderSevice.updateAnOrder(result.data.order_id, {
                paid: 1,
                transaction_id: response.reference,
                transaction_reference: response.transaction
              }).subscribe(resp => {
                console.log(resp);
                this.router.navigateByUrl('/account/orders');
              }, err => console.log(err));
            },
            onClose: () => {
              alert('Payment not made');
            }
          });
          handler.openIframe();
        }, err => console.log(err));


      }
    });
  }

  // makeOrder(): void {
  //   const productToOrder = JSON.parse(JSON.stringify(this.cartProducts));
  //   productToOrder.forEach((item) => {
  //     delete item.productName;
  //     delete item.product_image;
  //     delete item.totalCost;
  //   });
  //   this.orders.orders = productToOrder;

  //   // check if paymenttype_id = 1; which is pay on delivery
  //   if (this.orders.paymenttype_id === 1) {
  //     // store the order in the back end and route to the order page
  //     this.orderSevice.postAnOrder(this.orders).subscribe(result => {
  //       alert('order recieved successfully');
  //       this.router.navigateByUrl('/account/orders');
  //     }, err => console.log(err));
  //   }
  // }

  // payWithPaystack(): void {
  //   const handler = PaystackPop.setup({
  //     key: 'pk_test_5e81564ee0d4a3d7a44615950df5ef74e35c79e1',
  //     email: 'customer@email.com',
  //     amount: 100000,
  //     currency: 'NGN',
  //     firstname: 'Taiwo',
  //     lastname: 'King',
  //     // label: "Optional string that replaces customer email"
  //     metadata: {
  //       custom_fields: [
  //         {
  //           display_name: 'kazeem',
  //           variable_name: 'mobile_number',
  //           value: '+2348012345678'
  //         }
  //       ]
  //     },
  //     callback: (response) => {
  //       console.log(response)
  //       alert('success. transaction ref is ' + response.reference);
  //     },
  //     onClose: () => {
  //       alert('window closed');
  //     }
  //   });
  //   handler.openIframe();
  // }
}
