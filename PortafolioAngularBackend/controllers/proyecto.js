const Proyecto = require('../models/proyecto'); //Se coloca en PascalCase porque es un modelo.
const fs = require('fs');
const path = require('path'); //Path es un módulo de NodeJS que permite cargar rutas físicas de nuestro sistema de archivos.
const ImagenHelper = require('../helpers/ImagenHelper');

var imagenHelper = new ImagenHelper();

var controlador = {};

controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Proyecto"
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Proyecto" 
    });
}

controlador.saveProyecto = async function(request, response) {
    var body = request.body; //Aquí se reciben los parámetros por body.
    
    var nombre = body.nombre;
    var descripcion = body.descripcion;
    var categoria = body.categoria;
    var lenguajes = body.lenguajes;
    var year = body.year;
    var imagen = body.imagen;

    //Creando la instancia.
    var proyecto = new Proyecto();
   
    //Seteando la instancia.
    proyecto.nombre = nombre;
    proyecto.descripcion = descripcion;
    proyecto.categoria = categoria;
    proyecto.lenguajes = lenguajes;
    proyecto.year = year;
    proyecto.imagen = imagen;

    //Guardando la instancia (Documento) en la base de datos.
    proyecto.save(function(error, proyectoGuardado) {
      if (error) return response.status(500).send({mensaje: "SERVIDOR: Error al guardar"});
      if (!proyectoGuardado) return response.status(404).send({mensaje: "SERVIDOR: No se a podido guardar el proyecto"});
    
      return response.status(200).send({
            proyectoGuardado
        });
    });
}

controlador.getProyectos = async function(request, response) {
    Proyecto.find({}).sort({year: "asc"}).exec(function(error, proyectosObtenidos) { //El método "find" trae todos los documentos (Objetos) de la colección, el método sort (No siempre es necesario ordenar) permite ordenar los objetos traídos en base a un atributo (Ejemplo: "{year: "asc"}" de menor a mayor, "{year: "desc"}" de mayor a menor), el segundo argumento del método exec almacena el array de objetos JSON (También indica el nombre del array), si se desea filtrar (Similar a WHERE en SQL) la búsqueda en la BD se puede colocar un atributo en el JSON del método find (Ejemplo: year: 2012).
        if (error) return response.status(500).send({mensaje: "SERVIDOR: Error al devolver los datos"});
        if (!proyectosObtenidos) return response.status(404).send({mensaje: "SERVIDOR: No hay proyectos para mostrar"});

        return response.status(200).send({
            proyectosObtenidos
        });
    });
}

controlador.getProyecto = async function(request, response) {
    var params = request.params;

    var id = params.id;

    if (!id) return response.status(404).send({mensaje: "SERVIDOR: No has enviado una ID"});

    Proyecto.findById(id, function(error, proyectoObtenido) { //En el segundo argumento se almacena el documento (Objeto) JSON obtenido de la consulta a la BD.
        if (error) return response.status(500).send({mensaje: "SERVIDOR: Error al devolver los datos (ID con formato no válido)"});
        if (!proyectoObtenido) return response.status(404).send({mensaje: "SERVIDOR: El ID no existe"});

        return response.status(200).send({
            proyectoObtenido
        });
    });
}

controlador.updateProyecto = async function(request, response) {
    var params = request.params;
    var body = request.body; //Aquí se almacena el objeto JSON completo ya actualizado.

    var id = params.id;

    Proyecto.findByIdAndUpdate(id, body, {new: true}, function(error, proyectoActualizado) { //El método "findByIdAndUpdate" permite actualizar un documento (Objeto) en la BD. El primer argumento indica el ID del objeto a actualizar (Similar a clave primaria en SQL), el segundo argumento indica los nuevos datos del documento (Objeto JSON), el tercer argumento es un JSON que indica si el objeto a retornar será el antiguo o el nuevo, el utltimo argumento es una función de callback y su segundo parámetro es el documento (Objeto) actualizado (Será el antiguo objeto o el nuevo dependiendo del tercer argumento del método findByIdAndUpdate).
        if (error) return response.status(500).send({mensaje: "SERVIDOR: Error al actualizar el documento"});
        if (!proyectoActualizado) return response.status(404).send({mensaje: "SERVIDOR: No existe el proyecto que deseas actualizar"});
        
        return response.status(200).send({
            proyectoActualizado
        });
    });
}

