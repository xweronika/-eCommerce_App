import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit, OnDestroy {
  private subscribe: Subscription;
  public user: User;
  public checkoutForm: FormGroup; // zmienna do przechowywania modelu formularza
  // (danych od użytkownika)
  public error: string;
  public user$: Observable<User> = this.auth.user$;
  public onClick = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, public router: Router, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      _id: '',
      firstname: [null, Validators.required],
      surname: '',
      postcode: '',
      address: '',
      city: '',
      country: '',
      email: [null, Validators.required],
      phone: '',
    });
  }

  ngOnInit() {
    this.error = null; // resetowanie bledow
    this.subscribe = this.auth.user$.subscribe(
      user => {
        this.user = user;
        if (user) {
          this.checkoutForm.patchValue(this.user);
        }
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
      this.error = 'Nieprawidłowy email!';
    } else {
      this.onClick = true;
      const user = this.checkoutForm.value;

      // wysylanie uzytkownika do backdendu
      this.auth.editUser(user).subscribe(
        res => {
          this.router.navigate(['/auth/account']);
        },
        err => this.error = err.error
      );
    }
  }
}
