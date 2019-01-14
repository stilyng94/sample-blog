import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupData: UserModel;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signupData = {};
  }

  onSignUp(signupForm: NgForm) {
    if (signupForm.invalid) {
      return;
    }
    this.authService.registerUser(this.signupData).subscribe(() => {
      signupForm.resetForm();
      this.signupData = {};
      this.router.navigate(['/auth/login']);
    }, (err) => {
      alert('Registration Error');
    });
  }
}
