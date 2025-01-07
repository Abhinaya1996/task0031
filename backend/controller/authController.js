const employeeModel = require('../model/employeeModel');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

exports.userRegister = async(req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.json({succcess:false, message:"Missing details"});
    }

    try{

        const existingUser = await employeeModel.findOne({email});

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User Exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await employeeModel.create({ name, email, password: hashedPassword });
        
        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
        return res.status(201).json({ success: true, message: "User created successfully", newuser }); 
        

    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.userLogin = async(req, res, next) => {
    const {email, password } = req.body;

    if(!email || !password){
        return res.json({succcess:false, message:"Email and Password are required"});
    }

    try{
        const user = await employeeModel.findOne({email});

        if(!user){
            return res.json({succcess:false, message:"User not found"});
        }
        
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({succcess:false, message:"Password is incorrect"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({success:true});

    }catch(err){
        console.log(err);
        res.json({succcess:false, message:"Email / Password is incorrect"}); 
    }
}

exports.userLogout = async(req, res, next) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json({success: true, mesage:"Logged out"})
    }catch(err){

    }
}