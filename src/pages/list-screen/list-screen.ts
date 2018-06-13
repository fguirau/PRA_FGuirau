import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BirdsServiceProvider} from '../../providers/birds-service/birds-service';
import { LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {AlertServiceProvider} from '../../providers/alert-service/alert-service';
import { DetailScreenPage } from '../detail-screen/detail-screen';
import { LoginScreenPage } from '../login-screen/login-screen';
import { MenuScreenPage } from '../menu-screen/menu-screen';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-list-screen',
  templateUrl: 'list-screen.html',
})
export class ListScreenPage {

  public birdList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertServiceProvider,
    private loadingCtrl: LoadingServiceProvider, private birdsService: BirdsServiceProvider, private storage: Storage) {
    this.storage.get("islogged").then((value) => {
        if(!value){ this.navCtrl.push(LoginScreenPage);} //SI no está logueado lo mando al login
      });

      this.storage.get("idUser").then((clave) => {
          if(clave){ this.getBirds( clave);} //SI está logueado obtengo la lista de aves
        });
  }

////////////////////////////////////////////////OBTENGO EL LISTADO DE AVES///////////////////////////////////////////
  public getBirds(idUser: string){
    this.loadingCtrl.showLoading("Por favor Espere! Cargando Listado de Aves..."); //Cargo el Loading
    this.birdsService.getBirds(idUser).subscribe(
      listaAves=>{
        this.birdList = listaAves;
        console.log(this.birdList);
      },
      error=>{
        this.alertCtrl.showAlert("Error","Error Cargando Listado de Aves. Vuelva a intentarlo!");  //Muestro mensaje de error
      }
    );
  }

  //////////////////////////////////////OBTENER EL DETALLE DE UN AVE EN CONCRETO (idBird)///////////////////////////////
  public viewBird(idBird: number){
      this.loadingCtrl.showLoading("Por favor Espere! Cargando Información del Ave ..."); //Cargo el Loading
      this.birdsService.getBirdDetail(idBird).subscribe(
          birdDetail=>{
            this.navCtrl.push(DetailScreenPage,{idBird: birdDetail[0]});
          },
          error=>{
            this.alertCtrl.showAlert("Error","Error Cargando Información del Ave. Vuelva a intentarlo!");  //Muestro mensaje de error
          }
        );
    }

    ///////////////////////////////////////////////////FUNCION PARA VOLVER A LA PÁGINA DE MENU DE APP///////////////////////////////////
    back(){
      this.navCtrl.push(MenuScreenPage);
    }

}
