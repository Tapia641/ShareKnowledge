'use strict'

var express = require('express');
var bodyPerser = require('body-parser');

var app = express();

//CARGAR RUTAS

//MIDDLEWARES
app.use(bodyPerser.urlencoded({extended: false}));
app.use(bodyPerser.json());

//CORS

//RUTAS
app.get('/', (req, res)=>{
    res.status(200).send({
        message: 'Accion de pruebas en el servidor de NodeJS'
    })
});

//EXPORTAR
module.exports = app;