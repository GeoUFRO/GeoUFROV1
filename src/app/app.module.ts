import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Favs } from '../pages/favs/favs';
import { Usuario } from '../pages/usuario/usuario';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// login page
import { Login } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//servicio login
import { AuthService } from '../services/auth.service'

// google
import { GooglePlus } from '@ionic-native/google-plus';
import { GoogleMaps } from '@ionic-native/google-maps';

import { Geolocation  } from '@ionic-native/geolocation';

var config = {
    apiKey: "AIzaSyD9awpyCKnfjVOrsM4b_bEdHcW_ICkM2yA",
    authDomain: "geoufro-6e8d0.firebaseapp.com",
    databaseURL: "https://geoufro-6e8d0.firebaseio.com",
    projectId: "geoufro-6e8d0",
    storageBucket: "geoufro-6e8d0.appspot.com",
    messagingSenderId: "107240274092"
  };

@NgModule({
  declarations: [
    MyApp,
    Favs,
    Usuario,
    HomePage,
    TabsPage,
    Login
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Favs,
    Usuario,
    HomePage,
    TabsPage,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
