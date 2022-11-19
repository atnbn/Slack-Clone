import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs';
import { User } from '../interface/user.class';
import { AuthenticationService } from '../services/authentication.service';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@Injectable({ providedIn: 'root' })
export class ProfileComponent implements OnInit {
  user: User | undefined;
  constructor(
    private authService: AuthenticationService,
    public storage: AngularFireStorage,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService
  ) {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = new User(user);
      }
    });
  }

  ngOnInit(): void {
    console.log(User);
  }
  uploadImage(event: any) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `img/${this.user.photoURL}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading...',
          success: 'Upload Successfully',
          error: 'Upload Failed',
        }),
        map((photoURL) => {
          this.authService.updateProfileData({ photoURL });
        })
      )
      .subscribe();
  }
}
