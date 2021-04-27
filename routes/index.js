const newsRoutes = require('./news');
const usersRoutes = require('./users');

module.exports = function (app) {
  app.use('/news', newsRoutes);
  app.use('/users', usersRoutes);

}