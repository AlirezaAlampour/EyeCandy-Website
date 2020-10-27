import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false;
  authToken: any;
  user: any;
  private token: string;

  // AUTH_SERVER = 'http://localhost:3000';
  // authSubject  =  new  BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: { name: string; email: string; username: string; password: string; }) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://vast-coast-32524.herokuapp.com/users/register', user, {headers});
  }

  authenticateUser(user: { username: string; password: string; }) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // console.log(this.http.get('http://localhost:3000/users/authenticate', user));
    this.storeUserData(this.authToken, this.user);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post('http://vast-coast-32524.herokuapp.com/users/authenticate', user, {headers});
    // return this.http.get('http://vast-coast-32524.herokuapp.com/test/A');
  }



  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    // const headers = new HttpHeaders();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('id_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // ,'Authorization': token
    });
    return this.http.get('http://vast-coast-32524.herokuapp.com/users/profile', {headers});
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.authToken = '';
    window.localStorage.removeItem('id_token');
    this.router.navigateByUrl('/#');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.user();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

}
