import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  public orderId;
  private subscribe: Subscription;
  public error: string;

  constructor(
    public authService: AuthService,
    public orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    if (!this.orderService.orderConfirmed) {
      if (this.authService.loggedIn()) {
        this.router.navigate(['/auth/user-orders']);
      } else {
        this.router.navigate(['/home']);
      }
    }
    this.subscribe = this.route.paramMap
      .subscribe(
        params => {
          this.orderId = [params.get('orderId')];
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    // funkcja unsubskrypcji, ktora wypisuje z subskrypcji
    // aby nie dopuscic do wycieku danych
    this.subscribe.unsubscribe();
  }
  onClick() {
    this.router.navigate(['/auth/user-orders', this.orderId[0]]);
  }

}
