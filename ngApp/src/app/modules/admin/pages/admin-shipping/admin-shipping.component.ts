import { Shipping, ShippingService } from '../../../../core/services/shipping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-shipping',
  templateUrl: './admin-shipping.component.html',
  styleUrls: ['./admin-shipping.component.css']
})
export class AdminShippingComponent implements OnInit {

  registerShippingData = {};
  shippings: Shipping[];
  error: string;

  constructor(private shippingService: ShippingService) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.shippingService.getShippings()  // wyswietlanie przesylki
    .subscribe(
      res => this.shippings = [...res].reverse(),
      err => this.error = err.error
    );
  }

  registerShipping() { // dodanie przesylki
    this.shippingService.registerShipping(this.registerShippingData).subscribe(
      res => {
        this.registerShippingData = {};
      },
      err => this.error = err.error
    );
  }

}
