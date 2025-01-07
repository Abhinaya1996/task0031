const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname,'.env')})

const app = express();
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

app.get('/', (req,res) => {
    res.send("API is working");
})

const authRouter = require('./routes/authRoutes');
app.use('/api/auth',authRouter);

connectDatabase();

app.listen(port, () => console.log(`Server running on the port ${port}`));