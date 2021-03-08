import { User } from './../../../../core/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user: User;
  public error: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) => this.authService.getUserById(id)))
      .subscribe(
        res => {
          this.user = res;
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  deleteUser(userDelete) {
    this.authService.deleteUser(userDelete).subscribe(
      res => {
        // console.log(res);
        this.router.navigate(['/admin/user']);
      },
      err => this.error = err.error
    );
  }
}
