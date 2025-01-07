const mongoose = require('mongoose');
const connectDatabase = async() => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then((con) => {
        console.log("Database connected to the host : " + con.connection.host)
    })
}

module.exports = connectDatabase;