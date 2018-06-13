import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginScreenPage } from '../login-screen/login-screen';
import { ListScreenPage } from '../list-screen/list-screen';
import { AddbirdScreenPage } from '../addbird-screen/addbird-screen';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {AlertServiceProvider} from '../../providers/alert-service/alert-service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-menu-screen',
  templateUrl: 'menu-screen.html'
})
export class MenuScreenPage {
    userName: string;
    idUser: string;
  constructor(public app: App, public navCtrl: NavController, private auth: AuthServiceProvider,
    public navParams: NavParams, private storage: Storage,private alertCtrl: AlertServiceProvider,
    private loadingCtrl: LoadingServiceProvider) {
    this.storage.get("islogged").then((value) => {
        if(!value){ this.navCtrl.push(LoginScreenPage);} //SI no está logueado lo mando al login
      });
    this.storage.get("userName").then((value) => {  //Obtengo nombre de Usuario
        if(value){  this.userName = value;} //SI está logueado obtengo nombre de usuario
    });
    this.storage.get("idUser").then((value) => {  //Obtengo Id de Usuario
        if(value){  this.idUser = value;} //SI está logueado obtengo id de usuario
    });
  }

////////////////////////////FUNCION PARA DESCONECTAR AL USUARIO//////////////////////////////////////////
  public logout(){
    this.auth.logout().subscribe (succ =>{
      this.navCtrl.push(LoginScreenPage);
    });
  }
////////////////////////////FUNCION PARA LLAMAR A LA PAGINA QUE LISTA LAS AVES//////////////////////////////////////////
  public birdsList(){
      this.navCtrl.push(ListScreenPage);
  }
////////////////////////////FUNCION PARA LLAMAR A LA PAGINA QUE INSERTA NUEVA AVE//////////////////////////////////////////
    public addBird(){
        this.navCtrl.push(AddbirdScreenPage);
    }

  ////////////////////////////FUNCION PARA MOSTRAR INFO DE USUARIO//////////////////////////////////////////
  public infoUser(){
      this.loadingCtrl.showLoading("Por favor Espere! Cargando Perfil de Usuario..."); //Cargo el Loading
      this.alertCtrl.showAlert("Perfil Usuario","<p>Usuario:<br><strong>"+this.userName+"</strong></p><p>Usuario ID:<br><strong>"+this.idUser+"</strong></p>");  //Muestro mensaje de error
  }
}
