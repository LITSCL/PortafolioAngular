export class Proyecto {
  public _id: string;
  public nombre: string;
  public descripcion: string;
  public categoria: string;
  public lenguajes: string;
  public year: number;
  public imagen: string;

  constructor(_id: string, nombre: string, descripcion: string, categoria: string, lenguajes: string, year: number, imagen: string) { 
    this._id = _id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.lenguajes = lenguajes;
    this.year = year;
    this.imagen = imagen;
  }
}