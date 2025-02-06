// controllers/hotelController.js
const masterHotel = require('../model/masterhotelModel');

exports.getHotelNames = async (req, res) => {
  try {
    // Fetch only hotel names (hotelid) from the collection
    const hotelNames = await masterHotel.distinct('hotelid');

    if (!hotelNames.length) {
      return res.status(404).json({ success: false, message: 'No hotel names found.' });
    }

    res.json({ success: true, hotelNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching hotel names.', error: err.message });
  }
};

const Hotel = require('../models/hotelModel'); // adjust the path to your hotel model

exports.addRoomType = async (req, res) => {
    try {
        const { hotelid, type, rate, acrate, tax, total, address, phone, rooms } = req.body;

        // Validate the data
        if (!hotelid || !type || !rate || !acrate || !tax || !total || !address || !phone || !rooms) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Find the hotel by hotelid
        const hotel = await Hotel.findOne({ hotelid: hotelid });

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found' });
        }

        // Create new room type object
        const newRoomType = {
            type,
            rate,
            acrate,
            tax,
            total,
            address,
            phone,
            rooms
        };

        // Push the new room type to the hotel rooms array
        hotel.roomTypes.push(newRoomType);

        // Save the updated hotel document
        await hotel.save();

        res.status(200).json({ success: true, message: 'Room type added successfully', hotel });
    } catch (err) {
        console.error('Error adding room type:', err);
        res.status(500).json({ success: false, message: 'Error adding room type', error: err.message });
    }
};

