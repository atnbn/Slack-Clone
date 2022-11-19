import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  // @Input() messagefromFire:any= [];

  constructor(public authService: AuthenticationService,
    public Messages: ChatRoomComponent,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

}
