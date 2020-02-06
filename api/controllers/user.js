'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

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

function saveUser(req, res) {
    //Guarda los campos de post
    var params = req.body;
    console.log(params)

    var user = new User();
    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // Validando si un email existe or
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err) {
                return res.status(500).send({ message: 'Error en la peticion de usuarios' });
            }

            if (users && users.length >= 1) {
                return res.status(200).send({ message: 'El usuario ya existe' });
            }
        })

        // Encriptamos la contrasenia
        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash;
            user.save((err, userStored) => {
                if (err) {
                    return res.status(500).send({
                        message: 'Error al guardar'
                    })
                }

                if (userStored) {
                    res.status(200).send({ user: userStored });
                } else {
                    res.status(404).send({ message: 'No se ha registrado el usuario' });
                }
            });
        });
    } else {
        res.status(200).send({
            message: 'Envia todos los campos'
        });
    }
}

function loginUser(req, res) {
    //Nos llegan datos por POST
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' });

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        //Devolvemos un token
                        //Generar un token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        //Devolvemos los datos
                        user.password = undefined;
                        return res.status(200).send(user)
                    }
                } else {
                    return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
                }
            });
        } else {
            return res.status(404).send({ message: 'El usuario no se ha podido identificar' });
        }
    })

}

// Para tenerlos fuera de este JS
module.exports = {
    home, pruebas, saveUser, loginUser
}