import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public sumOfPrices = 0; // suma cen aktualnych produktow w koszyku
  public sumWithShipping = 0; // suma cen wybranych produktow i wysylki
  // przy zamawianiu produktu (order.component)
  public itemsObj: { [key: string]: { product: Product, count: number } } = {}; // obieky aktualnych produktow w koszyku
  public shippingName = '';
  public sumProductsInCart = 0;
  public sumString: string;
  public sumCartString = '0';
  public shippingPrice = '';

  constructor(private http: HttpClient) { }

  addToCart(product) { // dodawanie pozycji do koszyka
    this.itemsObj[product._id] = { product, count: 1 };
    // obiekt zawiera 2 wartosci - produkt i count do liczenia
    // ilosci prodktow, ktory domyslnie ustawiony jest na 1
    this.calculatePrices();
  }

  getItems() { // zwracanie elementow koszyka
    return this.itemsObj;
  }
  calculatePrices(shipping?) { // obliczanie kwoty koszyka
    this.sumOfPrices = this.sumWithShipping =
      Object.values(this.itemsObj).reduce((a, { product, count }) => a + (product.price * count), 0);
    // dodajemy ceny produktow mnozac je razy ilosc czyli count

    // sumWithShipping to druga cena potrzebna do przeliczenia
    // zamowienia wraz z przesylka jest ona obliczana

    this.sumCartString = this.sumOfPrices.toFixed(2);

    this.sumProductsInCart = Object.values(this.itemsObj).reduce((a) => a + 1, 0);
    // przeliczanie ilosci produktow w koszyku
    if (shipping) { // jesli parametr shipping zostal przekazany
      // shipping to cena przesylki, to dolicz go do obecnej ceny zamowienia
      this.sumWithShipping = this.sumOfPrices + shipping.price;
      this.shippingName = shipping.name;
      this.shippingPrice = shipping.price;
      this.sumString = this.sumWithShipping.toFixed(2);
      // redukuje do 2 miejsc po przecinku
    }
  }

  clearCart() { // czyszczenie koszyka
    this.itemsObj = {};
    this.calculatePrices();
  }
  deleteItem(itemOne) { // usuwanie elementow koszyka
    delete this.itemsObj[itemOne._id];
    this.calculatePrices();
  }
  changeCount(value, product) {
    // zmiana ilosci obiektow danego produktu w koszyku
    if (!((this.itemsObj[product._id].count === 1) && value <= -1)) {
      this.itemsObj[product._id].count += value;
      this.calculatePrices();
    }
  }
}
