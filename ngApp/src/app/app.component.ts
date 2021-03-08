import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService, User } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user$: Observable<User> = this.authService.user$;
  public scrollDown = false;

  constructor(public authService: AuthService, public cartService: CartService, private router: Router) {
  }
  ngOnInit(): void {
    this.authService.getCurrentUser();
    // jesli zmieni sie adres url to
    // wywolaj funkcje sprawdzjaca scroll
    this.router.events.pipe(
      filter((e: RouterEvent): e is RouterEvent => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.onWindowScroll();
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    // In chrome and some browser scroll is given to body tag
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos === max) {
      this.scrollDown = false;
    }
    if (pos !== max && !this.scrollDown) {
      this.scrollDown = true;
    }
  }

}
