export interface UserInterface {
  displayName: string;
  uid: string;
  email: string;
  password: string;
  photoUrl: string;
}

export class User {
  displayName!: string;
  photoURL: string;
  email!: string;
  uid: string;

  constructor(userJSON?: any) {
    this.displayName = userJSON ? userJSON.displayName : '';
    // this.key = userJSON ? userJSON.key : '';
    this.photoURL = userJSON ? userJSON.photoURL : '';
    this.email = userJSON ? userJSON.email : '';
    this.uid = userJSON ? userJSON.uid : '';
  }

  toJSON() {
    return {
      name: this.displayName,
      photoURL: this.photoURL,
      eamil: this.email,
      uid: this.uid,
    };
  }
}
