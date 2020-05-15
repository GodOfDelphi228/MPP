const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let dishSchema = Schema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    price: {
        type: Schema.Types.Number,
        default: 0
    },
    restaurant_id: Schema.Types.ObjectID,
    image_url: Schema.Types.String,
    rating: {
        type: Schema.Types.Number,
        default: 0
    }
    //restaurantServed: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
},{versionKey:false});

module.exports = mongoose.model('dish', dishSchema);