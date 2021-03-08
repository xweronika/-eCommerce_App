import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

interface RegisterUser extends User {
  password: string;
  confirm_password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerUserData: Partial<RegisterUser> = {};
  public error: string; // do przechowywania bledow
  public isButtonVisible = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this.error = null; // resetowanie bledow
    this.auth.registerUser(this.registerUserData as User).subscribe(
      res => {
        this.registerUserData = res;
        this.router.navigate(['/home']);
      },
      err => { // obsluga bledow
        this.error = err.error;
      }
    );
  }
  onClick() {
    if (this.isButtonVisible === false) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
  }

}
