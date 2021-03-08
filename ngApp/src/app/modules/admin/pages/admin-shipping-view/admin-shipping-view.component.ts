import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ShippingService, Shipping } from 'src/app/core/services/shipping.service';

@Component({
  selector: 'app-admin-shipping-view',
  templateUrl: './admin-shipping-view.component.html',
  styleUrls: ['./admin-shipping-view.component.css']
})
export class AdminShippingViewComponent implements OnInit, OnDestroy {

  private subscribe: Subscription;
  public shipping: Shipping;
  public error: string;
  constructor(private shippingService: ShippingService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) => this.shippingService.getShippingById(id)))
      .subscribe(
        res => {
          this.shipping = res;
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  deleteShipping(shippingDelete) { // usuwanie przesylki
    this.shippingService.deleteShipping(shippingDelete).subscribe(
      res => {
        this.router.navigate(['/admin/shipping']);
      },
      err => this.error = err.error
    );
  }


}
