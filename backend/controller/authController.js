const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../model/employeeModel");
const logsModel = require("../model/logsModel");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({email});
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login', 
                success: false 
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, ip, userAgent } = req.body;
        const user = await userModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: "Username is not exists", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "Password is incorrect", success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        )

        await logsModel.create({
            userid: user.name,
            action: 'login',
            actionat: new Date().toISOString(),
            logdetails: JSON.stringify({ ip, userAgent })
        });

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}

exports.logout = async (req, res) => {
    try{
        const { userId } = req.body;
        const user = await userModel.findOne({ name:userId });
        await logsModel.create({
            userid: user.name,
            action: 'logout',
            actionat: new Date().toISOString()
        });

        res.status(200)
            .json({
                message: "Logout Success",
                success: true
            })
    }catch(err){
        res.status(500)
            .json({
                message: err.message,
                success: false
            })
    }
}