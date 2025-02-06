// models/hotelModel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelid: { type: String, required: true },
  type: { type: String, required: true },
  rate: { type: Number, required: true },
  acrate: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  rooms: { type: [Number], required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
