import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { MenuScreenPage } from '../menu-screen/menu-screen';
import { NgForm } from '@angular/forms';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';
import {AlertServiceProvider} from '../../providers/alert-service/alert-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login-screen.html'
})

export class LoginScreenPage {

    loginCredentials = { id:'', email: '', password: '' };
    responseData: any;
    private todo : FormGroup;
  constructor(public navCtrl: NavController,  private auth: AuthServiceProvider,
    private alertCtrl: AlertServiceProvider, private loadingCtrl: LoadingServiceProvider,
    private storage: Storage, private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
    email: ['', Validators.compose([Validators.minLength(2), Validators.required])],
    password: ['', Validators.compose([Validators.minLength(2), Validators.required])]
    });
    this.storage.get("islogged").then((value) => {
        if(value){ this.navCtrl.setRoot('MenuScreenPage');} //SI ya estaba logueado lo mando al menú
      });
  }
  ////////////////FUNCION PARA COMPROBAR EL LOGIN DEL USUARIO/////////////////////////////////
  public ComprobarLogin() {
    this.loadingCtrl.showLoading("Por favor Espere! Comprobando Usuario..."); //Cargo el Loading
    this.auth.login(this.loginCredentials).then((res) => {  //Obtengo credenciales
      this.responseData = res;
      if(res["status"] === "OK"){                               //Si la respuesta es corecta
          this.loginCredentials.id = res["id"];
          this.auth.saveUser(this.loginCredentials);            //Guardo los datos del usuario localmente
          this.storage.set('idUser', this.loginCredentials.id); //Almaceno el id del Usuario en el dispositivo
          this.storage.set('userName',this.loginCredentials.email); //Almaceno el nombre del Usuario en el dispositivo
          this.storage.set('islogged', true);                       //Almaceno el estado de la conexión (conetado)
          this.navCtrl.setRoot('MenuScreenPage',{idUser: this.loginCredentials.id}); //Navego a la pantalla de Menú pasándo el id del Usuario

      }
      else{
          this.alertCtrl.showAlert("Error","Acceso Denegado! Compruebe sus datos y vuelva a intentarlo!");  //Muestro mensaje de error
      }
    })
    .catch ((error) =>{
        console.log(error);
        this.alertCtrl.showAlert("Error","Acceso Denegado! Compruebe sus datos y vuelva a intentarlo!");  //Muestro mensaje de error
    });
  }



}
