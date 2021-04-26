const { UsersController, NewsController } = require('./../src/controllers');
const express = require('express');
const router = express.Router();

/**
 * @swagger 
 * /news:
 *  get:
 *    description: get all news
 *    parameters:
 *      - in: query
 *      name:topic
 *    responses:
 *      200:
 *        description: obj with all parameters
 * 
 * 
 */
router.get("/:topic", (req, res) => {
  let topic = req.params.topic;
  NewsController.getNews(res, topic);
});

router.get('/top-headlines',NewsController.getHeadlines);

router.get('/noticias/:id', NewsController.getById);

module.exports = router;