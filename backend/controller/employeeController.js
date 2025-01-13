const employeeModel = require('../model/employeeModel');

exports.employeeData = async (req, res) => {
    try{
        const {userid}= req.body;
        const user = await employeeModel.findById(userid);
        if(!user){
            return res.json({success:false, message: "User not found"});
        }

        return res.json({success:true, userData :{name: user.name, isAccountVerified: user.isAccountVerified}});

    }catch(err){
        return res.json({success:false, message: err.message})
    }
};
