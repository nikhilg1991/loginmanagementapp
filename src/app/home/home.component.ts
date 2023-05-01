import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User = new User;
  apiUrl = 'https://reqres.in';
  userdata: any;

  constructor(
    private authenticationService: AuthService,
    private router: Router,
    private http: HttpClient) {
    this.authenticationService.user.subscribe(user => this.currentUser = user);
  }

  ngOnInit() {
    this.getUsers().subscribe(result => {
      this.userdata = result;
      console.log(result);
    })
  }

  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/api/users`);
   }

  logOutBtn(event: any) {
    this.authenticationService.logout();
    this.router.navigate(['/', 'login']);
  }

}