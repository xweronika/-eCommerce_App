import { AdminGuard } from './core/guards/admin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },

  {
    path: 'special',
    // canActivate: [AuthGuard],
    loadChildren: './modules/special/special.module#SpecialModule'
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'about-us',
    loadChildren: './modules/about-us/about-us.module#AboutUsModule'
  },
  {
    path: 'product',
    loadChildren: './modules/product/product.module#ProductModule'
  },
  {
    path: 'auth',
    loadChildren: './modules/authentication/authentication.module#AuthenticationModule'
  },

  {
    path: 'login', // jak natrafi na /login
    redirectTo: 'auth/login' // to przekieruje na auth/login
  },
  {
    path: 'cart',
    loadChildren: './modules/cart/cart.module#CartModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
