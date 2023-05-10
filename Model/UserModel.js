const mongoose = require("mongoose");
const bcrypt =require("bcrypt");

const UserSchema = new mongoose.Schema({
    Name:{type:String, required:true, index:true},
    Email : { type: String, require: true, unique:true,sparse:true},
    // Mobile :{
    //     type : String, require:true
    // },
    // Address:{
    //     type:String
    // },
    Pass : String
});

UserSchema.pre("save",async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(this.Pass,salt);
        this.Pass = hashed;
        // console.log("Hashed-Password==>", this.Pass)
        next();
    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model("user",UserSchema);

module.exports = User;