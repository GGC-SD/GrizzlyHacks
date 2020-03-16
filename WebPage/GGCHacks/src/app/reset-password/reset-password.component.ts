import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  code: string;
  form: FormGroup;

  constructor(private afAuth: AngularFireAuth, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          // has number
          CustomValidators.patternValidator(/[0-9]/, { doesntHaveNumber: true }),
          // has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { doesntHaveCapitalCase: true }),
          // lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { doesntHaveSmallCase: true }),
          // has a special character
          CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\[\]\\{}|;':",./<>?]/, { doesntHaveSpecialCharacters: true }),
          // 6. Has a minimum length of 8 characters
        ]],
        cPassword:  ['', [Validators.required]]
      },
      {
        validator: CustomValidators.passwordMatchValidator
    });
  }

  ngOnInit(): void {
     this.code = this.activatedRoute.snapshot.queryParams.oobCode;
  }

  getPassword() {
    return this.form.get('password');
  }

  getCPassword() {
    return this.form.get('cPassword');
  }


  onSubmit() {
    this.afAuth.confirmPasswordReset(this.code, this.form.get('password').value).then( result => {
      alert('You have succesfully updates Password');
      this.router.navigate(['login']);
    }, error => {
      alert('try again');
    });
  }

}

class CustomValidators {

  constructor() {}

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('cPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('cPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied

      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;

    };
  }
}

