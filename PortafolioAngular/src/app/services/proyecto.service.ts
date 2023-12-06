import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Estos módulos son necesarios para realizar peticiones AJAX.
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

import { global } from './global';

@Injectable()
export class ProyectoService {
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  public testService(): string {
    return "Probando el servicio Proyecto";
  }

  public saveProyecto(proyecto: Proyecto): Observable<any> {
    var params = JSON.stringify(proyecto);
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    
    return this._http.post(this.url + "proyecto/save-proyecto", params, {headers: headers});
  }

  public getProyecto(id: string): Observable<any> {
    var headers = new HttpHeaders().set("Content-Type", "application/json");

    return this._http.get(this.url + "proyecto/get-proyecto/" + id, {headers: headers});
  }

  public getProyectos(): Observable<any> {
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(this.url + "proyecto/get-proyectos", {headers: headers});
  }

  public deleteProyecto(id: string): Observable<any> {
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.delete(this.url + "proyecto/delete-proyecto/" + id, {headers: headers});
  }

  public updateProyecto(proyecto: Proyecto): Observable<any> {
    var params = JSON.stringify(proyecto);
    var headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.put(this.url + "proyecto/update-proyecto/" + proyecto._id, params, {headers: headers});
  }
}