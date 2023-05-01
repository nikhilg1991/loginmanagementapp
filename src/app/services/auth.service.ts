import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl = 'https://reqres.in';
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {

    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.apiUrl}/api/login`, { username, password })
      .pipe(
        map(({token}) => {
          let user: User = {
            email: username,
            token: token,
          };
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    let user: User = {
      email: '',
      token: '',
    };
    this.userSubject.next(user);
  }


}
