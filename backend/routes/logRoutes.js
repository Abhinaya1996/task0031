const express = require('express');
const ensureAuthenticated = require('../middleware/userAuth');
const { getRecentLoginLogs } = require('../controller/logController');
const router = express.Router();

router.route('/loginlogs').get(getRecentLoginLogs);


module.exports = router;