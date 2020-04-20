const router = require('express').Router();
const authController = require('../auth/auth-controller');
const dishController = require('../controller/dish-controller');
//const restaurantController = require('../controller/restaurant-controller');

router.route('/dishes')
    .get(dishController.getAllDishes);

router.route('/dishes/:dishes_id')
    .get(dishController.getById);

router.route('/signUp').post(authController.signUp);
router.route('/signIn').post(authController.signIn);

module.exports = router;