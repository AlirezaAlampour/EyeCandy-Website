  
import { Component, OnInit } from '@angular/core';
import {AuthService} from '.././services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService, ) { }
  public auth: AuthService;
  ngOnInit() {
  }
  isHomeRoute() {
    if (this.router.url === '/dashboard' || this.router.url === '/profile') {
      return true;
    } else { return false; }
  }
  isHomeRoute1() {
    if (this.router.url !== '/dashboard' && this.router.url !== '/profile') {
      return true;
    } else { return false; }
  }
  isHomeRoute2() {
    if (this.router.url === '/dashboard' || this.router.url === '/profile') {
      return true;
    } else { return false; }
  }

  isLoggedIn() {
    this.auth.isLoggedIn();
  }
  logOut() {
    this.auth.logout();
  }

}