const mongoose = require('mongoose');

var schema = mongoose.Schema;

//Esto es el modelo "Proyecto".
var ProyectoSchema = schema({
    //_id: Number, Solo necesario si se desea que MongoDB no administre los ID (Puede ser de cualquier tipo).
    nombre: String,
    descripcion: String,
    categoria: String,
    lenguajes: String,
    year: Number,
    imagen: String
}, {
    collection: "proyecto", //Aquí se especifica a que colección representa este modelo.
    versionKey: false //Esto evita que se cree la columna "__v".
});

module.exports = mongoose.model("Proyecto", ProyectoSchema); //Aquí se crea la colección (Si ya existe no se crea), el primer argumento es el nombre del modelo, el segundo argumento indica el modelo de datos (Los atributos que tendrán los objetos en la base de datos).