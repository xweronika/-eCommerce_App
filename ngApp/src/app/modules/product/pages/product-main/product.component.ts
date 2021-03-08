import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }
  private registerProductData = {};
  public products: Product[];
  public error: string;
  public easyCare = 'assets/img/product_menu/easy_care.png';
  public betterSleep = 'assets/img/product_menu/better_sleep.png';
  public airCleaning = 'assets/img/product_menu/air_cleaning.png';
  public sunPlace = 'assets/img/product_menu/sun_place.png';
  public petFriendly = 'assets/img/product_menu/pet_friendly.png';
  public darkPlace = 'assets/img/product_menu/dark_place.png';
  public easyCareClick = 'assets/img/product_menu/easy_care_click.png';
  public betterSleepClick = 'assets/img/product_menu/better_sleep_click.png';
  public airCleaningClick = 'assets/img/product_menu/air_cleaning_click.png';
  public sunPlaceClick = 'assets/img/product_menu/sun_place_click.png';
  public petFriendlyClick = 'assets/img/product_menu/pet_friendly_click.png';
  public darkPlaceClick = 'assets/img/product_menu/dark_place_click.png';
  public prevCategory: string;

  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.getProduct();
  }
  find(category) {
    if (category === this.prevCategory) {
      this.prevCategory = null;
      this.getProduct();
    } else {
      this.prevCategory = category;
      this.productService.getProductByCategory(category)
        .subscribe(
          res => {
            this.products = [...res].reverse();
          },
          err => this.error = err.error
        );
    }
  }
  getProduct() {
    this.productService.getProducts()
      .subscribe(
        res => this.products = [...res].reverse(),
        err => this.error = err.error
      );
  }
  addToCart(product) {
    const productData = { name: product.name, price: product.price, _id: product._id };
    this.cartService.addToCart(productData);
  }
}
