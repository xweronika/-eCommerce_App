import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-shipping',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-shipping.component.html',
  styleUrls: ['./order-shipping.component.css'],
})
export class OrderShippingComponent implements OnInit {
  @Input() shipping;
  @Input() shippingName;
  @Output() calculatePrices = new EventEmitter();
  constructor() { }

  ngOnInit() { }

}
