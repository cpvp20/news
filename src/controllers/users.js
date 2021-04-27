const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const fetch = require("node-fetch");
const {
    GoogleAuth,
    OAuth2Client
} = require('google-auth-library');

const User = require('../models/user');
const Token = require('./../models/token');

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

function getHashedPassword(pwd) {
    let hasshedPassword;
    if (process.env.ENCRYPT === 'bcrypt') {
        hasshedPassword = bcrypt.hashSync(pwd, 12);
    } else {
        hasshedPassword = crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    }
    return hasshedPassword;
}

class UsersController {

    getAll(req, res) {
        User.findOne({
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    findOne(req, res) {
        User.findOne({
            'email': req.query.email
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    async createUser(req, res) {
        var newUser;
        newUser = req.body;
        newUser = req.file.orginalName;
        if (!req.file) {
            res.end('File not supported');
            return;
        }

        User.insertOne(newUser, (err, result) => {
            if (err) {
                res.staus(err.status).end('User not created. Something went wrong', err.message);
                return;
            };
            console.log(result);
            res.status(200).end('User successfully created');
        })

    }


    /*
    login(req, res) {
        const hashedPassword = getHashedPassword(req.body.password);
        User.validate(req.body.email, hashedPassword).then(result => {
            if (result) {
                Token.create(result._id).then(tokenResult => {
                    console.log('token created ', tokenResult);
                    res.send(tokenResult.ops[0]);
                }).catch(err => {
                    console.log('failed to create token', err);
                    res.status(404).send(err);
                });
            } else {
                res.status(400).send(err);
            }
        }).catch(err => {
            console.log('failed to validate user', err);
            res.status(400).send();
        });

    }
    */

    async findOneAndCreate(filters, data, res) {
        //buscar user con email del payload

        User.findOne(filters, (err, result) => {
            if (err) {
                console.log(err);
                return null;
            } else {
                console.log("Result 1: ", result)
                //si no existe, crear el record en la BD

                if (!result) {
                    //Crear Usuario
                    let newUser = {
                        first_name: data.given_name,
                        last_name: data.family_name,
                        email: data.email,
                        img: data.picture,
                        google_id: data.sub
                    }
                    User.insertOne(newUser, (err) => {
                        if (err) {
                            console.log("Error al insertar: ", err)
                        } else {
                            console.log("nuevo usuario insertado exitosamente")
                        }
                    })
                } else {
                    //si user existe, agregar googleID (si no lo tiene ya)

                    //Checar si tiene googleId
                    if (result.google_id === '') {
                        //update google ID
                        User.updateOne(filters, {
                            $set: {
                                google_id: data.sub
                            }
                        }, (err) => {
                            if (err) {
                                console.log("Error al updateOne", err);
                            } else {
                                console.log("Se actualizo con el Google Id exitosamente")
                            }
                        })
                    } else {
                        console.log("El usuario está bien")
                    }
                }
            }
        })
    }

    googleLogin(req, res) {
        console.log('datos de google ID recibidos ', req.body.idToken);
        googleClient.verifyIdToken({
            idToken: req.body.idToken //OAuth2Client.credentials.idToken,
        }).then(response => {
            const data = response.getPayload();
            console.log('Google Response Payload', data)
            //buscar user con email del payload
            this.findOneAndCreate({
                email: data.email
            }, data, res)
            // FALTA generar token de sesion con este userID (e.g. encripta correo)
            res.send('ok');

        }).catch(err => {
            console.log('failed to verify token', err);
            res.status(400).send('bad credentials');
        });
    }
}

module.exports = new UsersController();