const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : {type:String, required: true},
    email : {type:String, required: true},
    password : {type:String, required: true},
    verifyotp : {type:String, default: 0},
    verifyotpExpireAt : {type:Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOtp: {type: String, default: ''},
    resetOtpExpireAt: {type: Number, default: 0}
});

const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;