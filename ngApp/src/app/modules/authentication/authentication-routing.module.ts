import { UserOrderViewComponent } from './pages/user-order-view/user-order-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { AccountEditComponent } from './pages/account-edit/account-edit.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    // gdy bedzie sciezka 'auth' to przekieruj na login
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user-orders',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-orders/:id',
    pathMatch: 'full',
    component: UserOrderViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: AccountComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: AccountEditComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
