import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/interface/user.class';
import { GuestNameComponent } from '../guest-name/guest-name.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})

export class LoginComponent implements OnInit {

  userKey:any ='';
  user: User;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    public dialog: MatDialog

  ) { }



  ngOnInit(): void {
  }

  get email() {  // getter for email field
    return this.loginForm.get('email');
  }
  get password() {    // getter for password field
    return this.loginForm.get('password');

  }

  submit() {
    if (!this.loginForm.valid) {
      
      return;
    }
    const { email, password } = this.loginForm.value;   // get the values from the form
    this.authService.login(email, password).pipe(   // login user
      this.toast.observe({
        success: 'Login Successful',   // success message
        loading: 'Logging in...',       // loading message
        error:  ({message}) => `${message}`     // error message
      })


    ).subscribe((user) => {
      this.authService.loggedIn = true
      this.userKey = user.user.uid;
      this.router.navigate(['home']);
    });
  }
  enterGuestName(){
    this.dialog.open(GuestNameComponent);
  }
  guestSignIn(){
    this.authService.guestLogin();
  }
  
}

