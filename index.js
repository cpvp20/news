const express = require('express');
const app = express();
const path = require('path');
const routes = require("./routes");
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;

const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
    console.log(`app is listening`);
});