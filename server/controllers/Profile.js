const Profile=require("../models/Profile")

exports.createProfile=async(req,res)=>{
    try{
        const {gender, DOB,about,contactNumber,user_id}=req.body;

        if(!gender || !DOB || !about || !contactNumber){
            return res.status(404).json({
                sucess:false,
                message:"all Fields required"
            })
        }

        const profileDetails=await Profile.create({gender,DOB,about,contactNumber});
        if(!profileDetails){
            return res.status(400).json({
                sucess:false,
                message:`profile not found or created`
            })
        }
        console.log("profile detail"+profileDetails);
        //validation user_id
        const userDetail=await User.findById(user_id);
        if(!userDetail){
            return res.status(404).json({
                sucess:false,
                message:`user_id not fond`
            })
        }
        //add profile into user
        const userDetailUpdated=await User.findByIdAndUpdate({_id:user_id},{additionalDetails:Profile}) .populate();
        if(!userDetailUpdated){
            return res.status(400).json({
                sucess:false,
                message:`userDetailUpdated unsucess`
            })
        }


        console.log("user details:",userDetailUpdated);
        return res.status(200).json({
            sucess:true,
            message:`sucessfully added profile`
        })

        
    }catch(error){
        res.status(500).json({
            sucess:false,
            message:`error occurse at cretaing the profile :${error.message}`
        })
    }
}