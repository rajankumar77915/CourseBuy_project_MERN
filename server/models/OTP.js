const mongoose =require("mongoose")

const OTPSchema= mongoose.Schema({
    email:{
        require:true,
        type:String
    },
    otp:{
        type: String,
        require:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
        expires:5*60 //5min
    }
})

module.exports=mongoose.model("OTP",OTPSchema);