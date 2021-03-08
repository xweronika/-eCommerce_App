import { map } from 'rxjs/operators';
import { User } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  _id: any;
  shipping: {
    price: string;
    name: string;
  };
  userData: {
    firstname: string,
    surname: string,
    address: string,
    postcode: string,
    city: string,
    country: string,
    phone: string,
    email: string,
  };
  sum: number;
  items: {};
  status: string;
  created: string;
}

export enum OrderStatus {
  order_placed = 'Zamówienie złożone',
  order_confirmed = 'Zamówienie potwierdzone',
  order_shipped = 'Zamówienie wysłane',
  order_completed = 'Zamówienie zakończone',
  order_canceled = 'Zamówienie anulowane',
  // klucz = 'wartosc',
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderConfirmed: Order; // zamowienie z bazy danych
  private orderlUrl = 'http://localhost:3000/api/cart/user-data';
  private adminOrderUrl = 'http://localhost:3000/api/admin-order/order';
  private adminEditUrl = 'http://localhost:3000/api/admin-order/edit';
  private userOrdersUrl = 'http://localhost:3000/api/cart/user-orders';
  private orderDeleteUrl = 'http://localhost:3000/api/admin-order/delete';


  constructor(private http: HttpClient) { }

  registerOrder(order) { // dodanie zamowienia przez usera
    return this.http.post<Order>(this.orderlUrl, order);
  }
  getOrders() { // wyswietlanie zamowien u admina
    return this.http.get<Order[]>(this.adminOrderUrl);
  }
  confirmedOrder(orderConfirmed) {
    this.orderConfirmed = orderConfirmed;
  }
  getOrderById(orderId): Observable<Order> {
    return this.http.get<Order>(`${this.adminOrderUrl}/${orderId}`);
  }
  deleteOrder(orderDelete) {
    return this.http.delete<Order>(`${this.orderDeleteUrl}/${orderDelete._id}`);
  }
  editStatus(id, status) {
    return this.http.put<Order>(`${this.adminEditUrl}/${id}`, status);
  }

  userOrders(user) { // wysylanie usera do identyfiakcji jego zamowien
    // return this.http.get<any>(this.userOrdersUrl, user);
    return this.http.get<{ order: Order[] }>(`${this.userOrdersUrl}/${user}`).pipe(map(res => res.order));
  }

}
