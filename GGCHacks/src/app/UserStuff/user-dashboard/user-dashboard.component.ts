import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { User } from '../../interfaces/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  isEditing: boolean;

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.isEditing = false;
  }

  async submit() {
    this.auth.updateUser();
  }

  isRegisteredForCurrentYear(user: User): boolean {
    return (user.registeredFor.includes(new Date().getFullYear()));
  }
  
}
