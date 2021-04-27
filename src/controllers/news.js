//Agregar la funcionalidad en dicho endpoint para consumir las noticias desde NewsAPI.org
const fetch = require("node-fetch"); //Dado que la función fetch no existe en Node, es posible, instalar la librería node-fetch para agregar esta funcionalidad 
require('dotenv').config();
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class NewsController {

    getNews(res, topic) {
        const url = `${apiUrl}apiKey=${apiKey}&q=${topic}`;
        console.log(url);
        fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    return response.text();
                } else {
                    return "error when fetching form new API, status was not 200";
                }
            })
            .then((news) => {
                res.end(news);
            })
            .catch((err) => {
                res.status(err.status).end(err.message);
            });
    }

    getHeadlines(req, res) {
        const url = `${apiUrl}/top-headlines?country=mx&apiKey=${apiKey}`;
        console.log(url);
        fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    return response.text();
                } else {
                    return "error when fetching form new API, status was not 200";
                }
            })
            .then((news) => {
                res.end(news);
            })
            .catch((err) => {
                res.status(err.status).end(err.message);
            });
    }  

    getById(req, res) {
        res.send('Traer noticia ' + req.params.noticiaID);
    }
}
module.exports = new NewsController();
