import {Injectable, OnDestroy} from '@angular/core';
import { Subscription} from 'rxjs';
import {User} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {FormGroup} from '@angular/forms';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {


  user: User;
  sub: Subscription;
  verified: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.verified = false;
    afAuth.user.subscribe( user => {
      if (user && user.emailVerified ) {
        this.setUser(user);
        this.verified = true;
      } else {
        this.user = null;
      }
    });
  }

  async setUser(user) {
    return this.sub = await this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe( u => {
      this.user = u;
    });

  }

  // stuff for creating users
  private createUserData(user, form: FormGroup) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      firstName: form.get('firstName').value,
      lastName: form.get('lastName').value,
      isAdmin: false
    };
    return userRef.set(data, {merge: true});
  }

  async createUser(form: FormGroup) {
    await this.afAuth.createUserWithEmailAndPassword(form.get('email').value, form.get('password').value).then( result => {
      alert('Account Created');
      this.createUserData(result.user, form);
      result.user.sendEmailVerification();
    }, error => {
      alert('account creation failed' + error.toString());
      return;
    });
  }

  // login stuff
  async loginUser(form: FormGroup) {
    // console.log(form.get('email').value + "  " + form.get('password').value);
    await this.afAuth.signInWithEmailAndPassword(form.get('email').value, form.get('password').value).then(result => {
      // verification on email
      if ( !result.user.emailVerified ) {
        result.user.sendEmailVerification();
        alert('Please Verify Email');
      } else {
      alert('Login succesfull');
      }
    }, error => { // if there is a problem loging in
      if (error === 'auth/user-disabled') {
        alert('Your account has been disabled');
      } else {
        alert('Incorrect email or password');
      }
    });
  }

  public passwordRecovery(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

  updateUser(form: FormGroup) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    userRef.update(form.getRawValue());
  }

  public sighOut() {
    this.verified = false;
    this.afAuth.signOut().then( result => {
      alert(result);
    }, error => {
      alert(error);
    });
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }





  /*







  private testSettingAdmin(user) {
    this.afs.doc((`users/${user.uid}`)).update({admin: true});
  }

   */

}
