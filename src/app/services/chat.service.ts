import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentChatID: string;

  constructor(private firestore: AngularFirestore) { }

  loadCurrentChat(paramsID: string) {
    this.currentChatID = paramsID; 
    
    this.firestore
      .collection('channels')
      .doc(paramsID)
      .valueChanges()
      .subscribe((chat: any) => {
      });
  }  
}
