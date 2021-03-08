import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // jesli zmieni sie item to przerenderuje sie komponent
})
export class OrderItemComponent implements OnInit {
  @Input() item;
  @Input() count;
  constructor() { }

  ngOnInit() {
  }

}
