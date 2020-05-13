const jwt = require('jsonwebtoken');
const Dishes = require('../model/dish-model');
const ObjectId = require('mongoose').Types.ObjectId;
const auth = require('../auth/auth');

exports.getAllDishes = (params,returnFunction) => {
    let token = params.token;
    let user = jwt.verify(token, auth.secretKey);
    Dishes.find({
        restaurant_id: user.id
    }).sort({[params.sort]: params.order}).exec((err, news) => {
        console.log(news);
        console.log("error: " + err);
        if (err) {
            returnFunction( {
                status: 500,
                message: err,
            });
        }
        returnFunction({
            status: 200,
            message: "Dishes retrieved successfully",
            payload: news
        });
    });

};

exports.getById = (id,returnFunction) => {
    console.log("GetByID called, id: " + id);
    if (!ObjectId.isValid(id)) {
        returnFunction({status:500});
    }
    Dishes.findById(id, (err, news) => {
        if (err) {
            returnFunction({
                status:500,
                payload:{err}
            })
        }
        returnFunction({
            status: 200,
            payload: news
        });
    });
};

exports.new = (dishData, returnFunction) => {
    {
        console.log(dishData);
        let dish = new Dishes();
        dish.name = dishData.name;
        dish.description = dishData.description;
        dish.price = dishData.price ? dishData.price : dish.price;
        dish.restaurant_id = dishData.restaurant_id ? dishData.restaurant_id : dish.restaurant_id;
        dish.image_url = dishData.image_url;
        dish.rating = (Math.random() * (4 - 5) + 5).toFixed(1)
        dish.save((err) => {
            returnFunction({
                message: 'New dish added!',
                payload: dish
            });
        });
    }
};

exports.update = (updatedDish, completion) => {
    console.log("Updading dish with: " + updatedDish.name);
    let id = updatedDish._id;
    if (!ObjectId.isValid(id)) {
        console.log("Bad id");
        return {
            message: 'Bad id.'
        };
    }
    Dishes.findById(id, (err, dish) => {
        if (err) {
            console.log(err);
            completion({err});
        }
        dish.name = updatedDish.description ? updatedDish.name : dish.name;
        dish.description = updatedDish.description ? updatedDish.description : dish.description;
        dish.rating = updatedDish.rating ? updatedDish.rating : dish.rating;
        dish.price = updatedDish.price ? updatedDish.price : dish.price;
        dish.image_url = updatedDish.image_url;//? updatedDish.image_url : dish.image_url;
        dish.save((err) => {
            if (err) {
                console.log(err);
                completion({
                    status: 500,
                    message: err
                })
            }
            console.log("Updated: " + dish);
            completion( {
                status:200,
                message: 'Dish ' + dish.name + ' updated',
                payload: dish
            });
        });
    });
};


exports.delete = (dish_id, completion) => {
    let id = dish_id;
    if (!ObjectId.isValid(id)) {
        console.log("Bad ID: " + dish_id);
        completion ({
            message: 'Bad id.'
        });
    }
    Dishes.deleteOne({
        _id: id
    }, (err, news) => {
        console.log(err);
        if (err)
            return (err);
        completion( {
            status: 204,
            message: 'Dish deleted',
            payload:{}
        });
    });
};
