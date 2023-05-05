import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-verify-email-user',
  templateUrl: './verify-email-user.component.html',
  styleUrls: ['./verify-email-user.component.css']
})
export class VerifyEmailUserComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
