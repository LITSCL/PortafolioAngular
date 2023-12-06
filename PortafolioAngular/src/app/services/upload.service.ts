import { Injectable } from '@angular/core';
import { global } from './global';

@Injectable()
export class UploadService {
private url: string;

  constructor() {
    this.url = global.url;
  }

  public testService(): string {
    return "Probando el servicio Upload";
  }

  //Este método realiza una petición AJAX para subir un archivo.
  public makeFileRequest(url: string, params: Array<string>, archivos: Array<File>, nombre: string) {
    return new Promise((resolve, reject) => {
      var formData: FormData = new FormData();
      var xhr: XMLHttpRequest = new XMLHttpRequest();

      for (var i = 0; i < archivos.length; i++) {
        formData.append(nombre, archivos[i], archivos[i].name);
      }
    
      //Aquí se realiza la petición AJAX.
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) { //Código 200.
            return resolve(JSON.parse(xhr.response));
          }
          else {
            return reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
}