import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // jesli zmieni sie item to przerenderuje sie komponent
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item;
  @Input() count;
  @Output() remove = new EventEmitter();
  @Output() changeCount = new EventEmitter();
  private isButtonVisible = false;
  constructor() { }

  ngOnInit() {
  }

}
