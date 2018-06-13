import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ListScreenPage } from '../list-screen/list-screen';
import { MenuScreenPage } from '../menu-screen/menu-screen';
import { LoginScreenPage } from '../login-screen/login-screen';
import { Geolocation } from '@ionic-native/geolocation';
import {AlertServiceProvider} from '../../providers/alert-service/alert-service';
import { LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import { BirdsServiceProvider} from '../../providers/birds-service/birds-service';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-addbird-screen',
  templateUrl: 'addbird-screen.html',
})
export class AddbirdScreenPage {
      private myForm : FormGroup;
      private isActive = false;
      responseData: any;
      birdList: any;
      private newAve = {idUser:'0', bird_name:'', bird_description:'', placeVisible:false, place:'', lat:'', long:'', idAve:0};
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingServiceProvider,
    private formBuilder: FormBuilder, private alertCtrl: AlertServiceProvider, private geolocation: Geolocation,
    private birdsService: BirdsServiceProvider, private storage: Storage) {

      this.storage.get("islogged").then((value) => {  //Compruebo si está logueado
          if(!value){ this.navCtrl.push(LoginScreenPage);} //SI no estaba logueado lo mando a pantalla de login
        });
      this.storage.get("idUser").then((value) => {  //Obtengo el id del Usuario
          if(value!=""){ this.newAve.idUser = value;} //Guardo el id del usuario
        });

    this.myForm = this.formBuilder.group({  //Establezo eglas y campos del formualrio
    name: ['', Validators.required],
    description: ['', Validators.compose([Validators.minLength(20), Validators.required])],
    placeVisible: [''],
    place: ['',],
    lat: [{value:'', disabled:true}],
    long: [{value:'', disabled:true}],
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbirdScreenPage');

  }
  ///////////////////////////////////////////////////FUNCION PARA VOLVER A MENU PRINCIPAL///////////////////////////////////
  back(){
    this.navCtrl.push(MenuScreenPage);
  }
/////////////////////////////////////////////FUNCION PARA OBTENER GEOLOCALIZACIÓN//////////////////////////////////////////
getLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
      this.newAve.lat = resp.coords.latitude.toString();   //obtengo Latitud
      this.newAve.long = resp.coords.longitude.toString(); //Obtengo Longitud
    }).catch((error) => {
      this.alertCtrl.showAlert("Error","Error Obteniendo Ubicación. Por favor active GPS en su dispositivo.");  //Muestro mensaje de error
    });
}
/////////////////////////FUNCION PARA VER SI ACTIVO EL BOTON DE ENVIAR////////////////////////////////////
Comprobar(){
  if(this.newAve.placeVisible){ //Si está marcado el check de avistamiento
    if(this.newAve.place.length>0 && this.newAve.lat!=""){ //Si he introducido un lugar y he obtenido coordenadas
      this.isActive = true;  //Entonces se puede activar el botón de Add Bird
    }
    else{
      this.isActive = false;  //Entonces desactivo el botón de Add Bird
    }
  }else{  //Si no está marcado el checkbox
    this.isActive=true; //Puedo activar el botón si el formulario es válido
  }
}
  /////////////////////////FUNCION PARA CHEQUEAR SI HAY AVISTAMIENTO////////////////////////////////////
  checkLocation(){
    this.Comprobar(); //Compruebo si el botón se puede activar
    if (this.newAve.placeVisible){  //Si está activo obtengo localización
      this.getLocation(); //Intento obtener geolocalización
    }
  }
  /////////////////////////////////////FUNCION PARA AÑADIR NUEVA AVE ////////////////////////////
  addBird(){
  console.log("Los datos del Nuevo Ave son: ",this.newAve);
  this.loadingCtrl.showLoading("Por favor espere!. Añadiendo nueva Ave..."); //Cargo el Loading
  this.birdsService.addNewBird(this.newAve).subscribe(
        res => {
          this.responseData = res;
          console.log("RESPUESTA", res);
          if(res.status === "OK"){
              this.alertCtrl.showAlert("Bien hecho!","Nueva Ave Añadida!");  //Muestro mensaje de alerta
              this.navCtrl.push(ListScreenPage); //Navego a la pantalla de Listado de Aves
          }
          else{
            this.alertCtrl.showAlert("Error","Error Añadiendo Nueva Ave");  //Muestro mensaje de error
          }
        },
        error=>{
          this.alertCtrl.showAlert("Error","Error Añadiendo Nueva Ave");  //Muestro mensaje de error
      }
    );
  }
}
