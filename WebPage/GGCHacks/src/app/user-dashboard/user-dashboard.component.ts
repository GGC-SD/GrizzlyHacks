import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  isEditing: boolean;
  form: FormGroup;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.auth.user.firstName,[ Validators.required ]],
      lastName: [this.auth.user.lastName,[ Validators.required ]]
    });
  }

  async submit() {
    this.auth.updateUser(this.form);
  }
}
