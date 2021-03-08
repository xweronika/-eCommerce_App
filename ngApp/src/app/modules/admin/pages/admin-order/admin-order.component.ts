import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService, OrderStatus, Order } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  statuses = Object.keys(OrderStatus); // same klucze czyli: ["order_placed", "order_confirmed",
  orderStatuses = OrderStatus; // klucze z warosciami np order_confirmed = 'Zamówienie potwierdzone'
  orders: Order[];
  error: string;
  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe(
        res => this.orders = [...res].reverse(),
        err => this.error = err.error,
      );
  }

}
