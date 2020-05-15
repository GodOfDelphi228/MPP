/*const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const db = require('./config/db');
const bodyParser = require('body-parser');
const auth = require('./auth/auth-status');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const database = mongoose.connection;
database ? console.log("Db connected successfully") : console.log("Error connecting db");

const publicApiRoutes = require('./routes/public-api-routes');
app.use('/', publicApiRoutes);

const privateApiRoutes = require('./routes/private-api-routes');

app.use(auth.isAuthorized);
app.use('/', privateApiRoutes);

app.get("/url", (req, res, next) => {
    res.json(["1","2","3","4","5"]);
});

module.exports = app;
let portNum = 3003;
app.listen(portNum, ()=> {
    console.log("Server running on port " + portNum);
});

database.on('error', console.error.bind(console, 'connection error:'));
*/
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = require('express')();
const users = require('./routes/user-routes');
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(users);
const http = require('http').createServer(app);
const io = require('socket.io');

const endpoints = require('./endpoints/dish-endpoints');
const dishController = require('./controller/dish-controller');

const db = require('./config/db');

const socket = io(http);
const port = 3003;

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const database = mongoose.connection;
database ? console.log("Db connected successfully") : console.log("Error connecting db");
socket.on('connection', (socket) => {
    console.log('User connected');
    socket.on(endpoints.getAll, (params) => {
        console.log("getAll: " + params);
        dishController.getAllDishes(params, (data) => socket.emit(endpoints.sendAll, data));
    });
    socket.on(endpoints.createDish, (news) => {
        console.log("Create: " + news);
        dishController.new(news, (data) => socket.emit(endpoints.sendAll, data));
    });
    socket.on(endpoints.updateDish, (dish) => {
        console.log("Updating dish with: " + dish.image_url);
        dishController.update(dish, (data) => socket.emit(endpoints.sendUpdatedDish, data));
    });
    socket.on(endpoints.deleteDish, (id) => {
        console.log('|||||||||||||||||||||||Delete|||||||||||||||||||||||||||||||||||');
        dishController.delete(id, (data) => socket.emit(endpoints.sendDeletedDish, data));
    });
    socket.on(endpoints.getDish, (id) => {
        console.log("getting dish with id: " + id);
        dishController.getById(id, (data) => socket.emit(endpoints.sendDeletedDish, data));
    });
    socket.on('disconnect', () => {
        console.log('Disconnected!');
    })
});
http.listen(port, (socketConnectOpts) => {
    console.log('Connected to port: ' + port)
});

