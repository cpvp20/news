const express = require('express');
const path = require('path');
const news = require('./news');
const newsRoute = require('./routes/news');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//app.use('/api', newsRoute);
//ESTE ES EL ENDPOINT PARA EXPONER NOTICIAS
newsRoute(app);

app.listen(port, () => {
    console.log(`app is listening`);
})