controlador.deleteProyecto = async function(request, response) {
    var params = request.params;

    var id = params.id;
    var imagen = "";
    var rutaImagen = "";

    //Consultar si el proyecto tiene una imagen (Para luego si es necesario borrarla)
    Proyecto.findById(id, function(error, proyecto) {
        if (proyecto.imagen != "") {
            imagen = proyecto.imagen;
            rutaImagen = "./uploads/" + imagen;
        }
    });

    Proyecto.findByIdAndDelete(id, function(error, proyectoBorrado) { //El método "findByIdAndDelete" permite borrar un documento (Objeto) en la BD. El primer argumento indica el ID del objeto a borrar (Similar a clave primaria en SQL), el segundo argumento es una función de callback y el segundo parámetro de dicha función es el documento (Objeto) que fue removido de la BD.
        if (error) return response.status(500).send({mensaje: "SERVIDOR: Error al eliminar el documento"});
        if (!proyectoBorrado) return response.status(404).send({mensaje: "SERVIDOR: No existe el proyecto que deseas eliminar"});

        //Si se subió correctamente la imagen, se borra la anterior.
        fs.unlink(rutaImagen, function(error) { //El método "unlink" elimina el archivo entregado en el primer argumento.
                    
        });

        return response.status(200).send({
            proyectoBorrado
        });
    });
}

controlador.uploadFileImagen = async function(request, response) {
    var params = request.params;
    var files = request.files;

    var id = params.id;
    var nombreArchivo = "Imagen no subida...";
    var imagenAntigua = "";
    var rutaImagenAntigua = "";

    if (files) { //Para poder procesar archivos se necesita configurar un MiddleWare (Esto se realiza en el modelo).
        
        //Consultar si el proyecto tiene una imagen (Para luego borrarla si es necesario)
        Proyecto.findById(id, function(error, proyecto) {
            if (proyecto.imagen != "") {
                imagenAntigua = proyecto.imagen;
                rutaImagenAntigua = "./uploads/" + imagenAntigua;
            }
        });

        var rutaArchivo = files.imagen.path;
        var splitArchivo = rutaArchivo.split("\\"); //El método split permite realizar un recorte en un string basandose en el parámetro entregado, este método retorna un Array con el indice 0 y 1. El indice 0 es lo que esta antes del corte y el indice 1 es lo que esta después.
        var nombreArchivo = splitArchivo[1]; //Aquí se almacena el nombre del archivo.
        var splitExtension = nombreArchivo.split(".");
        var extensionArchivo = splitExtension[1];

        if (imagenHelper.validarExtension(extensionArchivo)) {
            Proyecto.findByIdAndUpdate(id, {imagen: nombreArchivo}, {new: true}, function(error, proyectoActualizado) { //El método "findByIdAndUpdate" permite actualizar un documento (Objeto) en la BD. El primer argumento indica el ID del objeto a actualizar (Similar a clave primaria en SQL), el segundo argumento indica los nuevos datos del documento (Objeto JSON), el tercer argumento es un JSON que indica si el objeto a retornar será el antiguo o el nuevo, el utltimo argumento es una función de callback y su segundo parámetro es el documento (Objeto) actualizado (Será el antiguo objeto o el nuevo dependiendo del tercer argumento del método findByIdAndUpdate).
                if (error) return response.status(500).send({mensaje: "Error al subir la imagen"});
                if (!proyectoActualizado) return response.status(404).send({mensaje: "SERVIDOR: No existe el proyecto al que deseas agregarle una imagen"});

                //Si se subió correctamente la imagen, se borra la anterior.
                fs.unlink(rutaImagenAntigua, function(error) { //El método "unlink" elimina el archivo entregado en el primer argumento.
                    
                });

                return response.status(200).send({
                    proyectoActualizado
                });
            }); 
        }
        else {
            fs.unlink(rutaArchivo, function(error) {
                return response.status(500).send({mensaje: "SERVIDOR: La extensión no es válida"});
            });
        }
    } else {
        return response.status(200).send({
            mensaje: nombreArchivo
        });
    }
}

controlador.getFileImagen = async function(request, response) {
    var params = request.params;

    var archivo = params.imagen; //Aquí se almacena el nombre de la imagen con su extensión
    var rutaArchivo = "./uploads/" + archivo; //Aquí se almacena la ruta física de la imagen consultada.

    fs.exists(rutaArchivo, function(existe) { //El método "exists" consulta si la ruta entregada en el primer argumento existe, el segundo argumento es una función callback (El argumento de la función callback será true o false dependiendo si existe o no el fichero).
        if (existe) {
            return response.sendFile(path.resolve(rutaArchivo));
        }
        else {
            return response.status(200).send({
                mensaje: "SERVIDOR: No existe la imagen"
            });
        }
    });
}

module.exports = controlador;