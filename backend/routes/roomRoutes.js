const express = require('express');
const ensureAuthenticated = require('../middleware/userAuth');
const { getBedroomTypes } = require('../controller/RoomController');
const router = express.Router();

router.route('/bedtypes').get(ensureAuthenticated,getBedroomTypes);

module.exports = router;