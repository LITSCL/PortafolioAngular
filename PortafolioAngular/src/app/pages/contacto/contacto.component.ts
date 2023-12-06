import { Component, OnInit, ViewChild } from '@angular/core'; //El módulo "ViewChild" permite seleccionar elementos DOM de la vista.

interface Autor {
  nombre: string,
  apellido: string,
  web: string
}

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  public widthSlider: number;
  public anchuraSlider: number;
  public autor: Autor;
  @ViewChild('texto', {static: true}) parrafo: any; //En este atributo se almacena el elemento del DOM (Similar a un getElementById).

  constructor() { }

  ngOnInit(): void {
    console.log(this.parrafo.nativeElement.textContent);
  }

  cargarSlider(): void {
    this.anchuraSlider = this.widthSlider;
  }

  resetearSlider(): void {
    this.anchuraSlider = null;
  }

  getAutor(event: any): void {
    this.autor = event;
  }

}
