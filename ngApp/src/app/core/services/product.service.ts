import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export enum ProductCategories {
  easy_care = 'łatwe w pielęgnacji',
  better_sleep = 'na poprawę snu',
  air_cleaning = 'oczyszczające powietrze',
  sun_place = 'do jasnych miejsc',
  pet_friendly = 'przyjazne zwierzętom',
  dark_place = 'do ciemnych miejsc',
  // klucz = 'wartosc',
}
export enum ProductCategoriesIcons {
  easy_care = 'assets/img/product_menu/easy_care.png',
  better_sleep = 'assets/img/product_menu/better_sleep.png',
  air_cleaning = 'assets/img/product_menu/air_cleaning.png',
  sun_place = 'assets/img/product_menu/sun_place.png',
  pet_friendly = 'assets/img/product_menu/pet_friendly.png',
  dark_place = 'assets/img/product_menu/dark_place.png',
}
export enum ProductQuantity {
  large = 'Duża',
  medium = 'Średnia',
  small = 'Mała',
  none = 'Brak'
  // klucz = 'wartosc',
}

export interface Product {
  _id: any;
  name: string;
  price: number;
  categories: ProductCategories[];
  image: string;
  image2: string;
  image3: string;
  description: string;
  size: string;
  stand: string;
  watering: string;
  temperature: string;
  vegetation: number;
  cultivation: string;
  quantity: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'http://localhost:3000/api/product/product';
  private adminProductUrl = 'http://localhost:3000/api/admin-product/product';
  private productEditUrl = 'http://localhost:3000/api/admin-product/edit';
  private productDeleteUrl = 'http://localhost:3000/api/admin-product/delete';
  private productcatUrl = 'http://localhost:3000/api/product/product/find';


  constructor(private http: HttpClient, private router: Router) { }


  registerProduct(product) {
    return this.http.post<Product>(this.adminProductUrl, product);
  }

  getProducts() {
    return this.http.get<Product[]>(this.productUrl);
  }

  deleteProduct(productDelete) {
    return this.http.delete<Product>(`${this.productDeleteUrl}/${productDelete._id}`);
  }

  getProductById(productId) {
    return this.http.get<Product>(`${this.productUrl}/${productId}`);
  }
  editProduct(product) { // edycja produktu przez admina
    return this.http.put<Product>(`${this.productEditUrl}/${product._id}`, product);
  }
  getProductByCategory(category) {
    return this.http.get<Product[]>(`${this.productcatUrl}/${category}`);
  }

}
