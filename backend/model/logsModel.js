const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    userid : {type: String, required: true},
    action : {type: String, required: true},
    actionat : {type: String, required: true}, 
    hotelid : {type: String, required: false},
    bookingid : {type: String, required: false},
    logdetails : {type: String, required: false}
});

const logsModel = mongoose.model('log', logsSchema);
module.exports = logsModel;