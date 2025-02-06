const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname,'.env')})


const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req,res) => {
    res.send("API is working");
})

const employeeRouter = require('./routes/employeeRoutes');
const booking = require('./routes/bookingRoutes');
const hotel = require('./routes/hotelRoutes');
const AuthRouter = require('./routes/authRoutes');
const Room = require('./routes/roomRoutes');
const Logs = require('./routes/logRoutes');

app.use('/api/employee',employeeRouter);
app.use('/api/book',booking);
app.use('/api/hotel',hotel);
app.use('/auth', AuthRouter); 
app.use('/logs', Logs); 
app.use('/room', Room);

connectDatabase();

app.listen(port, () => console.log(`Server running on the port ${port}`));