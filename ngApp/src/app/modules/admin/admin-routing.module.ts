import { AdminUserViewComponent } from './pages/admin-user-view/admin-user-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './pages/admin-main/admin.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { AdminProductComponent } from './pages/admin-product/admin-product.component';
import { AdminShippingComponent } from './pages/admin-shipping/admin-shipping.component';
import { AdminOrderComponent } from './pages/admin-order/admin-order.component';
import { AdminOrderViewComponent } from './pages/admin-order-view/admin-order-view.component';
import { AdminUserEditComponent } from './pages/admin-user-edit/admin-user-edit.component';
import { AdminProductViewComponent } from './pages/admin-product-view/admin-product-view.component';
import { AdminProductAddEditComponent } from './pages/admin-product-add-edit/admin-product-add-edit.component';
import { AdminShippingViewComponent } from './pages/admin-shipping-view/admin-shipping-view.component';
import { AdminShippingAddEditComponent } from './pages/admin-shipping-add-edit/admin-shipping-add-edit.component';
import { AdminUserOrdersComponent } from './pages/admin-user-orders/admin-user-orders.component';


const routes: Routes = [

  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminComponent,
      },
      {
        path: 'user',
        pathMatch: 'full',
        component: AdminUserComponent,
      },
      {
        path: 'user/:id/orders',
        pathMatch: 'full',
        component: AdminUserOrdersComponent,
      },
      {
        path: 'user/:id/edit',
        pathMatch: 'full',
        component: AdminUserEditComponent,
      },
      {
        path: 'user/:id',
        pathMatch: 'full',
        component: AdminUserViewComponent,
      },
      {
        path: 'product',
        pathMatch: 'full',
        component: AdminProductComponent,
      },
      {
        path: 'product/add',
        pathMatch: 'full',
        component: AdminProductAddEditComponent,
      },
      {
        path: 'product/:id/edit',
        pathMatch: 'full',
        component: AdminProductAddEditComponent,
      },
      {
        path: 'product/:id',
        pathMatch: 'full',
        component: AdminProductViewComponent,
      },
      {
        path: 'shipping',
        pathMatch: 'full',
        component: AdminShippingComponent,
      },
      {
        path: 'shipping/add',
        pathMatch: 'full',
        component: AdminShippingAddEditComponent,
      },
      {
        path: 'shipping/:id/edit',
        pathMatch: 'full',
        component: AdminShippingAddEditComponent,
      },
      {
        path: 'shipping/:id',
        pathMatch: 'full',
        component: AdminShippingViewComponent,
      },
      {
        path: 'order',
        pathMatch: 'full',
        component: AdminOrderComponent,
      },

      {
        path: 'order/:id',
        pathMatch: 'full',
        component: AdminOrderViewComponent,
      }

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
