import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelsComponent } from './dialog-add-channels/dialog-add-channels.component';
import { AuthenticationService } from './services/authentication.service';
import { Auth, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // @Input() channelName: any;
  // @Input() channelDescripton: any;


  // constructor(firestore: AngularFirestore,
  //   public dialog: MatDialog,
  //   public authService: AuthenticationService,
  //   private router: Router) {}
  

  // logout(){
  //   this.authService.logout().subscribe(() => {
  //     this.router.navigate(['login']);
  //   });
  // }

  currentUser$ = authState(this.auth)  

  openDialog() {
    this.dialog.open(DialogAddChannelsComponent);
  }

  constructor(firestore: AngularFirestore,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public auth: Auth,
    private route: Router,
  ) {}
  
}
