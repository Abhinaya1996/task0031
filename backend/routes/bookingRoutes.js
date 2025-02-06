const express = require('express');
const { newBooking, getAllBookings, getInhouseBookings, getHotelBookings, getSingleBookings, updateBookingDetails, sendRmail, updCheckout, getGuesthistory, getLogsByDate, getRoomAvailability, updateBookingReserveDetails, getReports, getRoomWiseSales, getcheckinoutReports } = require('../controller/bookingController');
const ensureAuthenticated = require('../middleware/userAuth');
const router = express.Router();

router.route('/send-mail').post(ensureAuthenticated,sendRmail);
router.route('/checkout').post(ensureAuthenticated,updCheckout);
router.route('/new-booking').post(ensureAuthenticated,newBooking);
router.route('/update-booking').put(ensureAuthenticated,updateBookingDetails);
router.route('/update-booking-reserve').put(updateBookingReserveDetails);
router.route('/bookings').get(ensureAuthenticated,getAllBookings);
router.route('/single-booking').get(ensureAuthenticated,getSingleBookings);
router.route('/hotel-bookings').get(ensureAuthenticated,getHotelBookings);
router.route('/inhousebookings').get(ensureAuthenticated,getInhouseBookings);
router.route('/guesthistory').get(ensureAuthenticated,getGuesthistory);
router.route('/todaysdata').get(ensureAuthenticated,getLogsByDate);
router.route('/room-availability').get(ensureAuthenticated,getRoomAvailability);
router.get('/reports', getReports);
router.get('/room-wise-sales', getRoomWiseSales);
router.get('/checkin-checkout-report', getcheckinoutReports);


module.exports = router;