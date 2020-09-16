import { ToastService } from './../../services/toastr.service';
import { Router } from '@angular/router';
import { AddressService } from './../../services/address.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  allAddresses: object[];
  notAddMode = true;
  isLoading = false;
  newAddr = '';
  constructor(private addressService: AddressService,
              private router: Router,
              private notification: ToastService) { }

  ngOnInit(): void {
    this.fetchCustomerAddress();
  }
  addAddress(): void {
    this.notAddMode = !this.notAddMode;
  }
  addNewAddress(): void {
    const data = { full_address: this.newAddr.trim() };
    this.isLoading = true;
    this.addressService.addNewAddress(data).subscribe(result => {
      this.isLoading = false;
      this.notification.successmsg('New Address Added');
    }, err => console.log(err));
  }
  fetchCustomerAddress(): void {
    this.addressService.getCustomerAddresses().subscribe(result => {
      this.allAddresses = result.data;
    }, err => console.log(err));
  }

}
