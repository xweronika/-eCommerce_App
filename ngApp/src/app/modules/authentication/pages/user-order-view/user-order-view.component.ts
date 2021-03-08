import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { OrderService, Order, OrderStatus } from 'src/app/core/services/order.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-order-view',
  templateUrl: './user-order-view.component.html',
  styleUrls: ['./user-order-view.component.css']
})
export class UserOrderViewComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public isButtonVisible = false;
  public order: Order;
  public statuses = Object.keys(OrderStatus); // same klucze czyli: ["order_placed", "order_confirmed",
  public orderStatuses = OrderStatus; // klucze z warosciami np order_confirmed = 'Zamówienie potwierdzone'
  public error: string;
  public created = '';
  public count: number;

  constructor(private orderService: OrderService, private route: ActivatedRoute, public router: Router) { }

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
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    // funkcja unsubskrypcji, ktora wypisuje z subskrypcji
    // aby nie dopuscic do wycieku danych
    this.subscribe.unsubscribe();
  }

  editStatus(order) {
    const orderEdited = { status: 'order_canceled' };
    this.orderService.editStatus(order._id, orderEdited).subscribe(
      res => {
        console.log(res);
        this.order = res;
      },
      err => this.error = err.error
    );
    this.isButtonVisible = false;
  }
}
