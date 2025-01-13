const express = require('express');
const { newBooking, getAllBookings, getInhouseBookings, getHotelBookings, getSingleBookings, updateBookingDetails, sendRmail } = require('../controller/bookingController');
const ensureAuthenticated = require('../middleware/userAuth');
const router = express.Router();

router.route('/send-mail').post(ensureAuthenticated,sendRmail);
router.route('/new-booking').post(ensureAuthenticated,newBooking);
router.route('/update-booking').put(ensureAuthenticated,updateBookingDetails);
router.route('/bookings').get(ensureAuthenticated,getAllBookings);
router.route('/single-booking').get(ensureAuthenticated,getSingleBookings);
router.route('/hotel-bookings').get(ensureAuthenticated,getHotelBookings);
router.route('/inhousebookings').get(ensureAuthenticated,getInhouseBookings);

module.exports = router;