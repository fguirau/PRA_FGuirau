import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading} from 'ionic-angular';

/*
  Generated class for the LoadingServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingServiceProvider {
  loading: Loading;
  constructor(private loadingCtrl: LoadingController) {

  }

  //////////////////////VENTANA EMERGENTE //////////////////////////////
    showLoading(text) {
      this.loading = this.loadingCtrl.create({
        content: text,
        dismissOnPageChange: true
      });
      this.loading.present();
    }
  //////////////////////ELIMINAR VENTANA EMERGENTE //////////////////////////////
    dismiss(){
      this.loading.dismiss();
    }
}
