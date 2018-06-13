import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DetailScreenPage } from '../detail-screen/detail-screen';
import { BirdsServiceProvider} from '../../providers/birds-service/birds-service';
import { LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {AlertServiceProvider} from '../../providers/alert-service/alert-service';
export interface IBirdDetail{
  id: number;
  bird_image: string;
  bird_name: string;
  bird_description: string;
  bird_sightings: number;
  sightings_list: [IBirdDetailSightings];
}

export interface IBirdDetailSightings{
  id: number;
  idAve: number;
  place: string;
  lat: string;
  long: string;
}
@IonicPage()
@Component({
  selector: 'page-addsighting-screen',
  templateUrl: 'addsighting-screen.html',
})
export class AddsightingScreenPage {
    private todo : FormGroup;
    private bird: IBirdDetail;
    private sightingPlace: IBirdDetailSightings ={id:0,idAve:0,place:'',lat:'',long:''};
    responseData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertServiceProvider,
    private loadingCtrl: LoadingServiceProvider, private geolocation: Geolocation, private formBuilder: FormBuilder, private birdsService: BirdsServiceProvider) {
      console.log("AVE: ",this.navParams.get("bird"));
      this.bird = navParams.get("bird"); //Obtengo los datos del Ave pasada en la llamada
      this.sightingPlace.idAve = this.bird.id;  //Obtengo el id el Ave
      this.todo = this.formBuilder.group({
      place: ['', Validators.required],
      lat: [{value:'', disabled:true}, Validators.required],
      long: [{value:'', disabled:true}, Validators.required],
    });
      this.getLocation(); //Intento Obtener la geolocalización
  }
  //Función para obtener geolocalización
  getLocation(){
    this.loadingCtrl.showLoading("Por favor Espere! Obteniendo Ubicación..."); //Cargo el Loading
    this.geolocation.getCurrentPosition().then((resp) => {
        this.sightingPlace.lat = resp.coords.latitude.toString();   //obtengo Latitud
        this.sightingPlace.long = resp.coords.longitude.toString(); //Obtengo Longitud
      }).catch((error) => {
        this.alertCtrl.showAlert("Error","Error Obteniendo Ubicación. Por favor active el GPS en su dispositivo.");  //Muestro mensaje de error
      });
  }
  //Función para agregar Avistamiento
  addSightingForm(){
    this.loadingCtrl.showLoading("Por favor Espere! Añadiendo Avistamiento..."); //Cargo el Loading
    this.birdsService.addBirdSighting(this.sightingPlace).subscribe(    //Llamo desde el servicio
          res => {
            console.log(res);
            this.responseData = res;
            if(res.status === "OK"){
              this.alertCtrl.showAlert("Bien Hecho!","Nuevo Avistamiento Agregado Correctamente!");  //Muestro mensaje de alerta
              this.birdsService.getBirdDetail(this.bird.id).subscribe(  //Recargo los datos de avistamiento
                  birdDetail=>{
                    this.navCtrl.push(DetailScreenPage,{idBird:birdDetail[0]}); //Navego a la pantalla de detalle del Ave
                  },
                  error=>{
                    this.alertCtrl.showAlert("Error","Error Cargando Detalle del Ave ");  //Muestro mensaje de error
                  }
              );
            }
            else{
              this.alertCtrl.showAlert("Error","Error Agregando Nuevo Avistamiento. Vuelva a Intentarlo!");  //Muestro mensaje de error
            }
        },
        error=>{
          this.alertCtrl.showAlert("Error","Error Agregando Nuevo Avistamiento. Vuelva a Intentarlo!");  //Muestro mensaje de error
      }
    );
  }

  ionViewDidLoad() {
  }

}
