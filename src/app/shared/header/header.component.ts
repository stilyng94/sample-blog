import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userName: string;
  authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.getAuthStatusListner().subscribe((auth) => {
      this.isAuthenticated = auth;
      this.userName = this.authService.getUserData()[1];
    });
    this.isAuthenticated = this.authService.getIsAuth();
    this.userName = this.authService.getUserData()[1];
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
