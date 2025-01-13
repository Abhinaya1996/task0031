const { string } = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    staffid: { type: String },
    hotelid: { type: String },
    source: { type: String, required: true },
    personName: String,
    mobile: Number,
    email: String,
    guestCount: Number,
    guestDetails:[
        {
            name:String,
            phone:Number,
            altphone: Number
        }
    ],
    roomType: String,
    bedType: String,
    address: String,
    nationality: String,
    identityType: String,
    aadharNum: { type: String},
    checkin_Booking: { type: Date },
    checkin_Reserve: { type: Date },
    checkout: { type: Date },
    cFormNumber: String,
    roomNumbers: String,
    bookingNo: { type: String, unique: true },
    payment_Booking: [
        {
            roomrent: Number,
            extra: Number,
            gst: Number,
            total: Number,
            amountPaid: Number,
            amountDue: Number,
            paymentType: String
        }
    ],
    payment_Reserve: [
        {
            roomrent: Number,
            extra: Number,
            addons:Number,
            gst: Number,
            amountPaid: Number,
            amountDue: Number,
            paymentType: String
        }
    ],
    checkInStatus: { type: Boolean, default: false },
    checkOutStatus: { type: Boolean, default: false },
    addedAt: { type: Date, default: Date.now },
    notes: String
});

const bookingModel = new mongoose.model('booking',bookingSchema);
module.exports = bookingModel;

