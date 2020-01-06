'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//ENTIDAD PARA CREAR OBJETOS CON BASE A ESTE MODELO
var UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String,
    image: String
});

//INTERPRETA EN PLURAR USERS
module.exports = mongoose.model('User', UserSchema);