import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public error: string;
  public loginUserData: FormGroup;

  constructor(private auth: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {

    // aby zebrac nazwe i adres uzytkownika
    this.loginUserData = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.error = null; // resetowanie bledow
    this.auth.loginUser(this.loginUserData.value)
      .subscribe(
        res => {
          this.router.navigate(['/home']);
          // po zalogowaniu nawiguj na home
        },
        err => { // obsluga bledow
          this.error = err.error;
        }
      );
  }
}
