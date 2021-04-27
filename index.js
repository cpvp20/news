const express = require('express');
const app = express();
const path = require('path');
const routes = require("./routes");
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const socketIo = require('socket.io');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            "title": "news api doc",
            "description": "api news api",
            "version": "1.0",
            "servers": ["http://localhost:3000"]
        }
    },
    apis: ['index.js', 'news/index.js']
}
const swaggerDoc = swaggerJsDoc(swaggerOptions);

const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/assets', express.static('./dist/assets'));
routes(app);

app.get('/', (req, res) => {
    let indexFile = fs.readFileSync("./views/index.html")
    res.end(indexFile)
})

app.get('/register', (req, res) => {
    let registerHtml = fs.readFileSync("./views/register.html")
    res.end(registerHtml)
})

app.get('/login', (req, res) => {
    let loginHtml = fs.readFileSync("./views/login.html")
    res.end(loginHtml)
})


app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const server = app.listen(port, () => {
    console.log(`app is listening`);
});

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowHeaders: ['Authorization'],
        credentials: true,
    }
});

/*
io.on('connection', socket => {

    const authToken = socket.handshake.headers['Authorization'];
    console.log("se ha conectado", authToken);

    socket.on('likedNews', data => {
        console.log("news liked: ", data);

        socket.broadcast.emit('UserLikedNews',data);

    })
});
*/