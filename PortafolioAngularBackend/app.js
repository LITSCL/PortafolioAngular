const express = require('express'); //En esta variable se carga el módulo de la librería Express (Express es un framework para trabajar con el protocolo HTTP, permite definir rutas, recibir peticiones HTTP, crear acciones, crear métodos, entre otros).
const cors = require('cors');
const bodyParser = require('body-parser'); //En esta variable se carga el módulo de la librería Body Parser (Body Parser es una librería que sirve para convertir las peticiones que se hacen al backend a un objeto JSON usable por JavaScript).

const db = require('./db/conexion'); //Importando la conexión a DB.

//Realizar la conexión a la base de datos.
db.conectarDB();

const app = express(); //Al utilizar el método "express()", se retorna el servidor (Por lo tanto la variable app es el servidor).

//Establecer el directorio público.
app.use(express.static("./public"));

//Middlewares (Los middlewares son métodos que se ejecutan antes de realizar la acción de un controlador "Se ejecuta antes del resultado de la petición").
app.use(bodyParser.urlencoded({extended: false})); //Esta instrucción es una configuración necesaria para Body Parser.
app.use(bodyParser.json()); //En esta instrucción se está indicando que todas las peticiones que lleguen se convierten a JSON.
app.use(cors());

//Obtener las rutas.
var proyectoRutas = require('./routes/proyecto');

//Cargar Rutas.
app.use("/api/proyecto", proyectoRutas);

//Exportar el backend (Exportando el servidor).
module.exports = app;