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
    let course;
    try{
         course=await  Course.findById({courseId});
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
    }catch(error){
        return res.json({
            sucess:true,
            message:`error at capturePayment  when validate courseDetail :${error}`
        })
    }
    


        
        //order create
        const amount=course.price;
        const currency="INR";
        
        const options={
            amount: amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId
            }
        }

        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log("paymentResponse",paymentResponse);

            //return response
            return res.status(200).json({
                sucess:true,
                courseName:course.courseName,
                courseDescribtion:course.courseDescribtion ,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })
        }catch(error){
            console.log("error occure at  apture payment fun");

            return res.json({
                sucess:true,
                message:`Could not initiate  order :${error}`
            })
        }
    
}

//verify Signature of the razorPay and server          (simple:server Secrect and razorpay sent Secret matching)
exports.verifySignature= async(req,res)=>{
    const webhookSecrect="omNamahshivay"; //my signature
    const signature =req.headers("x-razorpay-signature"); //razorpay's signature hash form got

     const shasum=crypto.createHmac("sha256",webhookSecrect);

     shasum.update(JSON.stringify(req.body));
     const digest=shasum.digest("hex");

     if(signature===digest){
        console.log("payment is authorized");
        const {courseId,userId}=req.body.payload.payment.entity.notes;
        try{
            //find course and enroll student
            const enrolledCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentEnrolled:{userId}}},{new:true});
            if(!enrolledCourse){
                return res.status(500).json({
                    sucess:false,
                    message:'course did not found'
                })
            }
            console.log(enrolledCourse);

            //find the student and add inside courese list  which enrolledCourse
            const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{$push:{Courses:courseId}},{new:true});
            
            console.log(enrolledStudent);
            
            //send confirmation mail
            const emailResponse=await mailSender(enrolledStudent.email,"Succesfully enrolled",`congratulation u have suceesfully enrolled ${enrolledCourse.courseName}`);
            console.log(emailResponse);
            
            return res.status(200).json({
                sucess:true,
                message:"signature verified AND course added"
            })
        }catch(error){
            console.log(error);
            return res.status(500).json({
                sucess:false,
                message: `error at verifySignature function : ${error.message}`
            });
        }
     }
     else{
        return res.status(400).json({
            sucess:false,
            message:"signature are diffrent"
        })
     }
}