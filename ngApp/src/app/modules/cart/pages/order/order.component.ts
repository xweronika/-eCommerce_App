import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { ShippingService } from './../../../../core/services/shipping.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public items = {}; // przechowywanie produktow w koszyku
  public shippings = [];
  public error: string;

  constructor(
    public cartService: CartService,
    public shippingService: ShippingService,
    public router: Router
  ) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    if (!this.cartService.sumProductsInCart) {
      this.router.navigate(['/cart']);
    } // zabezpieczenie przed odswiezeniem strony

    this.items = this.cartService.getItems();

    // wyswietlanie przesylki
    this.shippingService.getShippings()
      .subscribe(
        res => {
          this.shippings = res,
            this.setShipping();
        },
        err => this.error = err.error
      );
  }
  setShipping() {
    if (this.cartService.shippingName === '') {
      // jesli przesylka nie jest wybrana
      this.cartService.calculatePrices(this.shippings[0]);
      // to wybierz pierwsza jaka domyslna
    }
  }
  calculatePrices($event: any, shipping) {
    this.cartService.calculatePrices(shipping);
  }

}
