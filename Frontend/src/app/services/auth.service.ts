import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ilogin } from '../models/Auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.baseUrl;
  KEY = 'token';
  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  login(username: string, password: string): Observable<Ilogin> {
    return this.httpClient.post<Ilogin>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  storeToken(token: string) {
    localStorage.setItem(this.KEY, token);
  }

  getToken(): string {
    const token = localStorage.getItem(this.KEY) || '';

    return token;
  }

  removeToken() {
    localStorage.removeItem(this.KEY);
  }

  hasAccess(): boolean {
    if (!this.getToken()) {
      return false;
    }

    return true;
  }

  goLogin() {
    this.router.navigate(['auth/login']);
  }
}
