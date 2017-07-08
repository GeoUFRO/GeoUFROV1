import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

// google
import {GooglePlus} from '@ionic-native/google-plus';

// firebase
import { FirebaseApp } from 'angularfire2';
import firebase from 'firebase';

//servicio login
import { AuthService } from '../../services/auth.service';


import { App } from 'ionic-angular';

/**
 * Generated class for the Usuario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class Usuario {
  name: string;
  avatar:string;
  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App, public as : AuthService, public googleplus: GooglePlus, public af: FirebaseApp) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    this.name = this.as.getUserInfo().name;
    this.avatar = this.as.getUserInfo().avatar;
    this.email = this.as.getUserInfo().email;
  }


  
  logout(){
     this.googleplus.logout().then((res) => {
       this.as.deleteUser();
       this.appCtrl.getRootNav().setRoot(Login);
     }).catch((error) => {
       alert(error);
     });
  }
 

}
