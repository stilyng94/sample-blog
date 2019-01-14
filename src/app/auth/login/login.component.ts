import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: UserModel;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginData = {};
  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.authService.loginUser(this.loginData).subscribe(() => {
      loginForm.resetForm();
      this.loginData = {};
      this.router.navigate(['/posts']);
    }, (err) => {
      alert('Login Error');
    });
  }
}
