const hotelModel = require("../model/hotelModel");

exports.newHotel = async(req, res, next) => {
    const {hotelname, code} = req.body;
    try{
        const newBooking = await hotelModel.create({ hotelname, code});
        await newBooking.save();
        res.json({ success: true, message: "Hotel saved successfully!" });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getAllHotels = async (req, res, next) => {
    try {
        const hotels = await hotelModel.find();
        res.json({ success: true, hotels });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};