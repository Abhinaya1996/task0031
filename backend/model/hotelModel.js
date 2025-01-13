const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelname : {
        required:true,
        type: String,
        unique: true
    },
    code: String
});

const hotelModel = mongoose.model('hotel', hotelSchema);
module.exports = hotelModel;