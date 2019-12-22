import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) {

  }

  async onEmailandPasswordSignIn(emailID, password) {
    console.log("onEmailandPasswordSignIn->email", emailID);
    console.log("onEmailandPasswordSignIn->password", password);
    auth()
      .signInWithEmailAndPassword(emailID, password)
      .then((firebaseUser) => {
        if (firebaseUser) {
          //this.setUserData(firebaseUser.user);
          console.log("Login Success", firebaseUser.user);
          this.router.navigateByUrl('/property');
        }
      })
      .catch((error) => {
        console.log("Login Error Message", error)
        var message: string = error.code
        if (message.includes('invalid-email')) {
          this.errorMessage = 'Please Enter Valid EmailId'
        } else if (message.includes('wrong-password')) {
          this.errorMessage = 'Password is incorrect.'
        } else if (message.includes('not-found')) {
          this.errorMessage = 'Email Id is incorrect.'
        }
      });
  }


  logout() {
    localStorage.clear();
    this.afAuth.auth.signOut();
    console.log("user logout");
    return this.router.navigate(["/"]);

  }
}
