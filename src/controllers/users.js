const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');

const User = require('./../models/user');
const Token = require('./../models/token');
const {
    send
} = require('process');

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

    register(req, res) {

    }

    getAll(req, res) {
        User.find({}, (err, results) => {
            res.send(results)
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    getOne(req, res) {
        User.findOne({
            'email': req.query.email
        }).then(result => {
            res.send(results);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    async createUser(req, res) {
        const {
            username,
            email,
            password
        } = req.body;
        if (!req.file) {
            res.end('File not supported');
            return;
        }

        User.insertOne(req.body, (err, result) => {
            if (err) {
                res.end('User not created. Something went wrong');
                return;
            };
            res.end('User successfully created');
        })

    }

    login(req, res) {
        const hasshedPassword = getHashedPassword(req.body.password);
        User.validate(req.body.email, hasshedPassword).then(result => {
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

    googleLogin(req, res) {
        console.log('datos de google ID recibidos ', req.body.idToken);
        googleClient.verifyIdToken({
            idToken: OAuth2Client.credentials.idToken,
        }).then(response => {
            const data = response.getPayload();
            //buscar user con email del payload
            //si user existe, agregar googleID (si no lo tiene ya)
            //si no existe, crear el record en la BD
            //generar token de sesion con este userID (e.g. encripta correo)
        }).catch(err => {
            console.log('failed to verify token', err);
            res.status(400).send('bad credentials');
        });
    }
}

module.exports = new UsersController();