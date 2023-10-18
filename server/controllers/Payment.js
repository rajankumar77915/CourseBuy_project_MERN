const { default: mongoose } = require('mongoose')
const {instance}=require('../config/razorpay')
 const Course=require("../models/Course")
 const User=require("../models/User")
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSucessEmaill");
const crypto = require("crypto");

//initiate the razorpay order
exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    // xonsole.log("gello",)
    const userId = req.user.id;
    
    if(courses.length === 0) {
        return res.json({success:false, message:"Please provide Course Id"});
    }
    
    let totalAmount = 0;
   if(typeof(courses)===typeof([])) {
       for(const course_id of courses) {
        let course;
        try{
            
            console.log("----------------------------",req.body,req.user)
            course = await Course.findById(course_id);
            if(!course) {
                return res.status(200).json({success:false, message:"Could not find the course"});
            }

            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
    }
//without cart
    else{
                const course = await Course.findById(courses);
                if(!course) {
                    return res.status(200).json({success:false, message:"Could not find the course"});
                }
                const uid  = new mongoose.Types.ObjectId(userId);
                if(course.studentEnrolled?.includes(uid)) {
                    return res.status(200).json({success:false, message:"Student is already Enrolled"});
                }

                totalAmount += course.price;
    }
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }

}


//verify the payment
exports.verifySignature = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    
    console.log("at verify signature:",req.body)
    console.log("at verify signature:",req?.user)
    const courses = req.body?.courses;
    const userId = req.user.id;
    console.log("------------------------------------------- sucess step:1")
    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
        }
        
        console.log("------------------------------------------- sucess step:2")
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
        
        console.log("------------------------------------------- sucess step:3")
        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        console.log("------------------------------------------- unsucess step:4")
        return res.status(200).json({success:"false", message:"Payment Failed"});

}


const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }
    console.log("------------------------------------------- sucess step e:1")
    if(typeof(courses)===typeof([])){
        for(const courseId of courses) {
            try{
                //find the course and enroll the student in it
            SubEnrollStudent(courseId,userId ,res);
            //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}
else{
    console.log("------------------------------------------- sucess step e:2")
    // without cart
    SubEnrollStudent(courses,userId,res);
}
}

const SubEnrollStudent=async(courseId, userId, res)=>{
    console.log("------------------------------------------- sucess sub:1",userId)
    //find the course and enroll the student in it
    const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId }, // Find the course by its ID
        { $push: { studentEnrolled: userId } }, // Push the studentId into the studentEnrolled array
        { new: true }, // To return the updated document
      );
    console.log("------------------------------------------- sucess sub:2",enrolledCourse) 
    // return
    
    if(!enrolledCourse) {
        return res.status(500).json({success:false,message:"Course not Found"});
    }
    console.log("------------------------------------------- sucess sub:3")

    //find the student and add the course to their list of enrolledCOurses
    const enrolledStudent = await User.findByIdAndUpdate(userId,
        {$push:{
            Courses: courseId,
        }},{new:true})
    console.log("------------------------------------------- sucess sub:4")
        
    ///bachhe ko mail send kardo
    const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
    )
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    console.log("at mail signature:",req.body)
    console.log("at m signature:",req.user,req.course)
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}









/************************************** */
// below can use only one course payment//
/************************************* */

// // capture the payment and initiate the Razorpay order
// exports.capturePayment=async(req,res)=>{
//     //get courseId and UserId
//     const courseId=req.body.courses;
//     const {userId}=req.user.id;
//     console.log(req.body.courses)
//     //validation
//     //valid CourseId
//     if(!courseId){
//         return res.json({
//             sucess:false,
//             message:"please provide valid courseId"
//         })
//     };
    
//     //valid courseDetail
//     let course;
//     try{
//          course=await  Course.findById(courseId);
//         if(!course){
//             return res.json({
//                 sucess:false,
//                 message:"could not find the course"
//             }) 
//         }


//         //user already pay for the same course
//         const uid=new mongoose.Types.ObjectId(userId);
//         if(course.studentEnrolled .includes(uid)){
//             return res.status(200).json({
//                 sucess:false,
//                 message:"student is already enrolled"
//             })
//         }
//     }catch(error){
//         return res.json({
//             sucess:true,
//             message:`error at capturePayment  when validate courseDetail :${error}`
//         })
//     }
    


        
//         //order create
//         const amount=course.price;
//         const currency="INR";
        
//         const options={
//             amount: amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:courseId,
//                 userId
//             }
//         }
//         console.log("razopay sucess")
//         try{
//             //initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log("paymentResponse",paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescribtion:course.courseDescribtion ,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             })
//         }catch(error){
//             console.log("error occure at  apture payment fun");

//             return res.json({
//                 success:false,
//                 message:`Could not initiate  order :${error}`
//             })
//         }
    
// }


// //verify the payment
// exports.verifySignature = async(req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     console.log("inside body:",req.body)
//     const userId = req.user.id;

//     if(!razorpay_order_id ||
//         !razorpay_payment_id ||
//         !razorpay_signature || !courses || !userId) {
//             return res.status(200).json({success:false, message:"Payment Failed"});
//     }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if(expectedSignature === razorpay_signature) {
//             //enroll karwao student ko
//             await enrollStudents(courses, userId, res);
//             //return res
//             return res.status(200).json({success:true, message:"Payment Verified"});
//         }
//         return res.status(200).json({success:"false", message:"Payment Failed"});

// }

// //verify Signature of the razorPay and server          (simple:server Secrect and razorpay sent Secret matching)
// exports.verifySignature= async(req,res)=>{
//     const webhookSecrect="omNamahshivay"; //my signature
//     console.log("heares:",req.headers)
//     const signature =req.headers("x-razorpay-signature"); //razorpay's signature hash form got
    
//     console.log("razoSign:", signature)
//      const shasum=crypto.createHmac("sha256",webhookSecrect);

//      shasum.update(JSON.stringify(req.body));
//      const digest=shasum.digest("hex");

//      if(signature===digest){
//         console.log("payment is authorized",res.body);
//         const {courseId,userId}=req.body.payload.payment.entity.notes;
//         try{
//             //find course and enroll student
//             const enrolledCourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentEnrolled:{userId}}},{new:true});
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     sucess:false,
//                     message:'course did not found'
//                 })
//             }
//             console.log(enrolledCourse);

//             //find the student and add inside courese list  which enrolledCourse
//             const enrolledStudent=await User.findByIdAndUpdate({_id:userId},{$push:{Courses:courseId}},{new:true});
            
//             console.log(enrolledStudent);
            
//             //send confirmation mail
//             const emailResponse=await mailSender(enrolledStudent.email,"Succesfully enrolled",`congratulation u have suceesfully enrolled ${enrolledCourse.courseName}`);
//             console.log(emailResponse);
            
//             return res.status(200).json({
//                 sucess:true,
//                 message:"signature verified AND course added"
//             })
//         }catch(error){
//             console.log("error occured",error);
//             return res.status(500).json({
//                 sucess:false,
//                 message: `error at verifySignature function : ${error.message}`
//             });
//         }
//     }
//     else{
//         return res.status(400).json({
//             sucess:false,
//             message:"signature are diffrent"
//         })
//      }
// }