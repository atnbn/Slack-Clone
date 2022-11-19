import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ThreadComponent } from './thread/thread.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddChannelsComponent } from './dialog-add-channels/dialog-add-channels.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageComponent } from './message/message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth, } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './log-in/log-in.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { PageListComponent } from './page-list/page-list.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './profile/profile.component';
import { DialogEditMessagesComponent } from './dialog-edit-messages/dialog-edit-messages.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DialogAddDmComponent } from './dialog-add-dm/dialog-add-dm.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireModule } from '@angular/fire/compat';
import { MatListModule } from '@angular/material/list';
import { UserDetailsComponent } from './user-details/user-details.component';
import { DialogEditChannelnameComponent } from './dialog-edit-channelname/dialog-edit-channelname.component';
import { MatCardModule } from '@angular/material/card';
import { GuestNameComponent } from './guest-name/guest-name.component';
import { FooterComponent } from './footer/footer.component';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatRoomComponent,
    ThreadComponent,
    DialogAddChannelsComponent,
    MessageComponent,
    SidebarComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    LoginComponent,
    StartScreenComponent,
    PageListComponent,
    ProfileComponent,
    DialogEditMessagesComponent,
    DialogAddDmComponent,
    UserDetailsComponent,
    DialogEditChannelnameComponent,
    GuestNameComponent,
    FooterComponent,
    ImprintComponent,
    LegalNoticeComponent,
    DeleteAccountComponent

  ],
  imports: [
    MatTreeModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatTreeModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    EditorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    HotToastModule.forRoot(),
    MatMenuModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
