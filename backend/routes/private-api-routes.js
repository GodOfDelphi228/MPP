const router = require('express').Router();
const dishController = require('../controller/dish-controller');

router.route('/dishes')
    .post(dishController.new);

router.route('/dishes/:dish_id')
    .put(dishController.update)
    .delete(dishController.delete);

module.exports = router;

