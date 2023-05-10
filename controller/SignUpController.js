const User = require("../Model/UserModel");

exports.createUser = async(req,res)=>{
    // console.log("Before",req.body.User);
    // const respose = await User.create(req.body.User);
    // console.log("After",req.body.User);
    try {
        const newUser = new User({...req.body.User});
        await newUser.save();
        res.status(200).json({
            status:"Success",
            newUser
        });
    } catch (error) {
        res.status(404).json({
            status:"fail",
            message:"User with this email id is alredy exist"
        });
    }

}
