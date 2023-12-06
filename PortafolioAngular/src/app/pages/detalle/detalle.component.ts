import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../../models/proyecto';
import { ProyectoService } from '../../services/proyecto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { global } from '../../services/global';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [ProyectoService]
})
export class DetalleComponent implements OnInit {
  public url: string;
  public proyecto: Proyecto;
  public confirmar: boolean;

  constructor(private _proyectoService: ProyectoService, private _router: Router, private _route: ActivatedRoute) { 
    this.url = global.url;
    this.confirmar = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      var id = params.id;
      this.getProyecto(id);
    });
  }

  getProyecto(id: string): void {
    this._proyectoService.getProyecto(id).subscribe((response) => {
      this.proyecto = response.proyectoObtenido;
    },
    (error) => {
      console.log("Ha ocurrido un error");
    });
  }

  deleteProyecto(id: string): void {
    this._proyectoService.deleteProyecto(id).subscribe((response) => {
      if (response.proyectoBorrado) {
        this._router.navigate(["/proyectos"]);
      }
    },
    (error) => {
      console.log("Ha ocurrido un error");
    });
  }

  setConfirmar(confirmar: boolean): void {
    this.confirmar = confirmar;
  }
}
