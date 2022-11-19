import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserProfile } from 'firebase/auth';
import { concatMap, from, of, switchMap, Observable } from 'rxjs';
import { Guest } from '../interface/guest';
import { User } from '../interface/user.class';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  loggedIn: boolean = false



  currentUser$ = authState(this.auth)            // Here we get the current user
  user: User;
  guset: Guest;
  GuestName: string;
  constructor(public auth: Auth, private firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public route: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUser$
      .subscribe(user => {
        this.user = new User(user);
      })

  }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password))          // Here we login a user

  }

  signUp(name: string, email: string, password: string) {
    // Here we create a new user
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })))

  }

  updateProfileData(profileData: any): Observable<any> {
    const user = this.auth.currentUser;           // i think here is the problem with the user
    return from(updateProfile(user, profileData));

  }

  guestLogin() {

    this.fireAuth.signInAnonymously().then((async () => {
      const user = this.auth.currentUser
      await from(updateProfile(user, { displayName: `${this.GuestName}` }));
      this.loggedIn = true;
      this.route.navigate(['home'])

    }))

  }


  // to delete User
  deleteUser() {
    const User = this.auth.currentUser;
    User.delete().catch((e => {
      console.log('Error', e);
    })).then((done => {
      setTimeout(() => {
        from(this.auth.signOut())
      }, 3000);
      this.snackBar.open('Account deleted. You will be automatticaly loged out', '', {
        duration: 3000
      });
    }))

  }

  logout() {
    if (this.auth.currentUser.isAnonymous) {
      const User = this.auth.currentUser;
      User.delete();
      from(this.auth.signOut())
    } else {                                   // Here we logout a user
      from(this.auth.signOut());
    }
  }
}
