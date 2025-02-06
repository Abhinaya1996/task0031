// controllers/hotelController.js
const hotelModel = require('../model/hotelModel');
const bookingModel = require('../model/bookingModel'); // Import the booking model

exports.getBedroomTypes = async (req, res, next) => {
    try {
        const { hotelId } = req.query;
        const hotels = hotelModel.getHotels();
        const bedroomTypes = hotels[hotelId] || [];
        res.json({ success: true, bedroomTypes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRoomnumbers = async (req, res, next) => {
    try {
        const { hotelName, roomType } = req.query;

        if (!hotelName || !roomType) {
            return res.status(400).json({ message: 'Hotel name and room type are required' });
        }

        // Fetch rooms from hotel model
        const hotels = hotelModel.getHotels();
        const hotelRooms = hotels[hotelName]?.find((room) => room.type === roomType)?.rooms || [];

        if (hotelRooms.length === 0) {
            return res.status(404).json({ message: 'No rooms found for the given criteria' });
        }

        // Fetch bookings for the specific hotel and room type
        const bookings = await bookingModel.find({
            hotelid: hotelName,
            roomType: roomType,
            checkOutStatus: false, // Only active bookings
        });

        // Get booked room numbers
        const bookedRooms = bookings.map((booking) => booking.roomNumbers);

        // Determine room availability
        const roomStatus = hotelRooms.map((room) => ({
            room,
            available: !bookedRooms.includes(room.toString()),
        }));

        res.status(200).json({ rooms: roomStatus });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
