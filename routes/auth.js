const newsRoutes = require('./news');
const usersRoutes = require('./users');
const fs = require('fs');

module.exports = function (app) {
  app.use('/news', newsRoutes);
  app.use('/users', usersRoutes);

  app.get("/register", (req, res) => {
    const indexFile = fs.readFileSync("./views/register.html");
    res.end(indexFile);
});
}