import { Component, ElementRef, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { Chat } from '../interface/chat';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../interface/user.class';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
@Injectable({ providedIn: 'root' })

export class ThreadComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  messageID;
  threadmsg;
  chat$: Chat = new Chat;
  users;
  channelID;
  threadHeading;
  user: User = new User;
  UserDetailsArray;
  @ViewChild('ThreadContainer') threadContainer: ElementRef

  fb;

  constructor(private firestore: AngularFirestore, private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService,
    public chat: ChatRoomComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storage: AngularFireStorage) {

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.user = new User(user);

      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parmsMap => {
      this.messageID = parmsMap.get('id');
    }))
    this.getAllUserFfromirebase();
    this.channelID = this.router.url.split('/')[2];
    this.getThreadMsg();
    this.getmsg();
  }

// get Message for Thread as used as Heading
  getmsg() {
    this.firestore
      .collection(this.channelID)
      .doc(this.messageID)
      .valueChanges()
      .subscribe((msg => {
        this.threadHeading = msg;
      }))
  }

// get saved ThreadMessage form Firestore
  getThreadMsg() {
    this.threadmsg;
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((thread => {
        this.threadmsg = thread;
        this.threadmsg = thread.sort((mess1: any, mess2: any) => { // neu nachrichen werden am Ende gezeigt
          return mess1.time - mess2.time;
        });
      }))
  }

  // to set User UID
  setUserUID() {
    return this.chat$.user = this.user.uid;
  }

  // Find user with UID
  findUSerbyId(UID) {    
    return this.users?.find((userCorrect => (userCorrect.uid == UID)))

  }

  // to take User from firebase and saves in User to use findUserbyid function
  getAllUserFfromirebase() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'user' })
      .subscribe((changes) => {
        this.users = changes;
      })
  }

// to send and save messages in DB with or without image
  submit() {
    if (!this.chat$.message && !this.fb) {
      this.enterMessageSnackBar()
    }
    if (this.fb && !this.chat$.message) {
      this.sumbitImageWithMessage()
    }
    if (!this.fb) {
      this.submitMessage();
    }
    if (this.chat$.message && this.fb) {
      this.sumbitImageWithMessage()
    }
    this.chat$.message = '';
    this.chat$.image = '';
  }

  //Upload image and show
  sumbitImageWithMessage() {
    this.setUserUID()
    this.chat$.image = this.fb
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((message: any) => {
        this.messageID = message.id;
        this.scrollObjectDown(this.threadContainer);
      }).catch((err) => {
        console.log('Error', err);
      })
  }

  //Upload message to firestore

  submitMessage() {
    this.setUserUID()
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .add(this.chat$.toJSON())
      .then((added => {
        this.scrollObjectDown(this.threadContainer)
      }))
  }

  // delete compelte message
  deleteMesage(idofThread, url) {
    if (url) {
      this.deleteThreadStorage(url)
      this.deleteThreadFirestore(idofThread);
    } else
    this.deleteThreadFirestore(idofThread);
  }


  // delete message from firestore. IF user delete only msg
  deleteThreadFirestore(idofThread) {
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(idofThread)
      .delete()
      .then((done => {
        this.openSnackBar();
      }))

  }

  // delete images from storage. If user want to delete compelte msg with image
  deleteThreadStorage(downloadURL) {
    this.storage.storage.refFromURL(downloadURL).delete();

  }

// if user want to delete only Image from messages
  deleteImage(idofThread, downloadURL) {
    this.storage.storage.refFromURL(downloadURL).delete()
    this.firestore
      .collection('threads')
      .doc(this.messageID)
      .collection(this.messageID)
      .doc(idofThread)
      .update({ image: '' })
  }

  //feedback on message delete
  openSnackBar() {
    this._snackBar.open('Message deleted', '', {
      duration: 3000
    });
  }

  //feedback if editior is empty
  enterMessageSnackBar() {
    this._snackBar.open('Please write something', '', {
      duration: 3000
    });
  }

  // edit message
  openDialog(messageID) {
    const dialogRef = this.dialog.open(DialogEditMessagesComponent)
    dialogRef.componentInstance.threadMessageID = messageID;
    dialogRef.componentInstance.messageID = this.messageID;
  }

  // scroll down if new message were sent
  scrollObjectDown(object: ElementRef) {
    object.nativeElement.scrollTop = object.nativeElement.scrollHeight;
  }

  // to Upload images in thread
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `threadImages/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
  UserDetails(details) {
    this.UserDetailsArray = this.findUSerbyId(details)
    const dialogRef = this.dialog.open(UserDetailsComponent)
    dialogRef.componentInstance.userDetailsArray = this.UserDetailsArray;
  }

}


