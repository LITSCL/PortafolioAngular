const ProyectoControlador = require('../controllers/proyecto'); //Se coloca en PascalCase porque es un controlador.

const express = require('express');
var router = express.Router();

//Middlewares (Los middlewares son métodos que se ejecutan antes de realizar la acción de un controlador "Se ejecuta antes del resultado de la petición").
const multiPart = require('connect-multiparty'); //En esta variable se carga el módulo de la librería Connect-Multiparty (Connect-Multiparty es una librería que permite subir archivos al backend y poder trabajar con el protocolo file).

var imagenStorageMiddleware = multiPart({uploadDir: "./uploads"}); //El valor del atributo indica donde se van a almacenar los archivos (Imagenes).

//Configuración de rutas.
router.get("/test-get", ProyectoControlador.testGet);
router.post("/test-post", ProyectoControlador.testPost);
router.post("/save-proyecto", ProyectoControlador.saveProyecto);
router.get("/get-proyectos", ProyectoControlador.getProyectos);
router.get("/get-proyecto/:id?", ProyectoControlador.getProyecto); //Al colocar "?" se está indicando que el parámetro es opcional (Se debe capturar el posible error en el método getProyecto).
router.put("/update-proyecto/:id", ProyectoControlador.updateProyecto); //NOTA: Esta ruta esta repetida, pero nunca va a haber confusión ya que los métodos a realizar dependeran del protocolo (GET o PUT), PUT se utiliza para actualizar datos en la DB.
router.delete("/delete-proyecto/:id", ProyectoControlador.deleteProyecto); //NOTA: Esta ruta esta repetida, pero nunca va a haber confusión ya que los métodos a realizar dependeran del protocolo (GET, PUT, DELETE), DELETE se utiliza para borrar datos en la DB.
router.post("/upload-file-imagen/:id", imagenStorageMiddleware, ProyectoControlador.uploadFileImagen); //El segundo argumento es un MiddleWare, se ejecuta antes que el método del tercer parámetro.
router.get("/get-file-imagen/:imagen", ProyectoControlador.getFileImagen);

module.exports = router;