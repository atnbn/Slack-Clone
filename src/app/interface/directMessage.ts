export interface DirectMassage {
  name: string;
  users: string[];
  key?: string;
}

// export class DirectMassage {
//   name!: string;
//   users!: string[]; // Array containing user UID's from Firebase Auth
//   key!: string;

//   constructor(directMassageJSON?: DirectMassage) {
//     this.name = directMassageJSON ? directMassageJSON.name : '';
//     this.users = directMassageJSON ? directMassageJSON.users : [];
//     this.key = directMassageJSON ? directMassageJSON.key : '';
//   }

//   toJSON() {
//     return {
//       name: this.name,
//       users: this.users,
//       key: this.key,
//     };
//   }
// }