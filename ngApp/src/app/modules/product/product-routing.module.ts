import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetalisComponent } from './pages/product-detalis/product-detalis.component';
import { ProductComponent } from './pages/product-main/product.component';

const routes: Routes = [

  {
    path: '',
    component: ProductComponent
  },
  {
    path: ':productId',
    component: ProductDetalisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
