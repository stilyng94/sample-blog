import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  private url: string;

  constructor(private authService: AuthService, private router: Router) { }

  private isAuthStateHandler(): boolean {
    if (this.isLoginOrRegister()) {
      this.router.navigate(['/posts']);
      return false;
    }
    return true;
  }

  private isNotAuthStateHandler(): boolean {
    if (this.isLoginOrRegister()) {
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }

  private isLoginOrRegister(): boolean {
    if (this.url.includes('login') || this.url.includes('register')) {
      return true;
    }
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.url = state.url;
    const isAuth = this.authService.getIsAuth();
    if (isAuth) {
      return this.isAuthStateHandler();
    }
    return this.isNotAuthStateHandler();
  }
}
