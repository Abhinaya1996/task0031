const express = require('express');
const { getHotelNames, addRoomType } = require('../controller/masterhotelController');
const router = express.Router();

router.route('/hotels').get(ensureAuthenticated, getHotelNames);
router.route('/add-roomtype').get(ensureAuthenticated, addRoomType);

module.exports = router;