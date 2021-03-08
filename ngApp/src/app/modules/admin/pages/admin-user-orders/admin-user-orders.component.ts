import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order, OrderService, OrderStatus } from 'src/app/core/services/order.service';
import { User } from './../../../../core/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-orders',
  templateUrl: './admin-user-orders.component.html',
  styleUrls: ['./admin-user-orders.component.css']
})
export class AdminUserOrdersComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user$: Observable<User> = this.auth.user$;
  public orders: Order[]; // zamowienia
  public statuses = Object.keys(OrderStatus); // same klucze czyli: ["order_placed", "order_confirmed",
  public orderStatuses = OrderStatus; // klucze z warosciami np order_confirmed = 'Zamówienie potwierdzone'
  public error: string;

  constructor(private auth: AuthService, private orderService: OrderService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow

    // subskrypcja usera aby wiedziec od
    // ktorego uzytkownika zamowienia wyswietlic

    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) =>
        this.orderService.userOrders(id))).subscribe(
          res => {
            this.orders = [...res].reverse();
          },
          // res => [...this.orders].reverse(),
          err => this.error = err.error
        );
  }

  ngOnDestroy() {
    // unsubskrypcja, ktora wypisuje z subskrypcji
    this.subscribe.unsubscribe();
  }
  onClick(order) {
    this.router.navigate(['/admin/order', order]);
  }
}
