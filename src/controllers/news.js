//Agregar la funcionalidad en dicho endpoint para consumir las noticias desde NewsAPI.org

const fetch = require("node-fetch"); //Dado que la función fetch no existe en Node, es posible, instalar la librería node-fetch para agregar esta funcionalidad 

require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
/*
class News {

    getNews(req, res) {
        let query = req.query.q || 'Apple';
        const url = `${apiUrl}apiKey=${apiKey}&q=${query}`;
        console.log(url);
        fetch(url)
            .then(response => res.json(response.data.articles))
            .catch(err => {
                res.status(404).json('Failure');
            });
    }

    getAll(req, res) {
        const url = `${apiUrl}/top-headlines?country=mx&apiKey=${apiKey}`;
        fetch(url).then(response => {
            res.send(response.data.articles);
        }).catch(err => {
            res.send('Failure')
            res.end();
        });
    }

    getById(req, res) {
        res.send('Traer noticia ' + req.params.noticiaID);
    }
}
module.exports = new News();
*/
module.exports = function (res, url) {
    fetch(url)
        .then((res) => {
            if (res.status == 200) {
                return res.text();
            } else {
                throw {
                    status: res.status,
                    message: "Failed in fetching news from news-API",
                };
            }
        })
        .then((news) => {
            res.end(news);
        })
        .catch((err) => {
            res.status(err.status).end(err.message);
        });
};