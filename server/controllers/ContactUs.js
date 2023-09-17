const User=require("../models/User")

exports.contactUs=async(req,res)=>{
    //find userId
    const {userId}=req.body;
    //verify user
    const  user= User.findById({userId});
    if(!user){
        return res.status(404).json({
            sucess:false,
            message:"user not found"
        })
    }
}