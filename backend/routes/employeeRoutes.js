const express = require('express');
const userAuth = require('../middleware/userAuth');
const { employeeData } = require('../controller/employeeController');
const ensureAuthenticated = require('../middleware/userAuth');
const router = express.Router();

router.route('/data').post(ensureAuthenticated, employeeData);

module.exports = router;