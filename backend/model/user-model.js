const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
    //favourites
}, {versionKey: false});

module.exports = mongoose.model('users', userSchema);
