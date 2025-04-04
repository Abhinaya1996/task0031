const { string, number } = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    staffid: { type: String },
    hotelid: { type: String },
    source: { type: String, required: true },
    nameTitle: String,
    personName: String,
    extnmob: String,
    mobile: Number,
    altmobile: Number,
    email: String,
    guestCount: Number,
    extrapersonName: String,
    extrapersoncharge: Number,
    extrapersondays: Number,
    guestDetails:[
        {
            guestTitle:String,
            name:String,
            phone:Number
        }
    ],
    roomType: String,
    bedType: String,
    address: String,
    nationality: String,
    identityType: String,
    aadharNum: { type: String},
    passportnum: { type: String},
    visatype: { type: String},
    passport_issued: { type: String},
    passport_expired: { type: String},
    issuecountry: { type: String},
    checkin_Booking: { type: Date },
    checkin_Reserve: { type: Date },
    checkout: { type: Date },
    cFormNumber: String,
    roomNumbers: String,
    bookingNo: { type: String, unique: true },
    extraperson: [
        {
            name: String,
            cost: String,
            days: Number
        }
    ],
    payment_Booking: [
        {
            roomrent: Number,
            extra: Number,
            discper:Number,
            discamt:Number,
            isgst:String,
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
            discper:Number,
            discamt:Number,
            isgst:String,
            gst: Number,
            addons:Number,
            total: Number,
            amountPaid: Number,
            amountDue: Number,
            paymentType: String,
            payedon:Date
        }
    ],
    checkInStatus: { type: Boolean, default: false },
    checkOutStatus: { type: Boolean, default: false },
    addedAt: { type: Date, default: Date.now },
    bookingnotes: String,
    reservationNotes: String,
    notes: String
});

const bookingModel = new mongoose.model('booking',bookingSchema);
module.exports = bookingModel;

