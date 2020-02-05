'use strict'

var express = require('express');
var UserController = require('../controllers/user');

//Para tener acceso a los metodos get, post, put, etc.
var api = express.Router();

api.get('/home', UserController.home);
api.get('/pruebas', UserController.pruebas);

module.exports = api