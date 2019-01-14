import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListner = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  private userName: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }


  private saveAuthData(
    token: string,
    expirationDate: Date,
    userId: string,
    userName: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expiresIn', expirationDate.toString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
  }

  private getAuthData() {
    const token = localStorage.getItem('access_token');
    const expirationDate = localStorage.getItem('expiresIn');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    if (!token || !expirationDate || !userId || !userName) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userName: userName
    };
  }

  private clearStorageData() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }

  private authTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  public getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getUserData() {
    return [this.userId, this.userName];
  }

  public autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const isExpired = this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
    if (isExpired) {
      this.authStatusListner.next(false);
      this.isAuthenticated = false;
      this.userId = null;
      this.userName = null;
    } else {
      const now = new Date();
      const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.userName = authInfo.userName;
      this.authTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  public logOut() {
    this.clearStorageData();
    this.userId = null;
    this.userName = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/auth/login']);
  }

  public registerUser(userData: UserModel): Observable<any> {
    return this.http.post(`${environment.authUrl}/register`, userData);
  }

  public loginUser(userData: UserModel): Observable<any> {

    return this.http.post(`${environment.authUrl}/login`, userData).pipe(
      map((result: any) => {
        const token = result.token;
        if (token) {
          const expiresInDuration = result.expiresIn;
          this.authTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = result.userId;
          this.userName = result.userName;
          this.authStatusListner.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
        }
      })
    );
  }
}
