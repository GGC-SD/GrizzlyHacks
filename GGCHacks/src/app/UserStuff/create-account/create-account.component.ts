/*

things to do validation
make look better

 */

import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {provideRouter, Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {


  createAccountForm: FormGroup;

  constructor( private fb: FormBuilder, public auth: AuthService) {
    this.createAccountForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
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
        CustomValidators.patternValidator(/[!@#$%^&*()_+\-=\]\\{}|;':",./<>?]/, { doesntHaveSpecialCharacters: true }),
    // 6. Has a minimum length of 8 characters
      ]],
      cPassword:  ['', [Validators.required]]
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
  }

  validateCPassword() {
    return this.createAccountForm.get('password').value === this.createAccountForm.get('cPassword').value;
  }



  getFirstName() {
    return this.createAccountForm.get('firstName');
  }

  getLastName() {
    return this.createAccountForm.get('lastName');
  }

  getEmail() {
    return this.createAccountForm.get('email');
  }

  getPassword() {
    return this.createAccountForm.get('password');
  }

  getCPassword() {
    return this.createAccountForm.get('cPassword');
  }


  protected readonly provideRouter = provideRouter;
}

class CustomValidators {


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
