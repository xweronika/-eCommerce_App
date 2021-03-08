import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users = [];
  error: string;

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.auth.getUsers()
      .subscribe(
        res => this.users = [...res].reverse(),
        err => this.error = err.error
      );
  }
}
