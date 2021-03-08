import { User } from './../../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  user$: Observable<User> = this.authService.user$;

  private subscribe: Subscription;
  user: User;
  error: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.subscribe = this.authService.user$.subscribe(
      user => this.user = user,
      err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  deleteUser(userDelete) {
    this.authService.deleteUser(userDelete).subscribe(
      res => {
        this.authService.logoutUser();
        // po usunieciu swojego konta wyloguj
      },
      err => this.error = err.error
    );
  }
}
