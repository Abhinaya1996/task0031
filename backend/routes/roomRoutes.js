const express = require('express');
const ensureAuthenticated = require('../middleware/userAuth');
const { getBedroomTypes, getRoomnumbers } = require('../controller/RoomController');
const router = express.Router();

router.route('/bedtypes').get(ensureAuthenticated,getBedroomTypes);
router.route('/roomtypes').get(getRoomnumbers);

module.exports = router;