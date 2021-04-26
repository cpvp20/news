const newsRoutes = require('./news');
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const fs = require('fs');
const Token = require('./../src/models/token');
const { UsersController } = require('../src/controllers');

function authMiddleware(req, res, next) {
  Token.findByToken(req.headres.authorization).then(response => {
    if (response) {
      next();
    } else {
      res.status(401).send();
    }
  }).catch(err => {
    res.status(401).send();
  })
}

module.exports = function (app) {
  app.use('/news', newsRoutes);
  app.use('/users', usersRoutes);
  app.use('/auth', authRoutes);

  app.post('/auth/google', UsersController.googleLogin);
  app.post('/auth', UsersController.login);
  app.post('/register', UsersController.register);

  app.get("/register", (req, res) => {
    const indexFile = fs.readFileSync("./views/register.html");
    res.end(indexFile);
  });
}