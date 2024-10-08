import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordReset: boolean;
  isLoginButtonUnusable: boolean;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.isLoginButtonUnusable = false;
    this.loginForm = fb.group({
      email: '',
      password: ''
      });
    this.passwordReset = false;
  }

  ngOnInit(): void {
    this.isLoginButtonUnusable = false;
  }

  loginUser(loginForm: FormGroup) {
    const b = this.auth.loginUser(loginForm).then(u => {
      this.isLoginButtonUnusable = false;
    });

  }

}
