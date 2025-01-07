const express = require('express');
const { userRegister, userLogin, userLogout } = require('../controller/authController');
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(userLogout);

module.exports = router;