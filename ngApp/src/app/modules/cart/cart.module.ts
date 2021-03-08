import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/pages/cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { OrderComponent } from './pages/order/order.component';
import { CartItemComponent } from './pages/cart-item/cart-item.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { OrderShippingComponent } from './pages/order-shipping/order-shipping.component';
import { OrderItemComponent } from './pages/order-item/order-item.component';
import { PaymentComponent } from './pages/payment/payment.component';




@NgModule({
  declarations: [
    CartComponent,
    ShippingComponent,
    OrderComponent,
    CartItemComponent,
    UserDataComponent,
    OrderShippingComponent,
    OrderItemComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class CartModule { }
