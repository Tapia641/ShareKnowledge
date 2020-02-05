'use strict'

var express = require('express');
var bodyPerser = require('body-parser');

var app = express();

//CARGAR RUTAS
var user_routes = require('./routes/user');

//MIDDLEWARES
app.use(bodyPerser.urlencoded({ extended: false }));
app.use(bodyPerser.json());

//CORS

//RUTAS
app.use('/api', user_routes);

//EXPORTAR
module.exports = app;