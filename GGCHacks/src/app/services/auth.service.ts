import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Subscription} from 'rxjs';
import {User} from '../interfaces/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {FormGroup} from '@angular/forms';
import 'firebase/compat/firestore';
import {ApplicationServiceService} from './application-service.service';
import {Application} from '../interfaces/application';
import {error} from 'selenium-webdriver';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  user: User;
  sub: Subscription;
  sub2: Subscription;
  verified: boolean;
  adminLevel: number;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public appService: ApplicationServiceService
  ) {
    this.adminLevel = 0;
    this.verified = false;
    this.sub2 = afAuth.user.subscribe( user => {
      this.verified = false;
      if (user) {
        this.verified = user.emailVerified;
        this.setUser(user);
      } else {
        this.user = null;
      }

    });
  }

  async setUser(user) {
    return this.sub = await this.afs.doc<User>(`users/${user.uid}`).valueChanges().subscribe( u => {
      this.user = u;
      this.adminLevel = u.adminLevel;
      if (u.application === undefined || u.application == null) {
       //  console.log('set user no app');
        this.appService.createEmptyApp();
      } else {
        this.appService.setApp(u.application);
      //   console.log(u);
      }
      // console.log(this.verified + '  ' + this.user);

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
      adminLevel: 0,
      registeredFor: [],
      pastHacks: [],
      application: null
    };

    console.log(userRef.set(data, {merge: true}));
  }

  async createUser(form: FormGroup) {
    await this.afAuth.createUserWithEmailAndPassword(form.get('email').value, form.get('password').value).then( result => {
      alert('Account Created');
      this.createUserData(result.user, form);
      result.user.sendEmailVerification();
      this.router.navigate(['/verifyEmail']);
    }, otherError => {
      alert('account creation failed' + otherError.toString());
      return;
    });
  }

  // login stuff
  async loginUser(form: FormGroup) {
    // console.log(form.get('email').value + "  " + form.get('password').value);

    await this.afAuth.signInWithEmailAndPassword(form.get('email').value, form.get('password').value).then(result => {

      // verification on email
      if ( !result.user.emailVerified ) {
        alert('You must verify your email');
        result.user.sendEmailVerification();
        this.router.navigate(['/verifyEmail']);
      } else {
        alert('Login successful');
        this.router.navigate(['home']);
      }
    }, otherError => { // if there is a problem loging in
      if (otherError === 'auth/user-disabled') {
        alert('Your account has been disabled');
      } else {
        alert('Incorrect email or password');
      }
    });

  }

  public passwordRecovery(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(result => {
      alert('Email sent to ' + email );
      this.router.navigate(['/home']);
    }, otherError => {
      alert('Something didnt work.');
    });
  }

  updateUser() {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    userRef.update(this.user);
  }

  public signOut() {
    this.verified = false;
    this.adminLevel = 0;
    this.afAuth.signOut().then( result => {
      alert('Signed Out');
      this.router.navigate(['/home']);
    }, otherError => {
      alert('Try Again');
    });
  }

  saveApplication() {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    userRef.update({
      application: Object.assign({}, this.appService.app)
    }).then( res => console.log(res));
  }

  deleteApp() {
    this.user.application = null;
    this.updateUser();
  }

  sendVerifivationEmail() {
    this.afAuth.currentUser.then(user => user.sendEmailVerification().then(result => alert('Email Sent'  ),
        otherError => alert('Something went wrong. Try again later.')));
  }

  ngOnDestroy(): void {
    if (this.sub != null) {
      this.sub.unsubscribe();
    } 
    if (this.sub2 != null) {
      this.sub2.unsubscribe();
    }
  }

  submitApplication() {
    this.appService.app.submitted = true;
    this.saveApplication();
    this.router.navigate(['/user']);
  }
}
