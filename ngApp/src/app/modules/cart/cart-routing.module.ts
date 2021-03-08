import { PaymentComponent } from './pages/payment/payment.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { OrderComponent } from './pages/order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingComponent } from './pages/shipping/shipping.component';

const routes: Routes = [

  {
    path: '',
    component: CartComponent
  },
  {
    path: 'shipping',
    component: ShippingComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'user-data',
    component: UserDataComponent
  },
  {
    path: ':orderId',
    component: PaymentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
