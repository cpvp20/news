
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const path = require('path');

const app = express();

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

const mongo = require('mongodb').MongoClient;

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("Not connected to database", err);
        return;
    }
    const db = client.db();
    console.log("Connected to database");
});



app.get('/', (req, res) => {
    res.statusCode = 200;
    console.log('ocurrio un peticion');
    res.end('Hola mundo');
});

server.listen(port, () => {
    console.log("app running");
});


