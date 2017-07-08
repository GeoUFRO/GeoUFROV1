import { Injectable } from '@angular/core';

// google
//import {GooglePlus} from '@ionic-native/google-plus';

// firebase
//import { FirebaseApp } from 'angularfire2';
//import firebase from 'firebase';
 
export class User {
  name: string;
  avatar: string;
  email: string;
 
  constructor(name: string, avatar: string, email: string) {
    this.name = name;
    this.avatar = avatar;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  user : User;

  constructor() {
  }
 
  public initUser(name, avatar, email){
    this.user = new User(name, avatar, email);
  }
 /*
  public login() : boolean {
    alert("aca!!");
    this.googleplus.login({
      'webClientId': '107240274092-amhb6r2ci13ic42km4ogmcsuusalv8tp.apps.googleusercontent.com'
    })
      .then((res)=> {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        this.fireauth.signInWithCredential(firecreds).then((res) => {
          this.user =  new User(res.displayName, res.photoURL, res.email);
          alert("adentro");
          return true;
        }).catch((err) => {
          alert('Firebase :( ' + err);
          return false;
        })
      }).catch((err) => {
        alert('Error: ' + err);
        return false;
      })
      return true;
  }
  */

  /*public login2(){
    return this.googleplus.login({
      'webClientId': '107240274092-amhb6r2ci13ic42km4ogmcsuusalv8tp.apps.googleusercontent.com'
    });
  }*/

  public getUserInfo() : User {
    return this.user;
  }

  public deleteUser(){
    this.user = null;
  }
 
  /*public logout() {
     this.user = null;
     this.googleplus.logout().then((res) => {
       return true;
     }).catch((error) => {
       alert(error);
       return false;
     });
     return false;
  }*/

}