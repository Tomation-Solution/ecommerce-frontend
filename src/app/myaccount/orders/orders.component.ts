import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  customerOrders;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // get all orders
    this.orderService.getAllOrdersForCustomer().subscribe(result => {
      this.customerOrders = result.data;
      console.log(this.customerOrders);
    }, err => console.log(err));
  }

}
