var app = require('./app.js');

var puerto = 2900;

//Creación del servidor (Aquí se levanta el servidor ya configurado en el archivo "app.js").
var server = app.listen(puerto, function() {
    console.log(`Servidor levantado correctamente en el puerto ${puerto}`);
});