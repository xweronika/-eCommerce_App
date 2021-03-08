import { OrderService } from './../../../../core/services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from '../../../../core/services/cart.service';
import { User } from '../../../../core/services/auth.service';
import { Validators } from '@angular/forms';
// import { Order } from '../../../../core/services/order.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  public checkoutForm: FormGroup; // zmienna do przechowywania modelu formularza
  // (danych od użytkownika)
  public user$: Observable<User> = this.auth.user$;
  public items = {}; // przechowywanie produktow w koszyku
  public orderConfirmed: { _id: any };
  // zamowienie z bazy danych
  public error: string;
  public onClick = false;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private orderService: OrderService
  ) {

    // aby zebrac nazwe i adres uzytkownika
    this.checkoutForm = this.formBuilder.group({
      _id: 'Niezalogowany',
      firstname: [null, Validators.required],
      surname: [null, Validators.required],
      postcode: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    if (!this.cartService.sumProductsInCart) {
      this.router.navigate(['/cart']);
    } // zabezpieczenie przed odswiezeniem strony

    this.items = this.cartService.getItems();
    if (this.auth.checkUser()) { // jesli user jest zalogowany
      // to za pomoca patchValue, to co jest w koncie usera wpisuje do user data,
      // jesli ktorychs pol user nie ma to zostaja te domyslne wartosci
      this.user$.pipe(first()).subscribe(
        user => this.checkoutForm.patchValue(user),
        err => this.error = err.error
      );
    }
  }
  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.onClick = true;
    } else {
      // kreowanie zamowienia od uzytkownika
      // ktore trafi do backendu
      const order = {
        userData: this.checkoutForm.value,
        items: this.cartService.itemsObj,
        shipping: {
          name: this.cartService.shippingName,
          price: this.cartService.shippingPrice
        },
        sum: this.cartService.sumString
      };

      // wysylanie zamowienia uzytkownika do backdendu
      this.orderService.registerOrder(order).subscribe(
        res => {
          this.orderConfirmed = res;
          this.orderService.confirmedOrder(this.orderConfirmed);
          this.router.navigate(['/cart', this.orderConfirmed._id]);
          this.checkoutForm.reset(); // resetowanie formularza po jego przeslaniu
          this.cartService.clearCart(); // czyszczenie koszyka
        },
        err => this.error = err.error
      );
    }
  }
}


