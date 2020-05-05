const router = require('express').Router();

const authController = require("../auth/auth-controller");

router.route('/signIn')
    .post(authController.signIn);
router.route('/signUp')
    .post(authController.signUp);
module.exports = router;