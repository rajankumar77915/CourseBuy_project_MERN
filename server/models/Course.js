const { default: mongoose } = require("mongoose");

const CourseSchema=new mongoose.Schema({
    courseName: { type: String },
    courseTitle:{
        type:String
    },
    courseDescription:{
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
    price: {
		type: Number,
	},
    thumbnail:{
        type:String
    },
    tag: {
		type: [String],
		required: true,
	},
    category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User",
    }],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt: {
		type:Date,
		default:Date.now
	},

})

module.exports=mongoose.model("Course",CourseSchema);