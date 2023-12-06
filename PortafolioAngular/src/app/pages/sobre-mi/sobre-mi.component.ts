import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  public titulo: string;
  public subtitulo: string;
  public web: string;

  constructor() { 
    this.titulo = "Daniel Alvarez";
    this.subtitulo = "Desarrollador WEB";
    this.web = "danielalvarez.org";
  }

  ngOnInit(): void {
  }

}
