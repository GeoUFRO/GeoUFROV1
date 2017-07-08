import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//database 

import { Location } from '../../database';

//firebase
import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the Favs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favs',
  templateUrl: 'favs.html',
})
export class Favs {
 
  favs : Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    
  }

  ionViewDidEnter() {
    this.favs = [];
    this.loadLocations();
  }

  loadOnlyFavs(key : string){
    this.favs = [];
  	const fav = this.db.object('/lugar/'+key
     );
    
    fav.subscribe(result => {
      this.favs = [];
      this.favs.push(result)
      console.log(result);
    });
   
    console.log("division");
    
     
  }

  loadLocations(){
  		//metodo que finaliza cuando consulta es finalizada
  		Location.all().then((resultados) => {
        for (let l of resultados) {
          this.loadOnlyFavs(l.idL);
        }
  		});
  	}

}
