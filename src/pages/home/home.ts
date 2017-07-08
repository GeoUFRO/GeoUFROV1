import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Subject} from 'rxjs/Subject';

//firebase
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//google maps
import { GoogleMap, GoogleMaps, LatLng, CameraPosition, GoogleMapsEvent, MarkerOptions, Marker } from '@ionic-native/google-maps';

//database 

//import { Location } from '../../database';


import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	//items: FirebaseListObservable<any[]>;	
  //currentCategory: Subject<any>;
  map : GoogleMap;
  locations : Array<any> = [];
  currentCat : string;
  showModal : boolean;
  nombre : string;
  telefono : string;
  email : string;
  img : string;
  //keys : Array<number> = [];

	constructor(public navCtrl: NavController, public db: AngularFireDatabase, 
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    public googleMaps: GoogleMaps, public geolocator : Geolocation) {
		//this.currentCategory = new Subject();
    this.currentCat = 'none';
    let items = db.list('/lugar'
    ).subscribe(items => {
        //this.keys = [];
    // items is an array
          items.forEach(item => {
               this.locations.push(item);
          });
          this.filterCategory('unidad');
      });
    //this.locations = [];
    
    this.nombre = "";
    this.telefono = "";
    this.email = "";
    this.img = "";
    this.showModal = false;
	}

	ionViewDidLoad() {
		//this.loadLocations();
    
    
	}


  ngAfterViewInit() {
    this.loadMap();
    //this.filterCategory('edificio');
  }

  loadMap() {
    let elementMap = document.getElementById('map');
    this.map = this.googleMaps.create(elementMap, {});


    const latlng = new LatLng(-38.747724244202736, -72.6171612739563 );

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: CameraPosition = {
          target: latlng,
          zoom: 16, //entre 15 y 19
          tilt: 30
        }
        this.map.moveCamera(position); 
        //this.addMarker(-38.747724244202736,-72.6171612739563, "first");
    });

  }

  private addMarker(lat, lng, name){
    let latlng = new LatLng(lat, lng);
    let markerOptions: MarkerOptions = {
      position: latlng,
      title: name
    };

    this.map.addMarker(markerOptions).then((marker: Marker)=>{
        marker.showInfoWindow();
        console.log("se agrega el punto");
      }).catch(()=>{
        console.log("error al agregar punto");

      });
  }

  private addLocationMarker(location){
      //filtercats[i].latitud, filtercats[i].longitud, filtercats[i].nombre
      let imgIcon = "";
      switch (location.categoria) {
        case "unidad":
          imgIcon = "https://firebasestorage.googleapis.com/v0/b/geoufro-6e8d0.appspot.com/o/pin_uni.png?alt=media&token=d7cb9fdd-d1c3-44c2-8f59-8810c13dfa51";
          break;
        case "comida":
          imgIcon = "https://firebasestorage.googleapis.com/v0/b/geoufro-6e8d0.appspot.com/o/pin_food.png?alt=media&token=7c20c6de-21bf-4fda-bda5-eb8105a2fa36";
          break;
        default:
        
          break;
      }

      let latlng = new LatLng(location.latitud, location.longitud);
      let markerOptions: MarkerOptions = {
        position: latlng,
        title: location.nombre,
        icon: {
          url: imgIcon
         }
      };

      this.map.addMarker(markerOptions).then((marker: Marker)=>{
        

        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //alert('Nombre: ' + location.nombre);
          this.nombre = location.nombre;
          this.telefono = location.telefono;
          this.email = location.email;
          this.img = location.img_url;
          if (!this.showModal){
             this.showModal = true; 
          }
                   
        });

        //marker.showInfoWindow();
        console.log("se agrega el punto");
      }).catch(()=>{
        console.log("error al agregar punto");
      });

  }

  establecerGeo(){
    alert("establecer geo");
    /*
    console.log("geooo");
    this.geolocator.getCurrentPosition().then( res => {

      const position = new LatLng(res.coords.latitude, res.coords.longitude);
      this.map.setCenter(position);
      this.map.setZoom(10);
      this.addMarker(res.coords.latitude, res.coords.longitude, "Mi Ubicación");
      console.log("Bien geolocation: " + res);
    }).catch( err => {
      console.log("Error con geolocation: " + err);
    });*/
  }

  cargarPuntos(filtercats){
     
    this.map.clear(); 
    for (var i = 0; i < filtercats.length; i++) {
      console.log("lat " + filtercats[i].latitud + " long " + filtercats[i].longitud);

      this.addLocationMarker(filtercats[i]);
    }

  }

  filterCategory(category: string) {
      //this.currentCategory.next(category); 
      //this.cargarPuntos(category);

      if (category != this.currentCat){
        this.currentCat = category;

        var filtercats = this.locations.filter(function(ele){
          return ele.categoria == category;
        });

        this.cargarPuntos(filtercats);
      }  
  }

  closeModal(){
    if (this.showModal){
      this.showModal = false;
      console.log("deberia cerrar");
    }
  }

  
  /**
	addFav(item){
    //debo ejecutar una promesa aqui
    //problemas, se demoran en volver
    this.loadLocations();

		if (this.checkFavs(item)){
  			
        let confirm = this.alertCtrl.create({
        title: 'Ya se encuentra agregado!!',
        message: 'Desea eliminar de favoritos?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Si',
            handler: () => {
              Location.remove(item.$key);
              this.loadLocations();
            }
          }
        ]
      });
      confirm.present();

    } else {
			let locations = new Location(item.$key);
      locations.save();
    	let alert = this.alertCtrl.create({
        title: 'Bien!',
        subTitle: 'Agregado',
        buttons: ['OK']
      });
      alert.present();
		  }

      //arreglar
      this.loadLocations();
  	}

  	checkFavs(item) : boolean{
  		for (let l of this.locations) {
  			if(item.$key == l.idL){
  				return true;
  			}
  		}
  		return false;
  	}**/

  	/*loadLocations(){
  		//metodo que finaliza cuando consulta es finalizada
  		Location.all().then((resultados) => {
  			this.locations = resultados;
  		});
  	}*/

}
