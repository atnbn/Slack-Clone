import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { PageListComponent } from '../page-list/page-list.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { SideNavService } from '../services/sidenav.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { User } from '../interface/guest';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class HeaderComponent implements OnInit {
  drawer;
  @Input() inputSideNav: MatDrawer;
  @Input() responsvie;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    public Sidnav: PageListComponent,
    public draw: SideNavService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log(this.authService);
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  closeMenu() {
    this.draw.toggle();
  }

  changeProfileImg() {}

  // delete account form Firebase
  deleteAccount() {
    this.dialog.open(DeleteAccountComponent);
    /*   this.authService.deleteUser();
    setTimeout(() => {
      window.location.reload();
      this.authService.loggedIn = false;

      this.router.navigate(['login']);

    }, 3000);
 */
  }
}
