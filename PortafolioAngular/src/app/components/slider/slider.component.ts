import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; //El modulo "Input" permite recibir datos desde una clase padre. El modulo "Output" y "EventEmitter" son necesarios para enviar datos desde una clase hija a una padre.

declare var $: any; //Esta instrucción es necesaria para que JQuery no de error en la consola.

interface Autor {
  nombre: string,
  apellido: string,
  web: string
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() anchura: number; //(Padre->Hijo) Aquí se recibe el valor que envía el componente padre (Es un atributo).  
  @Output() conseguirAutor = new EventEmitter(); //((Hijo->Padre)) Aquí se establee el método que envía los datos a la clase padre.
  public autor: Autor;

  constructor() { 
    this.autor = {
      nombre: "Daniel",
      apellido: "Alvarez",
      web: "danielalvarez.org"
    }
  }

  ngOnInit(): void {
    $("#logo").click((e) => {
      e.preventDefault();
      $("header").css("background", "green");
    });
    
    $(".galeria").bxSlider({
      mode: "fade",
      captions: true,
      slideWidth: this.anchura
    });
  }

  lanzar(event: any): void {
    this.conseguirAutor.emit(this.autor); //Aquí se envían los datos a la clase padre.
  }

}
