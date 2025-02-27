const bookingModel = require("../model/bookingModel");
const hotelModel = require('../model/hotelModel');
const transporter = require('../config/nodemailer');
const logsModel = require("../model/logsModel");
const moment = require('moment');

const generateBookingID = async (hotelName) => {
    let sellhott = "";
    if (hotelName === "MAA GRAND") {
      sellhott = "MAAG";
    } else if (hotelName === "MAA RESIDENCY") {
      sellhott = "MAAR";
    } else if (hotelName === "MAA SERVICE APARTMENTS") {
      sellhott = "MAASA";
    }
  
    // Query for the last booking for this hotel
    const lastBooking = await bookingModel
      .find({ hotelid: hotelName })
      .sort({ bookingNo: -1 })
      .limit(1);
  
    // Default new booking id if none exists
    let newBookingId = `${sellhott.toUpperCase()}001`;
  
    if (lastBooking.length > 0) {
      const lastBookingNo = lastBooking[0].bookingNo;
      // Remove the prefix to parse the numeric portion.
      const lastNumber = parseInt(lastBookingNo.replace(sellhott, ''), 10);
      const newNumber = lastNumber + 1;
      newBookingId = `${sellhott.toUpperCase()}${String(newNumber).padStart(3, '0')}`;
    }
  
    return newBookingId;
  };
  

