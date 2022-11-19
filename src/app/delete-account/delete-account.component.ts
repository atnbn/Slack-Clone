import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router : Router
  ) { }

  ngOnInit(): void {
  }

  deleteAccount(){
    this.authService.deleteUser();
    setTimeout(() => {
      window.location.reload();
      this.authService.loggedIn = false;
      this.router.navigate(['login']);
    }, 3000);
  }
}
