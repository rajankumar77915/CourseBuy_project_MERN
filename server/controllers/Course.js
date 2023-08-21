const Course = require("../models/Course")
const User = require("../models/User")
const Tag = require("../models/tags")
const uploadImageCloudinary=require("../utils/uploadImageCloudinary")


exports.CreateCourse = async (req) => {
    try {
        //fetched data
        const { title, decribtion, whatYouWillLearn,price, tags}=req.body;
        
        //get thumbnail
        const thumbnail= req.file.thumbnailImage;

        //validation
        if(!title || !decribtion || !whatYouWillLearn || !price || tags){
            return res.status(400).json({
                sucess:false,
                message:"all fields required"
            })
        }

        //check instructor
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId);

        if(!instructorDetails){
            return res.status(404).json({
                 sucess:true,
                 message:"instructor detais are not found"
            })
        }
        console.log("instructors details:",instructorDetails);

        //tag validation : no need but just for postman
        const tagDetail=await Tag.findById(tags);

        if(!tagDetail){
            return res.status(404).json({
                 sucess:true,
                 message:"tag detais are not found"
            })
        }
        console.log("instructors details:",instructorDetails);

        //upload thumnail in cloudinary
        const thumbnailImage=await uploadImageCloudinary(thumbnail,process.env.FOLDER_NAME, )

        //now ready to create a new courese
        const newCourse=await Course.create({
            title:title,
            decribtion:decribtion,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            thumbnail:thumbnailImage.secure_url,
            tags:tagDetail._id ,
        })

        //add the new course to the user schema of instructor
        await  User.findByIdAndUpdate(
            {_id: instructorDetails._id} ,
            $push({Courses:newCourse._id}),
            {new:true}
        );

        //also update the tag schema
        await  Tag.findByIdAndUpdate(
            {_id: tagDetail._id},
            { $push:{Course: newCourse._id}}
        ) 

        //return respond
        return res .status(200).json({
            sucess:true,
            message:"course created sucessfully" ,
            data:newCourse
        })


    } catch (error) {
        console.log("error occurse at CreateCourse:", error.message);
        return response.status(500).res({
            sucess: false,
            error: error.message
        })
    }
}



exports.getAllCourse = (req,res)=>{
    
}