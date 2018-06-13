import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

export interface IBird{
  Id: number;
  Name: string;
  Image: string;
  Sightings: string;
  Mine: number;
}

@Injectable()
export class BirdsServiceProvider {
  private httpc: HttpClient;
  getBirdsUrl: string = "http://dev.contanimacion.com/birds/public/getBirds/";
  getBirdsDetailsUrl: string = "http://dev.contanimacion.com/birds/public/getBirdDetails/";
  addBirdsUrl: string = "http://dev.contanimacion.com/birds/public/addBird/";
  addBirdSghtingUrl: string = "http://dev.contanimacion.com/birds/public/addSighting/";

  private bird: IBird = {Id:0, Name: "", Image: "", Sightings: "", Mine: 0};

  constructor(public httpcli: HttpClient) {
      this.httpc = httpcli;
  }
  ////////////////////////////////FUNCION PARA OBTENER LISTADO DE AVES /////////////////////////////////////////////////
  getBirds(id: string): Observable<any>{
    return this.httpc.get(this.getBirdsUrl+id);
  }

  ////////////////////////////////FUNCION PARA OBTENER DETALLE DE UN AVE DETERMINADO ////////////////////////////////
    getBirdDetail(idBird: number): Observable<any>{
      return this.httpc.get(this.getBirdsDetailsUrl+idBird);
    }

    ////////////////////////////////FUNCION PARA AGREGAR NUEVA AVE /////////////////////////////////////////////////
    addNewBird(newAve): Observable<any>{
      let postData : any = {'idUser': newAve.idUser, 'bird_name': newAve.bird_name, 'bird_description': newAve.bird_description };
      if(newAve.placeVisible){
        postData = {'idUser': newAve.idUser, 'bird_name': newAve.bird_name, 'bird_description': newAve.bird_description, 'place': newAve.place, 'lat': newAve.lat, 'long': newAve.long};
      }
      return this.httpc.post<any>(this.addBirdsUrl,postData);
    }

  ////////////////////////////////FUNCION PARA AGREGAR UN AVISTAMIENTO DE AVE /////////////////////////////////////////////////
  addBirdSighting(sightingPlace): Observable<any>{
    return this.httpc.post<any>(this.addBirdSghtingUrl,{'idAve':sightingPlace.idAve, 'place': sightingPlace.place,
    'lat': sightingPlace.lat, 'long': sightingPlace.long });
  }
}
