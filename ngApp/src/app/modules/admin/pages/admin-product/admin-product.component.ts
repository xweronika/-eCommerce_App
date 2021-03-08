import { ProductComponent } from '../../../product/pages/product-main/product.component';
import { Component, OnInit } from '@angular/core';
import { ProductService, ProductCategories, Product } from '../../../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }
  products: Product[];
  categories = Object.keys(ProductCategories); // same klucze czyli categories: ["easy_care", "better_sleep",
  productCategories = ProductCategories; // klucze wraz z warosciami (nazwami) czyli np pet_friendly = 'pet_friendly', ...
  // zeby mozna bylo po nich iterowac forem bo po kluczach sie nie da
  error: string;

  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.productService.getProducts()
      .subscribe(
        res => this.products = [...res].reverse(),
        err => this.error = err.error
      );
  }

}
