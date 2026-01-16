import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordReset = false;
  isLoginButtonUnusable = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoginButtonUnusable = false;

    // Check if user just signed out - don't auto-redirect
    const justSignedOut = sessionStorage.getItem('justSignedOut');
    if (justSignedOut) {
      sessionStorage.removeItem('justSignedOut');
      // Don't do anything - user just signed out, stay on login page
      return;
    }
  }

  // Accept plain strings instead of a FormGroup
  loginUser(email: string, password: string) {
    if (!email || !password) {
      alert('Please provide email and password');
      this.isLoginButtonUnusable = false;
      return;
    }

    this.isLoginButtonUnusable = true;

    // Create a fake form that mimics FormGroup's get() method
    const fakeForm = {
      get: (field: string) => ({
        value: field === 'email' ? email : password
      })
    } as any;

    this.auth.loginUser(fakeForm)
      .then(() => {
        this.isLoginButtonUnusable = false;
        this.router.navigate(['/admin-dashboard']);
      })
      .catch(() => {
        this.isLoginButtonUnusable = false;
      });
  }
}
