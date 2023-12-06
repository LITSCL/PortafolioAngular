import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';

import { global } from '../../services/global'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers: [ProyectoService]
})
export class ProyectosComponent implements OnInit {
  public proyectos: Proyecto[];
  public url: string;

  constructor(private _proyectoService: ProyectoService) { 
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos(): void {
    this._proyectoService.getProyectos().subscribe((response) => {
      if (response.proyectosObtenidos) {
        this.proyectos = response.proyectosObtenidos;
      }
    },
    (error) => {
      console.log("Ha ocurrido un error");
    });
  }

}
