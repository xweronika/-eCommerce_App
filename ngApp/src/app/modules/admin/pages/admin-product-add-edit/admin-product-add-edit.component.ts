import { ProductQuantity } from './../../../../core/services/product.service';
import { Product, ProductCategories, ProductService } from '../../../../core/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-admin-product-add-edit',
  templateUrl: './admin-product-add-edit.component.html',
  styleUrls: ['./admin-product-add-edit.component.css']
})
export class AdminProductAddEditComponent implements OnInit, OnDestroy {
  public product: Partial<Product> = { categories: [], quantity: '' };
  // categories: [] to wartosc domyslna zeby nie wyslac pustej tablicy kategorii
  public categories = Object.keys(ProductCategories); // same klucze czyli categories: ["easy_care", "better_sleep",
  public productCategories = ProductCategories; // klucze wraz z warosciami (nazwami) czyli np pet_friendly = 'pet_friendly'
  private subscribe: Subscription;
  public error: string;
  public edit = false;
  public onClick = false;
  public quantities = Object.keys(ProductQuantity);  // same klucze czyli: ["small", itd
  public productQuantities = ProductQuantity;  // klucze wraz z warosciami (nazwami) czyli np
  // small = 'Mala ilosc w magazynie'

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      tap((id) => {
        this.edit = !!id;
      }),

      filter(id => !!id), // jesli id jest nullem nie wykonuj tego

      switchMap((id: string) => this.productService.getProductById(id)))
      .subscribe(
        res => {
          this.product = res;
          this.product.categories = this.categories.reduce((prev, current: ProductCategories, index) =>
            [...prev, this.product.categories.includes(current)], []);
        },
        err => this.error = err.error
      );
  }
  save() {
    this.onClick = true;
    this.error = null;
    const productData = {
      // To co mamy czyli : name + price + ...
      ...this.product, // dekomponacja obiektu
      // czyli zmieniamy jego warosc jesli chodzi o kategorie
      categories: this.categories.reduce((prev, current, index) =>
        // reduce zwraca nowa tab z kategoriami, jesli jest true przy kategorii to zwracamy nazwe tej kategorii
        // iteruje po index, jak for, nadpisujac po kolei tablice, poprzednie zapisania to prev
        // np I iteracja: prev=[], current='kategoria_1', index = 0
        // jesli kategoria_1 jest zaznaczona jako true to dodaje ta warosc do naszej tablicy kategorii
        // II iteracja: prev=['kategoria_1'], current='kategoria_2' index=1, itd
        !!this.product.categories[index] // czyli:
          // if (!!this.registerProductData.categories[index]) return [prev, current];
          ? [...prev, current] : prev, []) // czyli
      // else return prev;
      // jesli ta kategoria byla zanaczona jako false przez admina
      // to nie dodawaj jej do obecnej tablicy kategorii

      // ... dodajemy do prev- zeby nie bylo tam zagniezdzonej tablicy
      // ? - else, !! - zwraca bool
    };
    const redirect = ['/admin/product'];
    if (this.edit) {
      redirect.push(this.product._id);
    }
    (this.edit ? this.productService.editProduct(productData)
      : this.productService.registerProduct(productData))
      .subscribe(
        res => {
          this.router.navigate(redirect);
        },
        err => this.error = err.error
      );

  }

  cancel() {
    if (this.edit) {
      this.router.navigate(['/admin/product', this.product._id]);
    } else {
      this.router.navigate(['/admin/product']);
    }
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
