import { ProductCategoriesIcons, ProductQuantity } from './../../../../core/services/product.service';
import { CartService } from './../../../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { Product, ProductCategories, ProductService } from '../../../../core/services/product.service';
import { OnDestroy } from '@angular/core';
import { finalize, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detalis',
  templateUrl: './product-detalis.component.html',
  styleUrls: ['./product-detalis.component.css']
})

export class ProductDetalisComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  product: Product;
  // ikony
  categoriesIcons = Object.keys(ProductCategoriesIcons);
  productCategoriesIcons = ProductCategoriesIcons;
  // napisy
  categories = Object.keys(ProductCategories);
  productCategories = ProductCategories;
  error: string;
  productData = {};
  public quantities = Object.keys(ProductQuantity);
  public productQuantities = ProductQuantity;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
  ) { }



  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.subscribe = this.route.params.pipe(
      map(({ productId }) => productId),
      //  map(params => params.get('id')),
      switchMap((id: string) => this.productService.getProductById(id))).subscribe(
        res => this.product = res,
        err => this.error = err.error
      );
  }

  ngOnDestroy() {
    // funkcja unsubskrypcji, ktora wypisuje z subskrypcji
    // aby nie dopuscic do wycieku danych
    this.subscribe.unsubscribe();
  }

  addToCart(product) {
    const productData = { name: product.name, price: product.price, _id: product._id };
    // Ta funkcja: odbiera obecny podukt
    // uzywa metody z serwisu koszyka - addToCart() zeby dodac produkt do koszyka
    // wyswietla wiadomosc ze dodano produkt do koszyka
    this.cartService.addToCart(productData);
  }
  buyNow(product) {
    this.addToCart(product);
    this.router.navigate(['/cart/order']);
  }
}
