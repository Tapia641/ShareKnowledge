'use strict'

var User = require('../models/user');

function home(req, res) {
    res.status(200).send({
        message: 'Accion de pruebas en el servidor de NodeJS'
    })
}

function pruebas(req, res) {
    console.log(req.body);
    res.status(200).send({
        message: 'Accion de pruebas en el servidor de NodeJS'
    })
}


// Para tenerlos fuera de este JS
module.exports = {
    home, pruebas
}