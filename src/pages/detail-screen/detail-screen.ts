import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListScreenPage } from '../list-screen/list-screen';
import { AddsightingScreenPage } from '../addsighting-screen/addsighting-screen';
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
  long: string;
  lat: string;
}


@IonicPage()
@Component({
  selector: 'page-detail-screen',
  templateUrl: 'detail-screen.html',
})
export class DetailScreenPage {
  private bird: IBirdDetail;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bird = navParams.get("idBird"); //Obtengo los datos del Ave pasada en la llamada
    console.log("Detalle de: ", this.bird);
  }

  ///////////////////////////////////////////////////FUNCION PARA VOLVER A LA PÁGINA DE LISTADO DE AVES///////////////////////////////////
  back(){
    this.navCtrl.push(ListScreenPage);
  }
  ///////////////////////////////////////////////////FUNCION PARA LLAMAR A LA PAGINA DE AGREGAR AVISTAMIENTO//////////////////////////////
  addSighting(){
    this.navCtrl.push(AddsightingScreenPage, { bird: this.bird });
  }
}
