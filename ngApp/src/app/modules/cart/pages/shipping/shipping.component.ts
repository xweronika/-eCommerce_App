import { ShippingService } from './../../../../core/services/shipping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippings = [];
  error: string;
  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
    // this.shipping = this.shippingService.getShipping();
    this.error = null; // resetowanie bledow
    // wyswietlanie przesylki
    this.shippingService.getShippings()
      .subscribe(
        res => this.shippings = res,
        err => this.error = err.error
      );
  }
}
