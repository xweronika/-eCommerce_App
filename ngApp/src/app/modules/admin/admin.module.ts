import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { AdminComponent } from './pages/admin-main/admin.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminShippingComponent } from './pages/admin-shipping/admin-shipping.component';
import { AdminOrderComponent } from './pages/admin-order/admin-order.component';
import { AdminOrderViewComponent } from './pages/admin-order-view/admin-order-view.component';
import { AdminUserViewComponent } from './pages/admin-user-view/admin-user-view.component';
import { AdminUserEditComponent } from './pages/admin-user-edit/admin-user-edit.component';
import { AdminProductViewComponent } from './pages/admin-product-view/admin-product-view.component';
import { AdminProductAddEditComponent } from './pages/admin-product-add-edit/admin-product-add-edit.component';
import { AdminShippingViewComponent } from './pages/admin-shipping-view/admin-shipping-view.component';
import { AdminShippingAddEditComponent } from './pages/admin-shipping-add-edit/admin-shipping-add-edit.component';
import { AdminUserOrdersComponent } from './pages/admin-user-orders/admin-user-orders.component';

@NgModule({
  declarations: [
    AdminProductComponent,
    AdminComponent,
    AdminUserComponent,
    AdminShippingComponent,
    AdminOrderComponent,
    AdminOrderViewComponent,
    AdminUserViewComponent,
    AdminUserEditComponent,
    AdminProductViewComponent,
    AdminProductAddEditComponent,
    AdminShippingViewComponent,
    AdminShippingAddEditComponent,
    AdminUserOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
