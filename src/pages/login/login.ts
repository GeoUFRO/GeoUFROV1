import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

// google
import {GooglePlus} from '@ionic-native/google-plus';

// firebase
import { FirebaseApp } from 'angularfire2';
import firebase from 'firebase';

//servicio login
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  fireauth = firebase.auth();

  constructor(public navCtrl: NavController, public navParams: NavParams, public as : AuthService, public googleplus: GooglePlus, public af: FirebaseApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  googleauth(){
    this.googleplus.login({
      'webClientId': '107240274092-amhb6r2ci13ic42km4ogmcsuusalv8tp.apps.googleusercontent.com'
    })
      .then((res)=> {
        const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        this.fireauth.signInWithCredential(firecreds).then((res) => {
          this.as.initUser(res.displayName, res.photoURL, res.email);
          this.navCtrl.setRoot(TabsPage);
        }).catch((err) => {
          alert('Firebase :( ' + err);
        })
      }).catch((err) => {
        alert('Error: ' + err);
      })
  }

}


