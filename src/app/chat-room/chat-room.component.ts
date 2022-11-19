import {
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { Chat } from '../interface/chat';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interface/user.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditMessagesComponent } from '../dialog-edit-messages/dialog-edit-messages.component';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { DialogEditChannelnameComponent } from '../dialog-edit-channelname/dialog-edit-channelname.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ChatRoomComponent implements OnInit {
  user: User | undefined;
  zeroMsg = true;
  allMessages = [];
  activeChannel;
  channelID: any;
  messageID: any;
  directChannels;
  chat$: Chat = new Chat();
  users;
  userID;
  allUser: any = [];
  editOtion = false;
  editOptionDirect = false;

  preview: boolean = false;
  fullscrennImage;
  UserDetailsArray;

  fileName: string;

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  @ViewChild('showChat') messagesChannelDiv!: ElementRef;

  constructor(
    private route: ActivatedRoute,

    public chatService: ChatService,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storage: AngularFireStorage
  ) {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = new User(user);
        this.setUserinFirebase();
      }
    });
  }

  ngOnInit(): void {
    /**
     * Get currently ID from channel
     */
    this.route.paramMap.subscribe((paramMap) => {
      this.channelID = paramMap.get('id');
      this.chat$.channelID = this.channelID;
      this.getChannels();
      this.getMessages();
      this.allMessages = []; // when user click on another channel it array will be empty
      this.getAllUserFfromirebase();
      this.activeChannel = [];
      this.directChannels = [];
      this.getDirectChannels();
    });
  }
  // set User in firbase in  collection with uid
  setUserinFirebase() {
    this.firestore
      .collection('users')
      .doc(this.user.uid)
      .set(this.user.toJSON());
  }

  // get Channel from DB and to show as H1
  getChannels() {
    this.firestore
      .collection(
        'channels'
      ) /* gespeicherte Daten aus firestore user collection werden geladen */
      .doc(this.channelID)
      .valueChanges({
        idField: 'channelID',
      }) /* alle änderungen werden gespeichert / customIdName ID von jeder collection */
      .subscribe((changes: any) => {
        if (!changes.channelName) return;
        this.activeChannel = changes;
        this.editOtion = true;
      });
  }

  getDirectChannels() {
    this.firestore
      .collection('directMessage')
      .doc(this.channelID)
      .valueChanges({ idField: 'dmID' })
      .subscribe((name) => {
        if (!name['name']) return;
        this.directChannels = name;
      });
  }

  // to set User UID
  setUserUID() {
    return (this.chat$.user = this.user.uid);
  }

  toggleChannel() {}

  // to take messages from ChannelID
  getMessages() {
    this.firestore
      .collection(this.channelID)
      .valueChanges({ idField: 'customIdName' })
      .subscribe((message: any) => {
        for (let i = 0; i < message.length; i++) {
          const msg = message[i];
          if (message.length === 0) {
            this.zeroMsg = true;
          } else this.zeroMsg = false;
          if (!msg.channelID === this.channelID) {
            this.allMessages = [];
          } else
            this.allMessages = message.sort((mess1: any, mess2: any) => {
              // neu nachrichen werden am Ende gezeigt
              return mess1.time - mess2.time;
            });
        }
      });
  }

  findUSerbyId(UID) {
    return this.users?.find((userCorrect) => userCorrect.uid == UID);
  }

  //to get All user from firebase
  getAllUserFfromirebase() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'user' })
      .subscribe((changes) => {
        this.users = changes;
      });
  }

  //  save messages and images to firestroe
  submit() {
    if (!this.chat$.message && !this.fb) {
      return this.enterMessageSnackBar();
    }
    if (this.fb && !this.chat$.message) {
      this.sumbitImageWithMessage();
      window.location.reload();
    }
    if (!this.fb) {
      this.submitMessage();
    }
    if (this.chat$.message && this.fb) {
      this.sumbitImageWithMessage();
    }
    this.chat$.message = '';
    this.chat$.image = '';
    this.fileName = '';
  }

  //Upload image and show
  sumbitImageWithMessage() {
    this.setUserUID();
    this.chat$.image = this.fb;
    this.firestore
      .collection(this.channelID)
      .add(this.chat$.toJSON())
      .then((message: any) => {
        this.messageID = message.id;
        this.scrollObjectDown(this.messagesChannelDiv);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  //Upload message to firestore
  submitMessage() {
    this.setUserUID();
    this.firestore
      .collection(this.channelID)
      .add(this.chat$.toJSON())
      .then((message: any) => {
        this.messageID = message.id;
        this.scrollObjectDown(this.messagesChannelDiv);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  // delete compelte message
  deleteMesage(message, id) {
    if (id) {
      this.deleteMesageStorage(id);
      this.deletemessageFirestore(message);
    } else this.deletemessageFirestore(message);
  }

  // delete message from firestore. IF user delete only msg
  deletemessageFirestore(message) {
    this.firestore
      .collection(this.channelID)
      .doc(message)
      .delete()
      .catch((error) => {
        console.log('Somthing went wrong', error);
      })
      .then((done) => {
        this.openSnackBar();
      });
  }

  // delete images from storage. If user want to delete compelte msg with image
  deleteMesageStorage(downloadURL) {
    this.storage.storage.refFromURL(downloadURL).delete();
  }

  // to save edit messages
  /*   saveMessage(message) {
      this.firestore
        .collection(this.channelID)
        .doc(message)
        .update(this.chat$.toJSON())
    } */

  // Open dialog on Edit
  openDialog(messageID) {
    const dialogRef = this.dialog.open(DialogEditMessagesComponent);
    dialogRef.componentInstance.messageID = messageID;
    dialogRef.componentInstance.channelID = this.channelID;
  }

  // feedback on message delete succesfully
  openSnackBar() {
    this._snackBar.open('Message deleted', '', {
      duration: 3000,
    });
  }

  // feedback if nothing write in Editor
  enterMessageSnackBar() {
    this._snackBar.open('Please write something', '', {
      duration: 3000,
    });
  }

  // scroll down if new message were sent
  scrollObjectDown(object: ElementRef) {
    object.nativeElement.scrollTop = object.nativeElement.scrollHeight;
  }

  // upload filte to storage
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `uploadedImages/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.fileName = file.name;
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          this.emptyTask(task);
        }
      });
  }

  emptyTask(task) {
    task = '';
  }
  // if user delete only image
  deleteImage(downloadURL, id) {
    this.storage.storage.refFromURL(downloadURL).delete();
    this.firestore.collection(this.channelID).doc(id).update({ image: '' });
  }

  // to user details if user click on chat user
  UserDetails(details) {
    this.UserDetailsArray = this.findUSerbyId(details);
    const dialogRef = this.dialog.open(UserDetailsComponent);
    dialogRef.componentInstance.userDetailsArray = this.UserDetailsArray;
  }
  editChannel(id) {
    const dialogRef = this.dialog.open(DialogEditChannelnameComponent);
    dialogRef.componentInstance.currentChannelID = this.channelID;
  }

  // To preview image in fullscreen
  previewImage(image) {
    this.preview = true;
    this.fullscrennImage = image;
  }
}
