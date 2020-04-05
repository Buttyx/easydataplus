import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {MatSnackBar} from '@angular/material/snack-bar';

import {Observable} from 'rxjs';
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
   user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, public snackBar: MatSnackBar, private router: Router) {
    this.user = firebaseAuth.authState;

  }

  isLoggedIn() {
    return (localStorage.getItem("user") === 'true') ? true : false;
  }


  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        let snackBarRef = this.snackBar.open('You are signed in. Now you can log in', 'OK', {verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 1000
        });
        console.log('Success!', value);
      })
      .catch(err => {
        let snackBarRef = this.snackBar.open('Domain is already Registered', 'Retry', {verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        });
        console.log('Something went wrong:',err.message);
      });

  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        localStorage.setItem("user",'true');
        localStorage.setItem("idToken", await value.user.getIdToken());
        this.rerout('start');
      })
      .catch(err => {
        let snackBarRef = this.snackBar.open('Invalid Password or Username', 'Retry', {verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        });

        this.rerout('home');
      });
  }

  logout() {
    this.firebaseAuth
      .signOut();
    localStorage.setItem("idToken", '');
    localStorage.setItem("user",'false');
    this.rerout('home')
  }

  rerout(rout:string){
    this.router.navigate([rout]);
  }

}
