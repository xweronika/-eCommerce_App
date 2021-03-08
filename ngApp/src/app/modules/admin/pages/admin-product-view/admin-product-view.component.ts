import { Product, ProductService } from './../../../../core/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductQuantity } from './../../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategories, ProductCategoriesIcons, } from './../../../../core/services/product.service';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-view',
  templateUrl: './admin-product-view.component.html',
  styleUrls: ['./admin-product-view.component.css']
})
export class AdminProductViewComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public product: Product;
  public error: string;
  // ikony
  categoriesIcons = Object.keys(ProductCategoriesIcons);
  productCategoriesIcons = ProductCategoriesIcons;
  // napisy
  public categories = Object.keys(ProductCategories); // same klucze czyli : ["easy_care", "better_sleep",
  public productCategories = ProductCategories; // klucze wraz z warosciami czyli pet_friendly = 'pet_friendly' itd
  public quantities = Object.keys(ProductQuantity);
  public productQuantities = ProductQuantity;

  constructor(private productService: ProductService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) => this.productService.getProductById(id)))
      .subscribe(
        res => {
          this.product = res;
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  // usuwanie produktu
  deleteProduct(productDelete) {
    this.productService.deleteProduct(productDelete).subscribe(
      res => {
        this.router.navigate(['/admin/product']);
      },
      err => this.error = err.error
    );
  }

}
