import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Shipping  {
  _id: any;
  name: string;
  price: number;
  adress: string;
  time: string;
  eco: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private shippingUrl = 'http://localhost:3000/api/cart/shipping';
  private adminShippingUrl = 'http://localhost:3000/api/admin-shipping/shipping';
  private adminShippingEditUrl = 'http://localhost:3000/api/admin-shipping/edit';
  private shippingDeleteUrl = 'http://localhost:3000/api/admin-shipping/delete';

  constructor(private http: HttpClient) { }

  getShippings() { // wyswietlanie przesylek
    // uzywa metody HttpClient get()
    // do pobierania danych dotyczacych wysylki
    return this.http.get<Shipping[]>(this.shippingUrl);
  }

  registerShipping(shipping) { // dodanie wysylek w panelu admina
    return this.http.post<Shipping>(this.adminShippingUrl, shipping);
  }
  deleteShipping(shippingDelete) { // usuwanie przesylek
    return this.http.delete<Shipping>(`${this.shippingDeleteUrl}/${shippingDelete._id}`);
  }
  getShippingById(shippingId) {
    return this.http.get<Shipping>(`${this.adminShippingUrl}/${shippingId}`);
  }
  editShipping(shipping) { // edycja przesylki przez admina
    return this.http.put<Shipping>(`${this.adminShippingEditUrl}/${shipping._id}`, shipping);
  }

}
