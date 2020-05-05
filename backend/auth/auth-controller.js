const User = require('../model/user-model');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const md5 = require('md5');

exports.signUp = (request, response) => {
    console.log(request);
    console.log("_________________________________________________________________________");
    console.log(request.body);
    let user = new User();
    user.name = request.body.name;
    user.email = request.body.email;
    user.password = getHashPassword(request.body.password);
    user.save((err) => {
        if (err) {
            console.log(err);
            if (err.code === 11000) {
                response.status(409).send({message: 'Account already exists.'});
                return;
            }
            response.status(400).send(err);
            return
        }
        response.status(200).send({
            token: generationToken(user)
        })

    })
};

exports.signIn = (request, response) => {
    console.log(request.body);
    User.findOne({email: request.body.email, password: getHashPassword(request.body.password)}, (err, user) => {
        if (!user) {
            response.status(404).send({
                message: 'User not found.'
            });
            return;
        }
        if (err) {
            response.send(err);
            return;
        }

        response.status(200).send({
            token: generationToken(user)
        })
    })
};
let generationToken = (user) => {
    console.log(user);
    return jwt.sign({
        name: user.name,
        email: user.email,
        id: user.id
    }, auth.secretKey, {expiresIn: auth.expires});
};

let getHashPassword = (password) => {
    return md5(password);
};
