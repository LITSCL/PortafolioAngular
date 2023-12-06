import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { global } from '../../services/global';

@Component({
  selector: 'app-editar',
  templateUrl: '../crear-proyecto/crear-proyecto.component.html', //Aquí se esta utilizando la vista de otro componente.
  styleUrls: ['../crear-proyecto/crear-proyecto.component.css'], //Aquí se esta utilizando la hoja de estilos de otro componente.
  providers: [ProyectoService, UploadService]
})
export class EditarComponent implements OnInit {
  public titulo: string;
  public proyecto: Proyecto;
  public proyectoGuardado: Proyecto;
  public estado: string;
  public archivosUpload: Array<File>;
  public url: string;
  
  constructor(private _proyectoService: ProyectoService, private _uploadService: UploadService, public _route: ActivatedRoute) {
    this.titulo = "Editar proyecto";
    this.estado = "";
    this.url = global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      var id = params.id;
      this.getProyecto(id);
    });
  }

  onSubmit(): void {
    this._proyectoService.updateProyecto(this.proyecto).subscribe((response) => {
      if (response.proyectoActualizado) {
        if (this.archivosUpload) {
          this.estado = "exito";
          this._uploadService.makeFileRequest(global.url + "proyecto/upload-file-imagen/" + response.proyectoActualizado._id, [], this.archivosUpload, "imagen")
          .then((resultado) => {
            this.proyectoGuardado = response.proyectoActualizado;
            console.log(resultado); //Aquí se muestra en consola lo que retorna el backend (Es el retorno del Endpoint "Upload Imagen").
          })
          .catch((error) => {
            console.log("Error al subir la imagen");
          });
        } else {
          this.proyectoGuardado = response.proyectoActualizado;
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
  }

  getProyecto(id: string): void {
    this._proyectoService.getProyecto(id).subscribe((response: any) => {
      this.proyecto = response.proyectoObtenido;
    },
    (error) => {
      console.log("Ha ocurrido un error");
    });
  }

  fileChangeEvent(fileInput: any): void {
    this.archivosUpload = <Array<File>>fileInput.target.files; //Donde dice "<Array<File>>" es un cast de datos (Se forza a que los datos sean de tipo File).
  }

}

