import { Customer, Customers } from './../../models/user.model';
import {ToastService} from './../../services/toastr.service';
import { CustomerService } from './../../services/customer.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerprofile',
  templateUrl: './customerprofile.component.html',
  styleUrls: ['./customerprofile.component.css']
})
export class CustomerprofileComponent implements OnInit {
  customerDetails = new Customers('', '', '', '', '', '');
  constructor(private customerService: CustomerService,
              private notification: ToastService) { }

  ngOnInit(): void {
    const customerId = +localStorage.getItem('customerId');
    this.customerService.getACustomer(customerId).subscribe(result => {
      this.customerDetails.firstName = result.data.firstname,
      this.customerDetails.lastName = result.data.lastname,
      this.customerDetails.email = result.data.email,
      this.customerDetails.phoneNumber = result.data.phone_number,
      console.log(this.customerDetails);
    }, err => console.log(err));
  }

  update(loginForm: NgForm): void {
    delete loginForm.value.cpassword;
    console.log(loginForm.value);
    this.customerService.updateACustomer(loginForm.value).subscribe(result => {
      console.log(result.data);
      this.notification.infomsg('Profile Updated successfully');
    }, err => {
      console.log(err);
      this.notification.warningmsg('Unable to update Profile');
    });
  }
}
