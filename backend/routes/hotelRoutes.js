const express = require('express');
const { newHotel, getAllHotels } = require('../controller/hotelController');
const ensureAuthenticated = require('../middleware/userAuth');
const router = express.Router();

router.route('/new-hotel').post(ensureAuthenticated,newHotel);
router.route('/hotels').get(ensureAuthenticated,getAllHotels);

module.exports = router;