import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThreadComponent } from '../thread/thread.component';



@Component({
  selector: 'app-dialog-edit-messages',
  templateUrl: './dialog-edit-messages.component.html',
  styleUrls: ['./dialog-edit-messages.component.scss']
})
@Injectable({ providedIn: 'root' })

export class DialogEditMessagesComponent implements OnInit {
  value: any;
  messageID: any;
  channelID: any;
  time: any;
  threadMessageID: any;
  currentChannelID: any;
  constructor(private firestore: AngularFirestore,
    private _snackBar: MatSnackBar,
    private threds: ThreadComponent
  ) { }

  ngOnInit(): void {
    this.getMsg();    
  }

  // get Messages from Channel and value
  getMsg() {
    if (this.channelID) {
      this.firestore
        .collection(this.channelID)
        .doc(this.messageID)
        .valueChanges()
        .subscribe((message => {
          this.value = message['message'];
        }));
    }
    if (!this.channelID) {

      this.firestore
        .collection('threads')
        .doc(this.messageID)
        .collection(this.messageID)
        .doc(this.threadMessageID)
        .valueChanges({ idField: 'customIdName' })
        .subscribe((thread => {
          this.value = thread['message']

        }));
    }
    if (this.currentChannelID && !this.channelID) {
      this.firestore
        .collection('channel')
        .doc(this.currentChannelID)
        .valueChanges({ idField: 'customIdName' })
        .subscribe((Channel => {
          this.value = Channel['channelName']
        }))
    }
  }

  update() {
    if (this.channelID) {
      this.updateMessage();
    }
    if (!this.channelID) {
      this.updateThread();
    }
    if (this.currentChannelID) {
      this.updateChannelName()
    }
  }
  //update changes
  updateMessage() {
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .update({ message: this.value }) // to update only Message string
      .then((done => {
        this.openSnackBar();
      }))
  }

  //update changes of threads
  updateThread() {
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(this.threadMessageID)
      .update({ message: this.value })
      .catch((error => {
        console.log(error);
      }))
      .then((done => {
        this.openSnackBar()
      }))
  }

  //update Channel name in DB
  updateChannelName() {
    this.firestore
      .collection('channel')
      .doc(this.currentChannelID)
      .update({ channelName: this.value })
      .catch((error => {
        console.log(error);
      }))
      .then((done => {
        this.openSnackBar()
      }))
  }

  openSnackBar() {
    this._snackBar.open('Message edit Sucessfully', '', {
      duration: 3000
    });
  }
}
