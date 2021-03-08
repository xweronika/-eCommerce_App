import { User } from './../../../../core/services/auth.service';
import { createNgModule } from '@angular/compiler/src/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user: User;
  public checkoutForm: FormGroup; // zmienna do przechowywania modelu formularza
  // (danych od użytkownika)
  public error: string;
  public onClick = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      _id: '',
      firstname: '',
      surname: '',
      address: '',
      postcode: '',
      city: '',
      country: '',
      email: '',
      phone: ''
    });
  }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    // pobieranie id z url
    this.subscribe = this.route.params.pipe(
      map(({ id }) => id), // id bierze z routingu
      switchMap((id: string) => this.auth.getUserById(id)))
      .subscribe(
        res => {
          this.user = res;
          this.checkoutForm.patchValue(this.user);
          // wypelnienie iputow danymi uzytkownika
        },
        err => this.error = err.error
      );
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  onSubmit() {
    if (!this.checkoutForm.value.email.match(
      // tslint:disable-next-line: max-line-length
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ) {
      this.onClick = false;
      this.error = 'Wprowadzono nieprawidłowy email!';
    } else {
      this.onClick = true;
      // kreowanie nowych danych uzytkownika
      // ktore trafi do backendu
      const user = this.checkoutForm.value;

      // wysylanie uzytkownika do backdendu
      this.auth.editUserAdmin(user).subscribe(
        res => {
          this.router.navigate(['/admin/user', user._id]);
        },
        err => this.error = err.error
      );
    }
  }
}
