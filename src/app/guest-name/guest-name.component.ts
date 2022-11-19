import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guest } from '../interface/guest';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-guest-name',
  templateUrl: './guest-name.component.html',
  styleUrls: ['./guest-name.component.scss']
})
export class GuestNameComponent implements OnInit {

  constructor(public AuthService: AuthenticationService,
    public Dialog: MatDialog
  ) { }
  @Input() GusetName;
  guest: Guest;

  ngOnInit(): void {
  }

  Update() {
    if (!this.GusetName) {
      return
    } else
      this.Dialog.closeAll()
    this.AuthService.GuestName = this.GusetName;
    this.AuthService.guestLogin();
  }
}
