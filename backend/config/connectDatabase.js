const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const con = await mongoose.connect(process.env.MONGODB_URI);

        console.log("Database connected to the host: " + con.connection.host);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
 