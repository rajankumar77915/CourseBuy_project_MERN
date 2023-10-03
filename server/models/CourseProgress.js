const { default: mongoose } = require("mongoose");

const CourseProgressSchema = new mongoose.Schema({
    course_id: {
        require: true,
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    completed_videos:
        [
            {
                type:mongoose.Schema.ObjectId,
                ref:"SubSection"
            }
        ]
})

module.exports=mongoose.model("CourseProgress",CourseProgressSchema)