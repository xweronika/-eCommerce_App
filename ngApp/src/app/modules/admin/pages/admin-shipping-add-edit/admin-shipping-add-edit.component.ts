import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Shipping, ShippingService } from 'src/app/core/services/shipping.service';

@Component({
  selector: 'app-admin-shipping-add-edit',
  templateUrl: './admin-shipping-add-edit.component.html',
  styleUrls: ['./admin-shipping-add-edit.component.css']
})
export class AdminShippingAddEditComponent implements OnInit, OnDestroy {
  public shipping: Partial<Shipping> = {};
  public error: string;
  private subscribe: Subscription;
  public edit = false;
  public onClick = false;

  constructor(private shippingService: ShippingService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow

    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      // filter(id => !!id),
      // jesli user jest nullem nie wykonuj tego
      map(({ id }) => id), // id bierze z routingu
      //  map(params => params.get('id')),

      tap((id) => {
        this.edit = !!id;
      }),

      filter(id => !!id), // jesli id jest nullem nie wykonuj tego

      // jesli id jest nullem nie wykonuj tego
      switchMap((id: string) =>
        this.shippingService.getShippingById(id)))
      .subscribe(
        res => {
          this.shipping = res;
        },
        err =>
          this.error = err.error,
      );
  }

  saveShipping() { // dodanie przesylki
    this.onClick = true;
    const redirect = ['/admin/shipping'];
    if (this.edit) {
      redirect.push(this.shipping._id);
    }
    (this.edit ? this.shippingService.editShipping(this.shipping) : this.shippingService.registerShipping(this.shipping))
      .subscribe(
        res => {
          this.router.navigate(redirect);
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  cancel() {
    if (this.edit) {
      this.router.navigate(['/admin/shipping', this.shipping._id]);
    } else {
      this.router.navigate(['/admin/shipping']);
    }
  }

}
