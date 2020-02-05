// Nuevas caracteristicas de Javascript, funcion flecha etc.
'use strict'

var mongoose = require ('mongoose');
var app = require('./app')
var port = 3800;

// CONEXION A LA DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/share_knowledge', {useMongoClient: true}).then(
    () => {
        console.log("Conexion DB realizada.");

        //CREAMOS EL SERVIDOR
        app.listen(port, () => {
            console.log("Servidor ejecutandose en http://localhost:3800")
        });
    }
).catch( err => console.log(err));