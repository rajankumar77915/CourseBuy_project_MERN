/**working stege */

const OTP=require("../models/OTP")
const mailSender = require("../utils/mailSender")
exports.OTPSent=async(req,res)=>{
    try{
        const {email,CreatedAt,}=req.body;

        if(!email || !CreatedAt){
            return res.status(404).json({
                sucess:false,
                message:"all Fields required"
            })
        }
        //for generating the otg
        const otpGenerator = require('otp-generator')
        otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });   
        mailSender(email ,"opt sent by CourseWave",otpGenerator)

        
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:`error occurse at Otp sent :${error.message}`
        })
    }
}