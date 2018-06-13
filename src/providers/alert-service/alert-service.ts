import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import {LoadingServiceProvider} from '../../providers/loading-service/loading-service';/*
  Generated class for the AlertServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertServiceProvider {

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingServiceProvider) {
  }
  //////////////////////VENTANA DE ALERTA CON EL MENSAJE DE ERROR //////////////////////////////
    showAlert(titulo, text) {
      this.loadingCtrl.dismiss();
      let alert = this.alertCtrl.create({
        title: titulo,
        subTitle: text,
        buttons: ['OK']
      });
      alert.present();
    }
}
