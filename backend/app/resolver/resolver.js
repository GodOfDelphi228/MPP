const Dish = require('../model/dishModel');
const ObjectId = require('mongoose').Types.ObjectId;

const resolver = {
    dishes: (context) => {
        console.log("Dishes requested");
        return Dish.find().populate('owner').then(dishes => dishes)
            .catch(err => {
                console.log(err);
                return err });
    },
    oneDish: (args) => {
        console.log("One dish requested");
        return Dish.findById({_id: new ObjectId(args.dishId)}).then(dishes => dishes).catch(err => err)
    },
    createDish: (args, context) => {
        console.log(args);
        args.owner = context.user._id;
        return Dish.create(args).then(dishes => {
            let bufDishes = dishes;
            bufDishes.owner.id = context.user._id;
            return bufDishes
        }).catch(err => err);
    },
    updateDish: (args, context) => {
        console.log(args);
        return Dish.findById({_id: new ObjectId(args.dishId)}).then(dish => {
            console.log("UpdateDish");
            if (dish.owner.equals(context.user._id)) {
                args.likes = []
                return Dish.findOneAndUpdate({_id: new ObjectId(args.dishId)}, args, {new: true})
            }
            return dish;
        }).catch(err => err);
    },
    deleteDish: (args) => {
        return Dish.findOneAndDelete({_id: new ObjectId(args.dishId)}).populate('likes owner')
    },
    addDishLike: (args, context) => {
        return Dish.findById(new ObjectId(args.dishId)).populate('likes owner').then(dish => {
            if (dish) {
                let currentUserId = context.user._id;
                let likeIndex = dish.likes.findIndex(user => user['_id'].equals(currentUserId))
                if (likeIndex === -1) {
                    dish.likes.push(context.user._id);
                }
                return dish.save();
            }
        })
    },
    deleteDishLike: (args, context) => {
        return Dish.findById(new ObjectId(args.dishId)).populate('likes')
            .then(dish => {
                let currentUserId = context.user._id;
                if (dish) {
                    let likeIndex = dish.likes.findIndex(user => user['_id'].equals(currentUserId))
                    if (likeIndex !== -1) {
                        dish.likes.splice(likeIndex, 1);
                    }
                    return dish.save();
                }
            })
            .catch(err => err);

    }
}
module.exports = resolver;
