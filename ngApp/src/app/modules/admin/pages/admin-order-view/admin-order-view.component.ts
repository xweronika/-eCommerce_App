import { OrderService, Order, OrderStatus } from 'src/app/core/services/order.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.css'],

})
export class AdminOrderViewComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public order: Order;
  public statuses = Object.keys(OrderStatus); // same klucze czyli: ["order_placed", "order_confirmed",
  public orderStatuses = OrderStatus; // klucze wraz z warosciami (nazwami) czyli np
  // order_confirmed = 'Zamówienie potwierdzone'
  public error: string;
  public created = '';
  public count: number;
  constructor(private orderService: OrderService, private route: ActivatedRoute,
              public router: Router, private location: Location) {
  }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      // lub paramMap zamiast params i
      // map(params => params.get('id')),
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) => this.orderService.getOrderById(id)))
      .subscribe(
        res => {
          this.order = res;
          this.created = this.order.created.substring(0, 10);
          this.count = Object.keys(this.order.items).length;
        },
        err => { // obsluga bledow
          this.error = err.error;
        }
      );
  }
  ngOnDestroy() {
    // funkcja unsubskrypcji, ktora wypisuje z subskrypcji
    // aby nie dopuscic do wycieku danych
    this.subscribe.unsubscribe();
  }
  deleteOrder(orderDelete) {
    this.orderService.deleteOrder(orderDelete).subscribe(
      res => {
        this.router.navigate(['/admin/order']);
      },
      err => this.error = err.error
    );
  }

  editStatus(status, order) {
    if ((status !== this.order.status || null || undefined) || (order !== null || undefined)) {
      // zabezpieczenie przed wysylaniem pustych wartosci do bazy
      const statusEdit = { status };
      this.orderService.editStatus(order._id, statusEdit).subscribe(
        res => { },
        err => this.error = err.error
      );
    }
  }

  backClicked() {
    this.location.back();
  }
}
