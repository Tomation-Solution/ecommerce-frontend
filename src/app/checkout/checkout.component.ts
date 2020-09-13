import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Orders } from './../models/order.model';
import { NgForm } from '@angular/forms';
import { OrderService } from './../services/order.service';
import { CustomerService } from './../services/customer.service';
import { Component, OnInit, NgZone } from '@angular/core';
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
    private orderService: OrderService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    // fetch the customer id from local storage
    this.customerId = +localStorage.getItem('customerId');
    this.custService.getACustomer(this.customerId).subscribe(result => {
      this.customer = result.data;
    }, err => {
      console.log(err);
    });
    // subscribe to order update triggered upon successful payment
    this.orderService.updateOrderTrigger.subscribe(result => {
      console.log(result)
      if (result.order_id !== 0) {
        this.orderService.updateAnOrder(result.order_id, {
          status: 'delivered',
          paid: 1,
          transaction_id: result.ref,
          transaction_reference: result.trans_ref
        }).subscribe(res => {
          this.router.navigateByUrl('/account/orders');
        }, err => console.log(err));
      }
    });
    // fetch all payment type
    this.orderService.getAllPaymentType().subscribe(result => {
      this.paymentTypeList = result.data;
    });
    // fetch the addresses of customer from local storage
    this.addService.getCustomerAddresses().subscribe(result => {
      if (result.data.length === 0) {
        this.hasAddress = false;
      } else {
        this.hasAddress = true;
        this.addresses = result.data;
        // if only one address is avaible show it
        if (this.addresses.length > 0) {
          this.selectedAdd = this.addresses[0].full_address;
          this.orders.address_id = this.addresses[0].address_id;
        }
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
      // get all the product from the localstorage and add them to order object
      const productToOrder = JSON.parse(JSON.stringify(this.cartProducts));
      productToOrder.forEach((item) => {
        delete item.productName;
        delete item.product_image;
        delete item.totalCost;
      });
      this.orders.orders = productToOrder;
      // check the payment type for chosen by a user
      if (this.orders.paymenttype_id === 1) {
        console.log(this.orders);
        // store the order in the back end and route to the order page
        this.orderService.postAnOrder(this.orders).subscribe(result => {
          alert('order recieved successfully');
          this.router.navigateByUrl('/account/orders');
        }, err => console.log(err));
      } else if (this.orders.paymenttype_id === 2) {
        // if the user intend paying directly
        // store the order in the back end and route to the order page
        this.orderService.postAnOrder(this.orders).subscribe(result => {

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
              const orderData = {
                order_id: result.data.order_id,
                ref: response.reference,
                trans_ref: response.transaction
              };
              this.ngZone.run(() => {
                this.orderService.updateOrderTrigger.next(orderData);
              });
            },
            onClose: () => {
              alert('Payment has been cancelled!');
              this.ngZone.run(() => this.router.navigateByUrl('/account/orders'));
            }
          });
          handler.openIframe();
        }, err => console.log(err));
      }
    });
  }
}
