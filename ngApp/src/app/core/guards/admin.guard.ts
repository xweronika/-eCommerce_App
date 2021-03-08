import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    return this.authService.user$.pipe(filter(res => res && res.isAdmin), map(res => res.isAdmin));
  }
}
