import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debug } from 'console';
import { DirectMassage } from '../interface/directMessage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dialog-add-dm',
  templateUrl: './dialog-add-dm.component.html',
  styleUrls: ['./dialog-add-dm.component.scss'],
})
export class DialogAddDmComponent implements OnInit {
  users: any = [];
  // currantUserUID: any;
  accountUsers: any = []; // all Users
  selectedUsers = new FormControl();
  selectedUser = [];
  directMessage: DirectMassage;
  currentUserArray = [];
  userID: string;
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<DialogAddDmComponent>
  ) {
    this.directMessage = {
      name: '',
      users: [],
      key: '',
    };
  }

  /**
   * Load all Users form Firebase
   */
  ngOnInit(): void {
    // this.createDM();

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
        this.filterUser();
      });

    // this.currantUserUID = this.authService.auth.currentUser.uid
  }

  /**
   * All users form firebase without currant user
   */
  usersWithoutCurrantUser() {
    return this.users.filter(
      (user: any) => !(user.email == this.authService.auth.currentUser.email)
    );
  }

  // Guest users will be not showen on Direct channel messages
  filterUser() {
    return this.users.filter((user: any) => {
      if (user.email || user.eamil) {
        this.accountUsers.push(user);
      }
    });
  }
  /**
   * Add current user to direct message
   */
  currentUser() {
    this.users.filter((user: any) => {
      if (user.uid === this.authService.auth.currentUser.uid) {
        this.currentUserArray = [];
        this.currentUserArray.push(user);
        this.userID = this.currentUserArray[0].uid;
        console.log('current User ', this.currentUserArray);
      }
    });
  }

  /**
   * create channel for all selected users and for current user
   */

  createDMChannel() {
    this.selectedUser = []; // if there is anything in array, empty it
    this.currentUser();
    console.log('selected User', this.selectedUser);
    // Push the selected User into the array
    this.selectedUsers.value.map((user: any) => {
      this.selectedUser.push(user);
    });
    console.log('user id', this.userID);

    this.firestore
      .collection('users')
      .doc(this.userID)
      .collection('dms')
      .doc('dmchannel');
    // .add(this.selectedUser)
    // this.directMessage.users = this.selectedUser; // Add all users to direct message
    // this.directMessage.name = this.selectedUser
    //   .map((user: any) => user.name)
    //   .join(',  '); // Add all users name to direct message
    // console.log(this.directMessage.name);
    // this.firestore
    //   .collection('users')
    //   .add(this.directMessage)
    //   .then((DM: any) => {
    //     // window.location.reload();
    //     this.dialogRef.close();
    //     this.router.navigateByUrl('/chat/' + DM.id);
    //   });
  }

  // createDM() {
  //   this.currentUser();
  //   console.log(this.currentUser);
  // }
}

// if button is clicked open Dialog and show all users
// If user is selected add him into dm from current user
// Add the Selected User into the subcollection from the current User
