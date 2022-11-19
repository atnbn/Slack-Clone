import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImprintComponent } from './imprint/imprint.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectTooHome = () => redirectLoggedInTo(['page-list']);
const routes: Routes = [

  { path: '', component: HomeComponent, ...canActivate(redirectToLogin) },

  { path: 'home', component: HomeComponent, ...canActivate(redirectToLogin) },

  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin) },

  { path: 'imprint', component: ImprintComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },

  {
    path: 'chat', component: ChatRoomComponent,
    data: { state: 'one' },
    ...canActivate(redirectToLogin)
  },

  {
    path: 'chat/:id', component: ChatRoomComponent,
    data: { state: 'two' },
    ...canActivate(redirectToLogin)
  },

  {
    path: 'chat/:id/thread/:id', component: ThreadComponent,
    data: { state: 'three' },
    ...canActivate(redirectToLogin)
  },

  {
    path: 'theard', component: ThreadComponent,
    data: { state: 'four' },
    ...canActivate(redirectToLogin)
  },

  { path: 'login', component: LoginComponent, ...canActivate(redirectTooHome) },

  { path: 'sign-up', component: SignUpComponent, },






  // { path: '', redirectTo: 'page-list', pathMatch: 'full'},
  // { path: '', component: PageListComponent, children: [
  //   { path: 'home', component: HomeComponent,  outlet: "page-list" },
  //   { path: 'chat/:id', component: ChatRoomComponent, outlet: "page-list" },
  // ], ...canActivate(redirectToLogin) },
  // { path: 'theard', component: ThreadComponent, ...canActivate(redirectToLogin) },
  // { path: 'sidebar', component: SidebarComponent},
  // { path: '', component: LoginComponent },
  // {
  //   path: 'chat', component: ChatRoomComponent
  //   , canActivate: [canActivate(redirectToLogin)]
  // },






  // { path: 'theard', component: ThreadComponent, ...canActivate(redirectToLogin) },

  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   // ...canActivate(redirectToLogin) // redirects to home if logged in
  //   ...canActivate(redirectTooHome) // redirects to home if logged in
  // },
  // {
  //   path: 'sign-up',
  //   component: SignUpComponent,
  //   // ...canActivate(redirectToLogin)   // redirectToLogin if 
  // },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   ...canActivate(redirectToLogin) // redirect to login if not logged in
  // },
  //  {
  //   path: 'chat/:id/thread/:id', component: ThreadComponent, ...canActivate(redirectToLogin) // navigate with chat/id/thread/id
  // } 
  // ,
  //  {path: 'profile', component: ProfileComponent, ...canActivate(redirectToLogin)},



];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
