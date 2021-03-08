import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user = [];
  users = 'assets/img/admin_menu/users.png';
  shippings = 'assets/img/admin_menu/shippings.png';
  orders = 'assets/img/admin_menu/orders.png';
  products = 'assets/img/admin_menu/products.png';

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() { }
}
