import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  _id: string;
  email: string;
  firstname: string;
  surname: string;
  isAdmin?: boolean;
  address?: string;
  postcode?: string;
  city?: string;
  country?: string;
  phone?: string;
}
interface LoginResponse extends User {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:3000/api/auth/register';
  private loginUrl = 'http://localhost:3000/api/auth/login';
  private adminUserUrl = 'http://localhost:3000/api/admin-user/user';
  private userEditUrl = 'http://localhost:3000/api/user/edit';
  private userDeleteUrl = 'http://localhost:3000/api/user/delete';
  private userUrl = 'http://localhost:3000/api/user/user';


  private userSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private router: Router) {
  }
  setUserAndToken(res: LoginResponse) {
    const { _id } = res;
    localStorage.setItem('token', res.token);
    // wez token z backendu, umiesc go w zmiennej 'token' i umiesc ja w localStorage
    this.getCurrentUser(_id);
  }
  registerUser(user: User) {
    // return this.http.post<any>(this.registerUrl, user);
    return this.http.post<LoginResponse>(this.registerUrl, user).pipe(tap(res => this.setUserAndToken(res)
    ));
  }

  loginUser(user) {
    return this.http.post<LoginResponse>(this.loginUrl, user).pipe(tap(res => this.setUserAndToken(res)
    ));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
    // !! - aby zwracalo boolean, true jesli jest, false jesli nie
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.userSubject.next(null);
    this.router.navigate(['/home']);
    // po wylogowaniu nawiguj na home
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUsers() {
    return this.http.get<any>(this.adminUserUrl);
  }

  getAdmin() { // sprawdzanie admina
    const user = this.userSubject.value;
    // tworzy nowa zmienna do ktorej przypisuje
    // ostatnie wartosci obiektu user
    return user ? user.isAdmin : false;
    // jesli nie jest userem zwroc false
    // jesli jest userem to zwroc to co jest
    // w admin czyli true jesli jest adminem
    // lub false jesli nie jest adminem
  }

  deleteUser(userDelete) {
    return this.http.delete<User>(`${this.userDeleteUrl}/${userDelete._id}`);
  }
  get user$(): Observable<User> {
    return this.userSubject.asObservable();
  }
  getCurrentUser(id?: string) {
    const userId = id || localStorage.getItem('userId');
    if (this.loggedIn && userId) {
      this.getUserById(userId).subscribe(res => {
        this.userSubject.next(res);
        localStorage.setItem('userId', res._id);
      });
    }
  }

  checkUser() {
    if (this.userSubject.value) { return true; }
    // jesli uzytkownik jest zalogowany zwroc true
    // jesli nie jest zwroc false
    return false;
  }
  getUserById(userId): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${userId}`);
  }
  editUser(userEdit) { // edycja swojego konta
    return this.http.put<User>(`${this.userEditUrl}/${userEdit._id}`, userEdit).pipe(tap(res => this.userSubject.next(res)));
  }
  editUserAdmin(userEdit) { // edycja userow przez admina
    return this.http.put<User>(`${this.userEditUrl}/${userEdit._id}`, userEdit);
  }
}
