const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let dishSchema = Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    price: {
        type: Schema.Types.Number,
        default: 0
    },
    image_url: Schema.Types.String,
    rating: {
        type: Schema.Types.Number,
        default: 0
    }
    //restaurantServed: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
});

module.exports = mongoose.model('Dish', dishSchema);