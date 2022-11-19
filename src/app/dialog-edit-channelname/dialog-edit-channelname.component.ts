import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-channelname',
  templateUrl: './dialog-edit-channelname.component.html',
  styleUrls: ['./dialog-edit-channelname.component.scss']
})
export class DialogEditChannelnameComponent implements OnInit {
  value: any;
  currentChannelID: any;
  constructor(private firestore: AngularFirestore,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getChannles();


  }
  getChannles() {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .valueChanges()
      .subscribe((channelname => {
        if (channelname) {
          this.value = channelname['channelName'];
        }
        if (!channelname) {
          this.getDirectChannels()
        }
      }))
  }

  getDirectChannels() {
    this.firestore
      .collection('directMessage')
      .doc(this.currentChannelID)
      .valueChanges()
      .subscribe((channel => {
        this.value = channel['name']

      }))
  }


  update() {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .update({ channelName: this.value })
      .catch((error => {
        this.updateDirectChannel();
      }))
      .then((done => {
        this.openSnackBar();
      }))
  }

  updateDirectChannel() {
    this.firestore
      .collection('directMessage')
      .doc(this.currentChannelID)
      .update({ name: this.value })
      .catch((error => {
        console.log(error);
      }))
  }
  openSnackBar() {
    this._snackBar.open('Channel name saved Sucessfully', '', {
      duration: 3000
    });
  }
}
