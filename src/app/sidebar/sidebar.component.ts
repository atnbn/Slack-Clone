import {
  Component,
  HostListener,
  Injectable,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Inject } from '@angular/core';
import { DialogAddChannelsComponent } from '../dialog-add-channels/dialog-add-channels.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import { Channel } from '../interface/channel';
import { AuthenticationService } from '../services/authentication.service';
// import { AsyncPipe } from '@angular/common';
import { DialogAddDmComponent } from '../dialog-add-dm/dialog-add-dm.component';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from '../services/sidenav.service';
// import { debug } from 'console';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { catchError, filter, throwError } from 'rxjs';
// import { doc, deleteDoc } from 'firebase/firestore';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class SidebarComponent implements OnInit {
  testUser = this.authService.auth.currentUser;
  allUsers: any = [];
  currentUser: any = [];
  currentUserID: string;
  accountUsers: any = []; // all Users
  allChannels: any = [];
  showError: any;
  DM_channels: any = [];
  allowedUsers: any = [];
  public innerWidth: any;
  allDirectChannles;

  DM: boolean = false;
  @ViewChild('drawer') public sidenav: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event?.path[0].innerWidth;
  }

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public authService: AuthenticationService,
    private sideNavService: SideNavService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserFromDB();
    // this.checkCurrentUser()
    this.toggleChannel();
    this.loadDirectMessage();
    this.loadChannels();
    //check screen size
    this.onResize(event);
    // console.log('ALL user', this.allUsers);
  }

  //Load data form firestore for channels
  loadUserFromDB() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'userId' })
      .subscribe((changes: any) => {
        this.allUsers = changes;
      });
  }

  loadChannels() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }

  //Load User data form firestore

  deleteDm() {
    this.firestore
      .collection('directMessage')
      .valueChanges({ idField: 'dmID' });
  }

  // filterUser() {
  //   return this.allUsers.filter((user: any) => {
  //     if (user.email || user.eamil) {
  //       this.accountUsers.push(user);
  //     }
  //   });
  // }

  //To Load Channel and show only to correct User
  loadDirectMessage() {
    this.firestore
      .collection('directMessage')
      .valueChanges({ idField: 'dmID' })
      .subscribe(
        (dms) => {
          dms.filter((channels) => {
            this.DM_channels = [];
            channels['users'].map((user: { uid: string }) => {
              if (user.uid === this.authService.auth.currentUser.uid) {
                // if (channels.dmID === this.DM_channels) {
                this.DM_channels.push(channels);
                console.log('Dm channels', this.DM_channels);
                // }
                /* filter((dm) =>{
                this.DM_channels.dmID === this.DM_channels.dmID
              }) */
              } else {
                console.log('duplicate');
              }
            });
          });
        },
        catchError((error) => throwError((this.showError = error)))
      );
  }

  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }

  OpenAddDmChannel() {
    this.dialog.open(DialogAddDmComponent);
  }
  //to show or hide Sidenav on Responsive
  toogelSideNav() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 766) {
      this.sidenav.toggle();
    }
  }

  /**
   * Checking that the current user has direct message, if yes show it
   */
  // filteUser() {
  //   this.DM_channels.forEach((DM: any) => {  // Loop all direct message channels

  //     DM.users.forEach((user: any) => { // Loop all users in direct message channels
  //       if (user.email ==  this.authService.auth.currentUser.email) {
  //         this.DM = true;
  //         console.log('all dm channels for me (filteUser):', this.DM_channels)
  //       }
  //     });

  //   });
  // }

  getUserNameFromDm() {
    this.dialog.open(ChatRoomComponent);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    window.location.reload();
    this.authService.loggedIn = false;
    // console.log('clicked');
  }

  toggleChannel() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidenav?.toggle();
    });
  }
}
