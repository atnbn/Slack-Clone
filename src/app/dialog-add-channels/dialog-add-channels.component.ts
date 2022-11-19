import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../interface/channel';


@Component({
  selector: 'app-dialog-add-channels',
  templateUrl: './dialog-add-channels.component.html',
  styleUrls: ['./dialog-add-channels.component.scss']
})

export class DialogAddChannelsComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) {   }
   myChannel: Channel = new Channel();

  ngOnInit(): void {
  }

  createChannel() {
    this.firestore
    .collection('channels')
    .add(this.myChannel.toJSON())
    .then( (channel: any) => {
      this.router.navigateByUrl('/chat/' + channel.id)
    });

  }
}
