const bookingModel = require("../model/bookingModel");
const transporter = require('../config/nodemailer');

const generateBookingID = async (hotelName) => {
    const lastBooking = await bookingModel.find({ hotelid: hotelName }).sort({ bookingNo: -1 }).limit(1);
    let newBookingId = `${hotelName.toUpperCase()}001`;

    if (lastBooking.length > 0) {
        const lastBookingNo = lastBooking[0].bookingNo;
        const lastNumber = parseInt(lastBookingNo.replace(hotelName, ''), 10); 
        const newNumber = lastNumber + 1;
        newBookingId = `${hotelName.toUpperCase()}${String(newNumber).padStart(3, '0')}`;
    }

    return newBookingId;
};

exports.newBooking = async (req, res, next) => {
    const bookingData = req.body;
    try {
        const bookingNo = await generateBookingID(bookingData.hotelid);
        bookingData.bookingNo = bookingNo;

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        // HTML template for the email
        const mailContent = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding-top: 20px;">

    <table style="width: 100%; max-width: 800px; margin: auto; border: 0px solid #ddd; border-collapse: collapse;">
        <thead>
            <tr >
                <th style="text-align: left; padding: 15px; font-size: 20px;">
                    Booking Voucher
                </th>
                <th style="text-align: right; padding: 15px; font-size: 20px;">
                    <p style="font-size: 14px; color:black;">Booking Id : ${bookingNo}</p>
                </th>
            </tr>
        </thead>
    </table>
    <table style="width: 100%; max-width: 800px; margin: auto; border: 1px solid #ddd; border-radius: 20px 20px 0px 0px;">
        <thead>
            <tr>
                <th colspan="2" style="text-align: left; padding: 15px; font-size: 20px;">
                    <p>${bookingData.hotelid || 'our hotel'}</p>
                    <p style="font-size: 14px; color:black;">Hotel Address</p>
                    <p style="font-size: 14px; color:black;">Hotel Phone Number</p>
                    <p style="font-size: 14px; color:black;">Hotel Mail Id </p>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p>Check-in</p>
                    <p><b>Date : </b> ${new Date(bookingData.checkin_Booking).toLocaleDateString()}</p>
                    <p><b>Time : </b> ${new Date(bookingData.checkin_Booking).toLocaleTimeString()}</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;text-align: right;border-left: none;">
                    
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p>${bookingData.guestCount} Guests</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;border-left: none;">
                    <p>${bookingData.personName}</p>
                    <p>${bookingData.email} </p>
                    <p>${bookingData.mobile} </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p><b>Total Amount </b>  </p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;border-left: none;text-align: right;">
                    <p>INR ${bookingData.payment_Booking[0].total}/-</p>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <p><b>Balance Amount</b></p>
                    <p>INR ${bookingData.payment_Booking[0].amountDue}/-</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;text-align: right;">
                    <p><b>Paid Amount</b></p>
                    <p>INR${bookingData.payment_Booking[0].amountPaid}/-</p>
                    <p>Paid INR ${bookingData.payment_Booking[0].amountPaid} via UPI </p>
                </td>
            </tr>
        </tbody>
    </table>
    <div style="width: 100%; max-width: 800px; margin: auto; padding-top: 10px;">
        <b>Important information</b>
        <ul>
            <li>Passport, Aadhar and Driving License are accepted as ID proof(s). Local ids not allowed</li>
            <li>GST invoice can be collected directly from the property.</li>
        </ul>
    </div>
    <p style="text-align: center; font-size: 14px; color: #555; margin-top: 20px;">
        Thank you for choosing ${bookingData.hotelName || 'our hotel'}! We look forward to hosting you.
    </p>
    <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
        If you have any questions or need assistance, please contact us at support@example.com or call us at +91 1234567890.
    </div>
</div>`;

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: newBooking.email,
            subject: "Your Booking Confirmation - " + bookingData.hotelid,
            html: mailContent, // Use the HTML template here
        };

        await transporter.sendMail(mailoptions);

        res.json({ success: true, message: "Booking saved and confirmation email sent successfully!" });
    } catch (err) {
        console.error("Error saving booking:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.sendRmail = async (req, res, next) => {
    const { bookingNo } = req.body;
    try {
        const bookingData = await bookingModel.findOne({ bookingNo });
        if (!bookingData) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }



        // HTML template for the email
        const mailContent = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding-top: 20px;">

    <table style="width: 100%; max-width: 800px; margin: auto; border: 0px solid #ddd; border-collapse: collapse;">
        <thead>
            <tr >
                <th style="text-align: left; padding: 15px; font-size: 20px;">
                    Booking Voucher
                </th>
                <th style="text-align: right; padding: 15px; font-size: 20px;">
                    <p style="font-size: 14px; color:black;">Booking Id : ${bookingNo}</p>
                </th>
            </tr>
        </thead>
    </table>
    <table style="width: 100%; max-width: 800px; margin: auto; border: 1px solid #ddd; border-radius: 20px 20px 0px 0px;">
        <thead>
            <tr>
                <th colspan="2" style="text-align: left; padding: 15px; font-size: 20px;">
                    <p>${bookingData.hotelid || 'our hotel'}</p>
                    <p style="font-size: 14px; color:black;">Hotel Address</p>
                    <p style="font-size: 14px; color:black;">Hotel Phone Number</p>
                    <p style="font-size: 14px; color:black;">Hotel Mail Id </p>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p>Check-in</p>
                    <p><b>Date : </b> ${new Date(bookingData.checkin_Booking).toLocaleDateString()}</p>
                    <p><b>Time : </b> ${new Date(bookingData.checkin_Booking).toLocaleTimeString()}</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;text-align: right;border-left: none;">
                    <p>Check-in</p>
                    <p><b>Date : </b> ${new Date(bookingData.checkout).toLocaleDateString()}</p>
                    <p><b>Time : </b> ${new Date(bookingData.checkout).toLocaleTimeString()}</p>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p>${bookingData.guestCount} Guests</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;border-left: none;">
                    <p>${bookingData.personName}</p>
                    <p>${bookingData.email} </p>
                    <p>${bookingData.mobile} </p>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                    <p><b>Total Amount </b>  </p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;border-left: none;text-align: right;">
                    <p>INR ${bookingData.payment_Booking[0].total}/-</p>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <p><b>Balance Amount</b></p>
                    <p>INR ${bookingData.payment_Booking[0].amountDue}/-</p>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;text-align: right;">
                    <p><b>Paid Amount</b></p>
                    <p>INR${bookingData.payment_Booking[0].amountPaid}/-</p>
                    <p>Paid INR ${bookingData.payment_Booking[0].amountPaid} via UPI </p>
                </td>
            </tr>
        </tbody>
    </table>
    <div style="width: 100%; max-width: 800px; margin: auto; padding-top: 10px;">
        <b>Important information</b>
        <ul>
            <li>Passport, Aadhar and Driving License are accepted as ID proof(s). Local ids not allowed</li>
            <li>GST invoice can be collected directly from the property.</li>
        </ul>
    </div>
    <p style="text-align: center; font-size: 14px; color: #555; margin-top: 20px;">
        Thank you for choosing ${bookingData.hotelName || 'our hotel'}! We look forward to hosting you.
    </p>
    <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
        If you have any questions or need assistance, please contact us at support@example.com or call us at +91 1234567890.
    </div>
</div>`;

        const mailoptions = {
            from: process.env.SENDER_EMAIL,
            to: bookingData.email,
            subject: "Your Booking Confirmation - " + bookingData.hotelid,
            html: mailContent, // Use the HTML template here
        };

        await transporter.sendMail(mailoptions);

        res.json({ success: true, message: "Booking saved and confirmation email sent successfully!" });
    } catch (err) {
        console.error("Error saving booking:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.updateBookingDetails = async (req, res) => {
    const { bookingNo, updatedData } = req.body;

    try {
        const updatedBooking = await bookingModel.findOneAndUpdate(
            { bookingNo },
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: 'Booking updated successfully', updatedBooking });
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};





exports.getSingleBookings = async (req, res, next) => {
    try {
        const { bookingNo } = req.query;
        const booking = await bookingModel.find({bookingNo:bookingNo});

        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllBookings = async (req, res, next) => {
    try {
        const { hotelid } = req.query;
        const bookings = await bookingModel.find({hotelid:hotelid});

        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHotelBookings = async (req, res, next) => {
    try {
        const { hotelid } = req.query;
        const bookings = await bookingModel.find({hotelid:hotelid, checkInStatus:false});

        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInhouseBookings = async (req, res, next) => {
    try {
        const { hotelid } = req.query;
        const bookings = await bookingModel.find({hotelid:hotelid, checkInStatus:true});
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};