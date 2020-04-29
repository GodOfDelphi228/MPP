const Dishes = require('../model/dish-model');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllDishes = (request, response) => {
    console.log("retrieving dishes1...");
    Dishes.find().sort({[request.query.sort]:request.query.order}).exec((err, news) => {
        console.log("retrieving dishes2...");
        if (err) {
            console.log(err);
            response.status(500).json({
                status: "error",
                message: err,
            });
        } else {
            console.log("success");
            response.json({
                status: "success",
                message: "News retrieved successfully",
                payload: news
            });
        }
    })
};

exports.getById = (request, response) => {
    let id = request.params.dish_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    Dishes.findById(id, (err, news) => {
        if (err) {
            response.status(500).send(err);
        } else {
            response.status(200).send({
                message: 'News details.',
                payload: news
            });
        }
    });
};

exports.new = (request, response) => {
    {
        console.log(request.body);
        let dish = new Dishes();
        dish.name = request.body.name;
        dish.description = request.body.description;
        dish.price = request.body.price ? request.body.price : dish.price;
        dish.image_url = request.body.image_url;
        dish.save((err) => {
            response.status(200).json({
                message: 'New dish added!',
                payload: dish
            });
        });
    }
};

exports.update = (request, response) => {
    let id = request.params.dish_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    Dishes.findById(id,(err, dish) => {
        if (err) {
            response.status(500).send(err);
        }
        dish.name = request.body.description ? request.body.name : dish.name;
        dish.description = request.body.description ? request.body.description : dish.description;
        dish.rating = request.body.rating ? request.body.rating : dish.rating;
        dish.price = request.body.price ? request.body.price : dish.price;
        dish.image_url = request.body.image_url ? request.body.image_url : dish.image_url;
        dish.save((err) => {
            if (err) {
                response.status(400).send(err);
            }
            response.status(200).send({
                message: 'Dish Info updated',
                payload: dish
            });
        });
    });
};


exports.delete = function (request, response) {
    let id = request.params.dish_id;
    if (!ObjectId.isValid(id)) {
        response.status(400).send({
            message: 'Bad id.'
        });
        return;
    }
    Dishes.deleteOne({
        _id: id
    }, (err, news) => {
        if (err)
            response.send(err);
        response.status(204).send({
            status: "success",
            message: 'Contact deleted'
        });
    });
};
