const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const db = require('./config/db');
const bodyParser = require('body-parser');
const auth = require('./auth/auth-status');

const app = express();
/*
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
// intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};

app.use(allowCrossDomain);*/

//const cors = require('cors');

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

/*database.once('open', function() {
    console.log("Connection Successful!");
    let Schema = mongoose.Schema;
    // define Schema
    //let xxx = { type: Schema.Types.ObjectId, ref: 'Dish' }
    // compile schema to model
    //let Book = mongoose.model('Dish', xxx, 'Dishes');
    var DishSchema = require('mongoose').model('Dish');
    // a document instance
    let book1 = new DishSchema({
        name: "Dranik2",
        description: "First dish description",
        price: 10 }
        );

    // save model to database
    book1.save(function (err, book) {
        if (err) return console.error(err);
        console.log(book.name + " saved to bookstore collection.");
    });

});*/

