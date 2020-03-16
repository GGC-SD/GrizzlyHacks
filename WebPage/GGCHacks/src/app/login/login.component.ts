import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordReset: boolean

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: '',
      password: ''
      });
    this.passwordReset = false;
  }

  ngOnInit(): void {
  }

}
