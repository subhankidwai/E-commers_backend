const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignIn = async (req, res) => {
  const plainPass = req.body.User.Pass;

  try {
        console.log(req.body.User.Email);
        const doseExist = await User.findOne({ Email: req.body.User.Email });
        console.log(doseExist);
        if (doseExist) {
            const check = await bcrypt.compare(plainPass,doseExist.Pass);
            if (check) {
                jwt.sign({doseExist},process.env.SECRET_KEY,(err,token)=>{
                    if(err){
                        throw new Error(err);
                    }else{
                        res.status(200).json({
                            status:"Success",
                            UserID:doseExist._id,
                            UserName:doseExist.Name,
                            token
                        });
                    }
                })
            }else{
                res.status(400).json({
                    status:"fail",
                    message:"userName or Pass is incorrect"
                });
            }
        }else{
            res.status(400).json({
                status:"fail",
                message:"userName or Pass is incorrect"
            });
        }
  } catch (error) {
    console.log(error);
    res.status(400).json({
        status:"fail",
        error
    });
  }
};




exports.verify = (req,res)=>{
    const token = req.headers['authorization'].replace(/"|'/g, '');
    console.log(token);
    // const userID = decodedToken.userID;
    // console.log(userID);
    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.status(400).json({
                    status:false,
                    UserID:undefined,
                    UserName:undefined
                });
            }else{
                console.log(decodedToken);
                res.status(200).json({
                    status:true,
                    UserID:decodedToken.doseExist._id,
                    UserName:decodedToken.doseExist.Name
                });
            }
        });
    }else{
        // res.end(token);
        res.status(400).json({
            status:false,
            UserID:undefined,
            UserName:undefined
        });
    }

}