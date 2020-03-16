import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

code;

  constructor(private afAuth: AngularFireAuth, private activeRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const code = this.activeRoute.snapshot.queryParams.oobCode;

   // console.log(this.activeRoute.snapshot.queryParams.oobCode);
    this.afAuth
      .applyActionCode(code)
      .then(() => {
        // do something after successful verification
        alert('succesfull verification');
      })
      .catch(err => {
        // show error message
        alert('unsucessfull');
      });
  }
}
