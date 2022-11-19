import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DirectMassage } from '../interface/directMessage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dialog-add-dm',
  templateUrl: './dialog-add-dm.component.html',
  styleUrls: ['./dialog-add-dm.component.scss']
})
export class DialogAddDmComponent implements OnInit {

  users: any = [];
  // currantUserUID: any;
  accountUsers:any = [];
  selectedUsers = new FormControl();
  selectedUsersArray = []
  directMessage: DirectMassage;

  constructor(private firestore: AngularFirestore, private router: Router, private authService: AuthenticationService, public dialogRef: MatDialogRef<DialogAddDmComponent>) {
    this.directMessage = {
      name: '',
      users: [],
      key: '',
    }
  }

  /**
   * Load all Users form Firebase
   */
  ngOnInit(): void {

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.users = changes;
      this.filterUser()

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
  filterUser(){
  return this.users.filter(
      (user: any) => {
        if(user.email || user.eamil){
          this.accountUsers.push(user);
        }
      } 
    );
  }
  /**
   * Add current user to direct message
   */
  currentUser() {
    this.users.forEach((user: any) => {
      if (user.uid == this.authService.auth.currentUser.uid) {
        this.selectedUsersArray.push(user);
      }

    });
  }


  /**
   * create channel for all selected users and for currant user
   */
  
  createDMChannel() {
    this.selectedUsersArray = []  // if there is anything in array, empty it

    this.selectedUsers.value.forEach((user: any) => {
      this.selectedUsersArray.push(user);
    });

    this.currentUser(); // Add currant user to direct message
    this.directMessage.users = this.selectedUsersArray; // Add all users to direct message
    this.directMessage.name = this.selectedUsersArray.map((user: any) => user.name).join(', '); // Add all users name to direct message
    console.log(this.directMessage.name);
    this.firestore
      .collection('directMessage')
      .add(this.directMessage)
      .then((DM: any) => {
        // window.location.reload();
        this.dialogRef.close();
        this.router.navigateByUrl('/chat/' + DM.id);

      });
  }
}
