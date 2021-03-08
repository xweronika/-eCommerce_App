import { CartService } from '../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = {}; // przechowywanie produktow w koszyku jako Obj
  constructor(public cartService: CartService) { }
  ngOnInit() { // ustaw item uzywajac metody z serwisu
    this.items = this.cartService.getItems();
  }

}
