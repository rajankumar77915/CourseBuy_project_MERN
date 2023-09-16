const { default: mongoose } = require('mongoose')
const {instance}=require('../../config/razorpay')
 const Course=require("../../models/Course")
 const User=require("../../models/User")
 const mailSender=require("../../utils/mailSender")
//  const {courseEnrollmentEmail}=

// capture the payment and initiate the Razorpay order
exports.capturePayment=async(req,res)=>{
    //get courseId and UserId
    const {courseId}=req.body;
    const {userId}=req.user.id;
    //validation
    //valid CourseId
    if(!courseId){
        return res.json({
            sucess:false,
            message:"please provide valid courseId"
        })
    };
    //valid courseDetail
    try{
        const course=await  Course.findById({courseId});
        if(!course){
            return res.json({
                sucess:false,
                message:"could not find the course"
            }) 
        }


        //user already pay for the same course
        const uid=new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled .includes(uid)){
            return res.status(200).json({
                sucess:false,
                message:"student is already enrolled"
            })
        }


        
        //order create
        const amount=course.price;
        const currency="INR";
        
    }catch(error){

    }
    
    // order create
    //return response
    
}