exports.newBooking = async (req, res, next) => {
    const bookingData = req.body;
    try {
        const bookingNo = await generateBookingID(bookingData.hotelid);
        bookingData.bookingNo = bookingNo;

        const hotelName = bookingData.hotelid;
        const hotels = hotelModel.getHotels();
        const hotelInfo = hotels[hotelName][0];
        const hotelAddress = hotelInfo.address || 'Address not available';
        const hotelPhone = hotelInfo.phone || 'Phone not available';

        const newBooking = new bookingModel(bookingData);
        await newBooking.save();

        await logsModel.create({
            userid: bookingData.staffid,
            action: 'New Booking',
            actionat: new Date().toISOString(),
            hotelid: bookingData.hotelid,
            bookingid: bookingNo
        });

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
                                                <p style="font-size: 14px; color:black;">Hotel Address: ${hotelAddress}</p>
                                                <p style="font-size: 14px; color:black;">Hotel Phone Number: ${hotelPhone}</p>
                                                <p style="font-size: 14px; color:black;">Hotel Mail Id: maa.greamsroad@gmail.com</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                                                <p>Check-in</p>
                                                <p><b>Date : </b> ${new Date(bookingData.checkin_Booking).toLocaleDateString('en-GB')}</p>
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

exports.editBooking = async (req, res, next) => {
    const { bookingId } = req.params; // Booking ID from request params
    const updatedBookingData = req.body; // Updated booking details

    try {
        // Find the existing booking
        const existingBooking = await bookingModel.findOne({ bookingId });

        if (!existingBooking) {
            return res.status(404).json({ success: false, message: "Booking not found!" });
        }

        // Update the booking with new values
        Object.assign(existingBooking, updatedBookingData);
        await existingBooking.save();

        // Log the update action
        await logsModel.create({
            userid: updatedBookingData.staffid,
            action: 'Edit Booking',
            actionat: new Date().toISOString(),
            hotelid: existingBooking.hotelid,
            bookingid: bookingNo
        });

        res.json({ success: true, message: "Booking updated successfully!" });
    } catch (err) {
        console.error("Error updating booking:", err);
        res.status(500).json({ message: err.message });
    }
};


exports.shiftRoom = async (req, res, next) => {
    try {
      const { oldBookingId, newRoomNumber } = req.body;
  
      if (!oldBookingId || !newRoomNumber) {
        return res.status(400).json({ message: "Old booking ID and new room number are required." });
      }
  
      // Find the old booking
      const oldBooking = await bookingModel.findOne({ bookingNo: oldBookingId });
      if (!oldBooking) {
        return res.status(404).json({ message: "Original booking not found." });
      }
  
      // Mark the old booking as shifted/inactive
      oldBooking.checkInStatus = "false"; // Mark as shifted
      oldBooking.checkOutStatus = "true";
      await oldBooking.save();
  
      // Generate a new booking ID for the shifted booking
      const newBookingNo = await generateBookingID(oldBooking.hotelid);
  
      // Prepare the new booking data
      const newBookingData = {
        ...oldBooking.toObject(), // Copy all old booking details
        bookingNo: newBookingNo, // New booking ID
        roomNumbers: newRoomNumber, // Updated room number
        checkin_Booking: new Date().toISOString(), // Set new check-in date/time
        status: "active", // Mark as active
      };
  
      // Remove _id field before saving as a new document
      delete newBookingData._id;
  
      // Save the new booking
      const newBooking = new bookingModel(newBookingData);
      await newBooking.save();
  
      // Log the room shift action
      await logsModel.create({
        userid: oldBooking.staffid,
        action: 'Room Shift',
        actionat: new Date().toISOString(),
        hotelid: oldBooking.hotelid,
        bookingid: newBookingNo,
        details: `Room shifted from ${oldBooking.roomNumbers} to ${newRoomNumber}. Booking ID : ${bookingNo}`,
      });
  
      res.status(201).json({
        success: true,
        message: "Room shifted successfully.",
        newBooking,
      });
  
    } catch (err) {
      console.error("Error in room shift:", err);
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

        const hotelName = bookingData.hotelid;
        const hotels = hotelModel.getHotels();
        const hotelInfo = hotels[hotelName][0];
        const hotelAddress = hotelInfo.address || 'Address not available';
        const hotelPhone = hotelInfo.phone || 'Phone not available';

        

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
                                                <p style="font-size: 14px; color:black;">Hotel Address: ${hotelAddress}</p>
                                                <p style="font-size: 14px; color:black;">Hotel Phone Number: ${hotelPhone}</p>
                                                <p style="font-size: 14px; color:black;">Hotel Mail Id: maa.greamsroad@gmail.com</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style="padding: 10px; border: 1px solid #ddd;border-right: none;">
                                                <p>Check-In</p>
                                                <p><b>Date : </b> ${new Date(bookingData.checkin_Booking).toLocaleDateString('en-GB')}</p>
                                                <p><b>Time : </b> ${new Date(bookingData.checkin_Booking).toLocaleTimeString()}</p>
                                            </td>
                                            <td style="padding: 10px; border: 1px solid #ddd;text-align: right;border-left: none;">
                                                <p>Check-Out</p>
                                                <p><b>Date : </b> ${new Date(bookingData.checkout).toLocaleDateString('en-GB')}</p>
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
                                                <p>INR ${bookingData.payment_Reserve[0].total}/-</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="padding: 10px; border: 1px solid #ddd;">
                                                <p><b>Balance Amount</b></p>
                                                <p>INR ${bookingData.payment_Reserve[0].amountDue}/-</p>
                                            </td>
                                            <td style="padding: 10px; border: 1px solid #ddd;text-align: right;">
                                                <p><b>Paid Amount</b></p>
                                                <p>INR${bookingData.payment_Reserve[0].amountPaid}/-</p>
                                                <p>Paid INR ${bookingData.payment_Reserve[0].amountPaid} via ${bookingData.payment_Reserve[0].paymentType} </p>
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
    const { bookingNo, loguser, selectedHotel, updatedData } = req.body;

    try {
        const updatedBooking = await bookingModel.findOneAndUpdate(
            { _id : bookingNo },
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        await logsModel.create({
            userid: loguser,
            action: 'Reservation',
            actionat: new Date().toISOString(),
            hotelid: selectedHotel,
            bookingid: bookingNo
        });

        if (!updatedBooking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({ success: true, message: 'Booking updated successfully', updatedBooking });
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

    exports.updateBookingReserveDetails = async(req, res) => {
        try {
            const { bookingNo, newPaymentEntry } = req.body;
    
            // Find the booking and update payment_Reserve array
            const updatedBooking = await bookingModel.findOneAndUpdate(
                { bookingNo: bookingNo },
                { $push: { payment_Reserve: newPaymentEntry } },
                { new: true } // Returns the updated document
            );
    
            if (!updatedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
    
            res.status(200).json({ message: "Booking updated successfully", updatedBooking });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error });
        }
    };
    

    exports.updCheckout = async (req, res, next) => {
        try {
            const { bookingNo, checkout } = req.body;
    
            if (!bookingNo) {
                return res.status(400).json({ success: false, message: "Booking number is required" });
            }
    
            // Find the booking data for logging
            const bookingData = await bookingModel.findOne({ bookingNo });
            if (!bookingData) {
                return res.status(404).json({ success: false, message: "Booking not found" });
            }
    
            // Update checkout, checkInStatus, and checkOutStatus correctly
            const booking = await bookingModel.findOneAndUpdate(
                { bookingNo },
                {
                    $set: {
                        checkout: checkout,  // Set checkout date
                        checkInStatus: false,  // Mark check-in as false
                        checkOutStatus: true   // Mark checkout as true
                    }
                },
                { new: true } // Return updated document
            );
    
            if (!booking) {
                return res.status(404).json({ success: false, message: "Booking update failed" });
            }
    
            // Log the action
            await logsModel.create({
                userid: bookingData.staffid,
                action: 'Check Out',
                actionat: new Date().toISOString(),
                hotelid: bookingData.hotelid,
                bookingid: bookingNo
            });
    
            res.json({ success: true, booking });
    
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    };
    


exports.getSingleBookings = async (req, res, next) => {
    try {
        const { bookingId } = req.query;
        const booking = await bookingModel.find({_id:bookingId});

        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.getAllBookings = async (req, res, next) => {
//     try {
//         const { hotelid } = req.query;
//         const bookings = await bookingModel.find({hotelid:hotelid});

//         res.json({ success: true, bookings });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getAllBookings = async (req, res, next) => {
    try {
        const { hotelid, selectedDate } = req.query;

        if (!selectedDate) {
            return res.status(400).json({ success: false, message: "Selected date is required." });
        }

        const date = new Date(selectedDate);
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));

        console.log("Start of Day:", startOfDay);
        console.log("End of Day:", endOfDay);

        // Fetch bookings where:
        // 1. The check-in date is on or before the selected date, and the guest is still checked in (not checked out).
        // 2. OR the reservation is scheduled for today but not yet checked in.
        const bookings = await bookingModel.find({
            hotelid: hotelid,
            $or: [
                {
                    checkin_Booking: { $lte: endOfDay }, // Checked in on or before today
                    checkOutStatus: false, // Still in-house
                },
                {
                    checkin_Booking: { $gte: startOfDay, $lte: endOfDay }, // Reservations for today
                    checkInStatus: false, // Not yet checked in
                }
            ]
        }).sort({ checkin_Booking: -1 }); // Sort by check-in date

        res.json({ success: true, bookings });
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
};

exports.getHotelBookings = async (req, res, next) => {
    try {
        const { hotelid, date } = req.query;
        const selectedDate = moment(date, 'YYYY-MM-DD');
        const today = moment();

        let query;

        if (selectedDate.isSame(today, 'day')) {
            // For the current date, list all bookings from start of the day onward.
            const startOfDay = selectedDate.startOf('day').toISOString();
            query = {
                hotelid: hotelid,
                checkInStatus: false,
                checkOutStatus: false,
                checkin_Booking: { $gte: startOfDay }
            };
        } else {
            // For any other day, list bookings within that day only.
            const startOfDay = selectedDate.startOf('day').toISOString();
            const endOfDay = selectedDate.endOf('day').toISOString();
            query = {
                hotelid: hotelid,
                checkInStatus: false,
                checkOutStatus: false,
                checkin_Booking: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            };
        }

        // Sort bookings by `checkin_Booking` in ascending order (1)
        const bookings = await bookingModel.find(query).sort({ checkin_Booking: 1 });

        res.json({ success: true, bookings });
    } catch (err) {
        console.error("Error fetching hotel bookings:", err);
        res.status(500).json({ message: err.message });
    }
};
  

exports.getInhouseBookings = async (req, res, next) => {
    try {
        const { hotelid, selectedDate } = req.query;

        if (!selectedDate) {
            return res.status(400).json({ success: false, message: "Selected date is required." });
        }

        // Convert selectedDate to end of the day in UTC
        const selectedDateObj = new Date(selectedDate);
        selectedDateObj.setUTCHours(23, 59, 59, 999);

        console.log("Selected Date (UTC):", selectedDateObj.toISOString());

        // Fetch in-house guests (Checked in on or before selected date & NOT checked out)
        const bookings = await bookingModel.find({
            hotelid: hotelid,
            checkInStatus: true,
            checkOutStatus: false,
            checkin_Booking: { 
                $lte: selectedDateObj // Guests who checked in on or before the selected date
            }
        })
        .sort({ checkin_Reserve: 1 }); // Sort in ascending order

        console.log("Sorted In-house Bookings:", bookings);

        res.json({ success: true, bookings });

    } catch (err) {
        console.error("Error fetching in-house bookings:", err);
        res.status(500).json({ message: err.message });
    }
};



exports.getGuesthistory = async (req, res, next) => {
    try {
        const { hotelid } = req.query;
        const bookings = await bookingModel.find({hotelid:hotelid, checkInStatus:false, checkOutStatus:true});
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getLogsByDate = async (req, res) => {
    try {
        const { selectedDate, hotelid } = req.query;

        if (!selectedDate) {
            return res.status(400).json({ success: false, message: 'Invalid date provided.' });
        }

        const startOfDay = new Date(selectedDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(selectedDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Aggregate unique check-ins and check-outs
        const counts = await logsModel.aggregate([
            {
                $match: {
                    hotelid: hotelid,
                    actionat: { $gte: startOfDay.toISOString(), $lte: endOfDay.toISOString() },
                },
            },
            {
                $group: {
                    _id: { action: "$action", bookingid: "$bookingid" }, // Group by action & bookingid
                },
            },
            {
                $group: {
                    _id: "$_id.action",
                    uniqueBookings: { $sum: 1 } // Count unique booking IDs per action
                },
            },
            {
                $project: {
                    action: "$_id",
                    count: "$uniqueBookings",
                    _id: 0,
                },
            },
        ]);

        // Extract unique counts
        const checkInCount = counts.find(c => c.action === 'Reservation')?.count || 0;
        const checkOutCount = counts.find(c => c.action === 'Check Out')?.count || 0;

        res.json({ success: true, checkInCount, checkOutCount });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching log counts', error: err.message });
    }
};



exports.getRoomAvailability = async (req, res) => {
    try {
        const { hotelid, selectedDate } = req.query;
        const selectedDateObj = new Date(selectedDate);

        // Fetch hotel details
        const hotels = hotelModel.getHotels();
        const hotelInfo = hotels[hotelid];

        if (!hotelInfo) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const rooms = hotelInfo;

        // Find booked rooms (checked in but NOT checked out)
        const bookedRooms = await bookingModel.find({
            hotelid: hotelid,
            checkInStatus: true,
            checkOutStatus: false, // Not checked out yet
            checkin_Booking: { 
                $lte: new Date(selectedDateObj.setHours(23, 59, 59, 999)) // Check-ins that happened before or on the selected date
            }
        });

        // Find reserved rooms (not checked in yet but reserved for the selected date)
        const reservedRooms = await bookingModel.find({
            hotelid: hotelid,
            checkInStatus: false,
            checkOutStatus: false,
            checkin_Reserve: {
                $gte: new Date(selectedDateObj.setHours(0, 0, 0, 0)),
                $lt: new Date(selectedDateObj.setHours(23, 59, 59, 999))
            }
        });

        // Count available rooms
        const availableRoomsCount = rooms.reduce((count, roomType) => {
            const availableRoomCountForType = roomType.rooms.filter(
                roomNumber =>
                    !bookedRooms.some(booking => booking.roomNumbers.includes(roomNumber.toString())) &&
                    !reservedRooms.some(booking => booking.roomNumbers.includes(roomNumber.toString()))
            ).length;
            return count + availableRoomCountForType;
        }, 0);

        res.json({
            success: true,
            hotelName: hotelid,
            hotelAddress: hotelInfo[0]?.address || 'Address not available',
            hotelPhone: hotelInfo[0]?.phone || 'Phone not available',
            availableRoomsCount,
            reservedRoomsCount: reservedRooms.length, // Number of reserved rooms
            bookedRoomsCount: bookedRooms.length // Number of checked-in rooms (including past check-ins)
        });

    } catch (err) {
        console.error('Error fetching room availability:', err);
        res.status(500).json({ message: 'Error fetching room availability' });
    }
};



// Endpoint for fetching reports
exports.getReports = async (req, res) => {
    try {
        const { reportType, hotelid, selectedDate, selectedRoom } = req.query;

        // Parsing the selectedDate to a Date object
        const selectedDateObj = selectedDate ? new Date(selectedDate) : new Date();

        let startDate, endDate;
        
        switch (reportType) {
            case 'daily':
                // Filter for today's bookings
                startDate = new Date(selectedDateObj.setHours(0, 0, 0, 0));
                endDate = new Date(selectedDateObj.setHours(23, 59, 59, 999));
                break;
            case 'monthly':
                // Filter for the current month
                startDate = new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth(), 1);
                endDate = new Date(selectedDateObj.getFullYear(), selectedDateObj.getMonth() + 1, 0, 23, 59, 59, 999);
                break;
            case 'roomwise':
                // Room-wise report (filter by room type or room number)
                startDate = new Date(0); // Start from the beginning of time
                endDate = new Date(); // Until now
                break;
            default:
                return res.status(400).json({ message: "Invalid report type" });
        }

        // Building the query filter
        let filter = { hotelid, checkin_Booking: { $gte: startDate, $lte: endDate } };

        if (reportType === 'roomwise' && selectedRoom) {
            filter.roomType = selectedRoom; // Filter by room type if provided
        }

        // Fetching bookings based on the filter
        const bookings = await bookingModel.find(filter);

        res.json({ success: true, bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getRoomWiseSales = async (req, res) => {
    try {
        const { hotelid, startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ success: false, message: "Start and end dates are required." });
        }

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        // Fetch raw data before aggregation for debugging
        const matchedBookings = await bookingModel.find({
            hotelid: hotelid,
            checkin_Booking: { $gte: start, $lte: end },
        });

        console.log("Matched Bookings:", matchedBookings);

        const salesReport = await bookingModel.aggregate([
            {
                $match: {
                    hotelid: hotelid,
                    checkin_Booking: { $gte: start, $lte: end },
                }
            },
            {
                $unwind: { path: "$bedType", preserveNullAndEmptyArrays: true } // Ensures even empty rooms do not break
            },
            {
                $unwind: { path: "$payment_Booking", preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: "$bedType", // Group by room number
                    totalRevenue: { $sum: { $ifNull: ["$payment_Booking.total", 0] } }, // Handle missing payments
                    totalBookings: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Sort by room number in ascending order
            }
        ]);

        console.log("Sales Report:", salesReport);

        res.json({ success: true, salesReport });
    } catch (err) {
        console.error("Error fetching room-wise sales report:", err);
        res.status(500).json({ success: false, message: 'Error fetching room-wise sales report', error: err.message });
    }
};


exports.getcheckinoutReports = async (req, res) => {
    try {
        const { startDate, endDate, hotelid } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ success: false, message: "Start and end dates are required." });
        }

        // Convert the startDate and endDate to Date objects
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0); // Set to the beginning of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Set to the end of the day

        // Construct the aggregation pipeline
        const matchStage = {
            $match: {
                checkin_Booking: { $gte: start, $lte: end }, // Date range filter
            },
        };

        if (hotelid) {
            // If hotelid is provided, add the hotel filter
            matchStage.$match.hotelId = hotelid;
        }

        const reports = await bookingModel.aggregate([
            matchStage,
            {
                $project: {
                    bookingNo: "$bookingNo",
                    guestName: "$guestDetails.name",
                    roomNo: "$rooms",
                    checkinDate: "$checkin_Booking",
                    checkoutDate: "$checkout_Booking",
                    stayDuration: {
                        $dateDiff: {
                            startDate: "$checkin_Booking",
                            endDate: "$checkout_Booking",
                            unit: "day",
                        },
                    },
                },
            },
            { $sort: { checkinDate: 1 } }, // Sort by check-in date
        ]);

        if (reports.length === 0) {
            return res.status(404).json({ success: false, message: "No records found for the specified date range." });
        }

        res.json({ success: true, reports });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching check-in/check-out report", error: err.message });
    }
};



