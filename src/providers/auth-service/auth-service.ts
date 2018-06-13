import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

interface IUser {
    Id: string;
    Email: string;
    Password: string;
}

@Injectable()
export class AuthServiceProvider {
    private currentUser: IUser = {Id: "", Email: "", Password: ""};
    loginUrl: string = "http://dev.contanimacion.com/birds/public/login/";
    private httpClient: HttpClient;

    constructor(public http: HttpClient, private storage: Storage ){
      this.httpClient = http;
    }
      login(credentials){
        let postData = {'user': credentials.email, 'password':credentials.password}; //Asigno los valores de email y password
        return new Promise((resolve, reject) => {
            this.httpClient.post(this.loginUrl,postData)
            .subscribe(res => {
              console.log('API Response : ', res);
              resolve(res);
            }, (error) => {
              console.error('API Error : ', error.status);
              reject(error);
            });
        });
      }

/////////////////////////////FUNCION PARA GUARDAR CREDENCIALES DEL USUARIO////////////////////////////
      saveUser(credentials){
        this.currentUser.Id = credentials.id;
        this.currentUser.Email = credentials.email;
        this.currentUser.Password = credentials.password;
      }
/////////////////////////////FUNCION PARA DEVOLVER EL USUARIO ACTUAL////////////////////////////
  getUserInfo(){
    return this.currentUser;
}

///////////////////FUNCION PARA DESCONECTAR USUARIO/////////////////////
  public logout(){
        return Observable.create(observer => {
            this.storage.set("islogged",false);
            this.storage.remove("idUser");
            this.storage.remove("userName");
            observer.next(true);
            observer.complete();
          });
        }
}
