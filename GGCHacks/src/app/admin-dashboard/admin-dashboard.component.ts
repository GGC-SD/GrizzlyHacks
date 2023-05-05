import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  users: User[];
  fullUserArray: User[];
  sub: Subscription;
  search: string;
  adminFilter: string = 'All Members';
  applicationFilter: string = 'No Filter';
  acceptedFilter: string = 'No Filter';

  constructor(private afs: AngularFirestore, public auth: AuthService) { 

  }

  /**
   * Initializes the component. Pulls all users from the database and stores them in the users array.
   */
  ngOnInit(): void {
    this.sub = this.afs.collection<User>(`users`).valueChanges().subscribe( us => {
      this.fullUserArray = us;
      this.users = us;
      this.users.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    });
  }

  /**
   * Destroys the component and unsubscribes from the database. 
   */
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  makeAdmin(user: User) {
    if (confirm(`Are you sure you want to make ${user.firstName} ${user.lastName} an admin?`)) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user.adminLevel = 1;
      userRef.update(user);
    }
  }

  takeAdmin(user: User) {
    if (confirm(`Are you sure you want to take ${user.firstName} ${user.lastName}'s admin status?`)) {  
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user.adminLevel = 0;
      userRef.update(user);
    }
  }

  makeSuperAdmin(user: User) {
    if (confirm(`Are you sure you want to make ${user.firstName} ${user.lastName} a super admin?`)) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user.adminLevel = 2;
      userRef.update(user);
      }
  }

  takeSuperAdmin(user: User) {
    if (user.email === this.auth.user.email) {
      alert('You cannot take your own super admin status.');
      return;
    }
    if (confirm(`Are you sure you want to take ${user.firstName} ${user.lastName}'s super admin status?`)) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      user.adminLevel = 1;
      userRef.update(user);
    }
  }

  acceptApplication(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    user.registeredFor.push(new Date().getFullYear());
    userRef.update(user);
  }

  revokeApplication(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const i = user.registeredFor.indexOf(new Date().getFullYear());
    if (i !== -1) user.registeredFor.splice(i, 1);
    userRef.update(user);
  }

  isRegisteredForCurrentYear(user: User): boolean {
    return (user.registeredFor.includes(new Date().getFullYear()));
  }

  changeAdminFilter(filter: string) {
    switch(filter) {
      case 'All Members': {
        this.adminFilter = 'All Members';
        break;
      }
      case 'Non Admins': {
        this.adminFilter = 'Non Admins';
        break;
      }
      case 'All Admins': {
        this.adminFilter = 'All Admins';
        break;
      }
      case 'Admins': {
        this.adminFilter = 'Admins';
        break;
      }
      case 'Super Admins': {
        this.adminFilter = 'Super Admins';
        break;
      }
    }
    this.filterUserEntries();
  }

  changeApplicationFilter(filter: string) {
    switch(filter) {
      case 'No Filter': {
        this.applicationFilter = 'No Filter';
        break;
      }
      case 'Submitted': {
        this.applicationFilter = 'Submitted';
        break;
      }
      case 'Not Submitted': {
        this.applicationFilter = 'Not Submitted';
        break;
      }
    }
    this.filterUserEntries();
  }

  changeAcceptedFilter(filter: string) {
    switch(filter) {
      case 'No Filter': {
        this.acceptedFilter = 'No Filter';
        break;
      }
      case 'Accepted': {
        this.acceptedFilter = 'Accepted';
        break;
      }
      case 'Not Accepted': {
        this.acceptedFilter = 'Not Accepted';
        break;
      }
    }
    this.filterUserEntries();
  }

  filterUserEntries() {
    //Show the selected Admin Filter.
    switch(this.adminFilter) {
      case 'All Members': {
        this.users = this.fullUserArray;
        break;
      }
      case 'Non Admins': {
        this.users = this.fullUserArray.filter( u => u.adminLevel == 0);
        break;
      }
      case 'All Admins': {
        this.users = this.fullUserArray.filter( u => u.adminLevel >= 1);
        break;
      }
      case 'Admins': {
        this.users = this.fullUserArray.filter( u => u.adminLevel == 1);
        break;
      }
      case 'Super Admins': {
        this.users = this.fullUserArray.filter( u => u.adminLevel == 2);
        break;
      }
    }
    
    //Show the selected Application Filter.
    switch(this.applicationFilter) {
      case 'Submitted': {
        this.users = this.users.filter( u => u.application != null && u.application.submitted );
        break;
      }
      case 'Not Submitted': {
        this.users = this.users.filter( u => u.application == null || !u.application.submitted );
        break;
      }
    }

    //Show the selected Accepted Filter.
    switch(this.acceptedFilter) {
      case 'Accepted': {
        this.users = this.users.filter( u => this.isRegisteredForCurrentYear(u) );
        break;
      }
      case 'Not Accepted': {
        this.users = this.users.filter( u => !this.isRegisteredForCurrentYear(u) );
        break;
      }
    }

  }
}
