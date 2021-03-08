import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserOrdersComponent } from './pages/user-orders/user-orders.component';
import { UserOrderViewComponent } from './pages/user-order-view/user-order-view.component';
import { AccountEditComponent } from './pages/account-edit/account-edit.component';

@NgModule({
  declarations: [
    AccountComponent,
    RegisterComponent,
    LoginComponent,
    UserOrdersComponent,
    UserOrderViewComponent,
    AccountEditComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
