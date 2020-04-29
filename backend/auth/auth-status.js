const jwt = require('jsonwebtoken');
const auth = require('./auth');

module.exports.isAuthorized = (request, response, next) => {
    let token = request.headers.authorization;
    if (!token) {
        response.sendStatus(401);
        return;
    }
    try {
        jwt.verify(token, auth.secretKey);
    } catch (e) {
        response.status(401).send({
            message: 'Bad token.'
        });
        return;
    }
    return next();
};
