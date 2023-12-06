import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { UploadService } from '../../services/upload.service';

import { global } from '../../services/global';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css'],
  providers: [ProyectoService, UploadService]
})
export class CrearProyectoComponent implements OnInit { 
  public titulo: string;
  public proyecto: Proyecto;
  public proyectoGuardado: Proyecto;
  public estado: string;
  public archivosUpload: Array<File>;
  
  constructor(private _proyectoService: ProyectoService, private _uploadService: UploadService) {
    this.titulo = "Crear proyecto";
    this.proyecto = new Proyecto("", "PrimerFullStack", "Aplicación Cuatica", "Desarrollo WEB", "PHP, JavaScript", 2021, "");
    this.estado = "";
  }
  
  ngOnInit(): void {
  }

  onSubmit(formulario: any): void {
    this._proyectoService.saveProyecto(this.proyecto).subscribe((response) => {
      if (response.proyectoGuardado) {
        if (this.archivosUpload) {
          this.estado = "exito";
          this._uploadService.makeFileRequest(global.url + "proyecto/upload-file-imagen/" + response.proyectoGuardado._id, [], this.archivosUpload, "imagen")
          .then((resultado) => {
            this.proyectoGuardado = response.proyectoGuardado;
            console.log(resultado); //Aquí se muestra en consola lo que retorna el backend (Es el retorno del Endpoint "Upload Imagen").
          })
          .catch((error) => {
            console.log("Ha ocurrido un error");
          });
        } else {
          this.proyectoGuardado = response.proyectoGuardado;
          this.estado = "exito";
        }
      }
      else {
        this.estado = "error";
      }
    },
    (error) => {
      console.log("Ha ocurrido un error");
    });
    formulario.reset();
  }

  fileChangeEvent(fileInput: any): void {
    this.archivosUpload = <Array<File>>fileInput.target.files; //Donde dice "<Array<File>>" es un cast de datos (Se forza a que los datos sean de tipo File).
  }

}