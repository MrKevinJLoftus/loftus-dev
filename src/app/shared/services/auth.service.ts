import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessageType, AuthData } from '../models/general.model';
import { MessageService } from './message.service';
import { environment } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(username: string, password: string) {
    const authData: AuthData = {username, password};
    this.http.post<{token: string, expiresIn: number, username: string, userId: string}>(
      `${environment.apiUrl}/user/login`, authData)
      .subscribe(response => {
        if (response.token) {
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.loginSetup(expiresInDuration, response.userId, token);
        } else {
          this.logout(false);
          this.messageService.setMessage('Your username or password was incorrect. Please try again.', MessageType.ERROR);
        }
    }, error => {
      console.error(error);
      this.messageService.setMessage('Your username or password was incorrect. Please try again.', MessageType.ERROR);
      this.logout(false);
    });
  }

  createUser(username: string, password: string) {
    const authData: AuthData = {username, password};
    this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/signUp', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.loginSetup(expiresInDuration, response.userId, token);
        }
    }, error => {
      console.error(error);
      this.messageService.setMessage('Something went wrong.', MessageType.ERROR);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      this.authStatusListener.next(false);
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.postLoginNavigation();
    }
  }

  logout(navigateAway: boolean = true) {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    if (navigateAway) {
      this.router.navigate(['/']);
    }
  }

  private loginSetup(expiresInDuration: number, userId: string, token: string) {
    this.setAuthTimer(expiresInDuration);
    this.isAuthenticated = true;
    this.userId = userId;
    this.authStatusListener.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate, this.userId);
    this.postLoginNavigation();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout(true);
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  private postLoginNavigation() {
    this.router.navigate(['/']);
  }
}
