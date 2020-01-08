import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

import { UserInterface } from "../interfaces/user.interface";

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private eventAuthError = new BehaviorSubject<string>("");
    eventAuthError$ = this.eventAuthError.asObservable();

    userData: any; // Save logged in user data
    authState: any = null;

    constructor(
        public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router,
        public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {

        this.afAuth.authState.subscribe(user => {
            this.authState = user;
        });
    }

    LogIn(email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                });
                this.getUserById(result.user.uid).subscribe(user => {
                    this.userData = user;
                    this.userData.emailVerified = result.user.emailVerified;
                    this.SetUserData(this.userData);
                });
            }).catch((error) => {
                this.eventAuthError.next(error);
            });
    }

    getUserById(id) {
        return this.afs.collection('users').doc(id).valueChanges();
    }

    SignUp(user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                this.SendVerificationMail();
                this.userData = user;
                this.SetUserData(result.user);
            }).catch((error) => {
                this.eventAuthError.next(error);
            });
    }

    SendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.router.navigate(['verify-email']);
            });
    }

    ForgotPassword(passwordResetEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.eventAuthError.next('Password reset email sent, check your inbox.');
            }).catch((error) => {
                this.eventAuthError.next(error);
            });
    }

    // Returns true when user is loged in and email is verified
    get isLoggedIn(): boolean {
        if (this.authState)
            return (this.userData !== null && this.userData.emailVerified !== false) ? true : false;
    }

    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    AuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                })
                this.SetUserData(result.user);
            }).catch((error) => {
                this.eventAuthError.next(error);
            });
    }

    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: UserInterface = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || this.userData.firstName + " " + this.userData.lastName,
            photoURL: user.photoURL || "../../../assets/img/avatar.jpg",
            emailVerified: user.emailVerified
        }
        this.userData = userData;
        return userRef.set(userData);
    }

    SignOut() {
        return this.afAuth.auth.signOut().then(() => {
            this.authState = null;
            this.router.navigate(['log-in']);
        });
    }
}