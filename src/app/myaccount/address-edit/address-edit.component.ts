import { ToastService } from './../../services/toastr.service';
import { NgForm } from '@angular/forms';
import { AddressService } from './../../services/address.service';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {
  @Input() address: any;
  notEditMode = true;
  addr;
  constructor(private addrService: AddressService, private notification: ToastService) { }

  ngOnInit(): void {
    this.addr = this.address.full_address;
  }
  editAddress(): void {
    this.notEditMode = !this.notEditMode;
  }
  updateAddress(): void {
    console.log(this.addr);
    const data = { full_address: this.addr};
    this.addrService.updateAnAddress(this.address.address_id, data).subscribe(result => {
      if (result.status === 'success') {
        this.notEditMode = !this.notEditMode;
        this.notification.successmsg('Address Updated successfully');
      }
    }, err => console.log(err));
  }
}
