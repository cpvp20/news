//const express = require('express');
//const router = express.Router();

const getNews = require('../src/controllers/news');
require('dotenv').config();
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;


module.exports = function(app) {
  app.get("/news/:query", (req, res) => {
    let query = req.params.query || 'Apple';
    const url = `${apiUrl}q=${query}&apiKey=${apiKey}`;
    console.log(url);
    getNews(res, url);
  });
}
/*
router.get('/', (req, res) => res.json('OK'));
router.get('/noticias', newsController.getAll);
router.get('/noticias/:id', newsController.getById);
router.get('/news', newsController.getNews);
*/
