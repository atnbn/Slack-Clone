import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password && confirmPassword && password !== confirmPassword) {
      // Here we check if the password and the second password are equal
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );
  user = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {}

  get name() {
    // Here we get the name of the user
    return this.signUpForm.get('name'), this.user.get('name');
  }
  get email() {
    // Here we get the email of the user
    return this.signUpForm.get('email'), this.user.get('name');
  }
  get password() {
    // Here we get the password of the user
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    // Here we get the confirm password of the user
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const { name, email, password } = this.signUpForm.value; // Here we get the values of the formuu
    this.authService
      .signUp(name, email, password)
      .pipe(
        // Here we sign up the user
        this.toast.observe({
          // Here we show a toast message
          success: 'User created successfully',
          loading: 'Creating user...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        // Here we navigate to the login page if successful
        this.router.navigate(['home']);
      });
  }
}
