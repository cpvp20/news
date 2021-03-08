const { UsersController, NewsController } = require('./../src/controllers');
const express = require('express');
const router = express.Router();


router.get("/:topic", (req, res) => {
  let topic = req.params.topic;
  NewsController.getNews(res, topic);
});


//router.get('/news', NewsController.getNews);
//router.get('/noticias/:id', NewsController.getById);

module.exports = router;