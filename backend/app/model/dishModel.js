const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dishSchema = mongoose.Schema({
    /*title : {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }*/
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: String,
    price: {
        type: String,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectID,
        ref:'User'
    },
    /*rating: {
        type: String,
        default: 0
    }*/
},{versionKey:false});

 module.exports = mongoose.model('Dish', dishSchema);
