const { default: mongoose } = require("mongoose");

const CourseSchema=new mongoose.Schema({
    title:{
        type:String
    },
    decribtion:{
        type:String
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    whatYouWillLearn:{
        type:String
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReview:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"RatingAndReview"
    }],
    price:{
        typr:Number
    },
    thumbnail:{
        type:String
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    }]
})

module.exports=mongoose.model("Course",CourseSchema);