import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order, OrderService, OrderStatus } from 'src/app/core/services/order.service';
import { User } from './../../../../core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserOrdersComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user$: Observable<User> = this.auth.user$;
  public orders: Order[]; // zamowienia
  public statuses = Object.keys(OrderStatus); // same klucze czyli: ["order_placed", "order_confirmed",
  public orderStatuses = OrderStatus; // klucze z warosciami np order_confirmed = 'Zamówienie potwierdzone'
  public error: string;

  constructor(private auth: AuthService, private orderService: OrderService) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow

    // subskrypcja usera aby wiedziec od
    // ktorego uzytkownika zamowienia wyswietlic
    this.subscribe = this.user$.pipe(
      // map(({ _id }) => _id),
      // tap(console.log),
      filter(user => !!user),
      // jesli user jest nullem nie wykonuj tego
      map(params => params._id),
      switchMap((id: string) =>
        this.orderService.userOrders(id))).subscribe(
          res => {
            this.orders = [...res].reverse();
          },
          // res => [...this.orders].reverse(),
          err => this.error = err.error
        );
    // subskrypcja zamowien, aby na biezaco
    // wyswietlac zamowienia danego uzytkownika
  }

  ngOnDestroy() {
    // unsubskrypcja, ktora wypisuje z subskrypcji
    this.subscribe.unsubscribe();
  }
}
